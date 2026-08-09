Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ProjectName = 'hakami-q'
$BranchName = 'feature/users-and-roles'
$DatabaseName = 'hakami-q-auth'
$DatabaseLocation = 'eeur'
$WidgetName = 'HAKAMIQ Accounts'
$ProductionDomain = 'hakami-q.pages.dev'
$WranglerVersion = 'wrangler@4.120.0'

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$ConfigPath = Join-Path $RepoRoot 'wrangler.jsonc'
$MigrationPath = Join-Path $RepoRoot 'migrations\0001_auth.sql'
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Invoke-WranglerJson {
    param([Parameter(Mandatory = $true)][string[]]$Arguments)

    $stderrFile = [System.IO.Path]::GetTempFileName()
    try {
        $output = & npx --yes $WranglerVersion @Arguments 2> $stderrFile
        $exitCode = $LASTEXITCODE
        $stderr = [System.IO.File]::ReadAllText($stderrFile)
        if ($exitCode -ne 0) {
            throw "Wrangler failed ($exitCode): $stderr`n$($output -join [Environment]::NewLine)"
        }
        $text = ($output -join [Environment]::NewLine).Trim()
        if (-not $text) { throw 'Wrangler returned no JSON output.' }
        try {
            return $text | ConvertFrom-Json
        }
        catch {
            throw "Wrangler returned invalid JSON:`n$text"
        }
    }
    finally {
        Remove-Item $stderrFile -Force -ErrorAction SilentlyContinue
    }
}

function Get-ResultItems {
    param($Value)

    if ($null -eq $Value) { return @() }
    if ($Value -is [System.Array]) { return @($Value) }
    if (@($Value.PSObject.Properties.Name) -contains 'result') {
        if ($null -eq $Value.result) { return @() }
        if ($Value.result -is [System.Array]) { return @($Value.result) }
        return @($Value.result)
    }
    return @($Value)
}

function Invoke-NativeChecked {
    param(
        [Parameter(Mandatory = $true)][string]$Command,
        [Parameter(Mandatory = $true)][string[]]$Arguments
    )

    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Command failed with exit code $LASTEXITCODE"
    }
}

Set-Location $RepoRoot

Write-Host "`n=== PRE-FLIGHT ===" -ForegroundColor Cyan
if (-not (Test-Path $ConfigPath)) { throw "Missing $ConfigPath" }
if (-not (Test-Path $MigrationPath)) { throw "Missing $MigrationPath" }

$currentBranch = (git branch --show-current).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Unable to read current Git branch.' }
if ($currentBranch -ne $BranchName) {
    throw "Run this script from branch '$BranchName'. Current branch: '$currentBranch'"
}

$dirty = @(git status --porcelain)
if ($LASTEXITCODE -ne 0) { throw 'Unable to read Git status.' }
if ($dirty.Count -gt 0) {
    throw 'Working tree is not clean. Commit or discard local changes before provisioning production auth.'
}

Invoke-NativeChecked 'git' @('fetch', 'origin')
Invoke-NativeChecked 'git' @('pull', '--ff-only', 'origin', $BranchName)

Write-Host "`n=== PRODUCTION D1 ===" -ForegroundColor Cyan
$dbList = Get-ResultItems (Invoke-WranglerJson @('d1', 'list', '--json'))
$db = @($dbList | Where-Object { $_.name -eq $DatabaseName } | Select-Object -First 1)

if ($db.Count -eq 0) {
    Write-Host "Creating D1 database '$DatabaseName'..."
    Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'd1', 'create', $DatabaseName, '--location', $DatabaseLocation)
    $dbList = Get-ResultItems (Invoke-WranglerJson @('d1', 'list', '--json'))
    $db = @($dbList | Where-Object { $_.name -eq $DatabaseName } | Select-Object -First 1)
}

if ($db.Count -ne 1) { throw "Unable to resolve D1 database '$DatabaseName'." }
$dbObject = $db[0]
$databaseId = @($dbObject.uuid, $dbObject.id, $dbObject.database_id | Where-Object { $_ })[0]
if (-not $databaseId) { throw 'D1 database ID was not returned by Wrangler.' }
Write-Host "D1: $DatabaseName ($databaseId)" -ForegroundColor Green

Write-Host 'Applying auth schema...'
Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'd1', 'execute', $DatabaseName, '--remote', '--file', $MigrationPath, '--yes')

Write-Host 'Verifying auth tables...'
Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'd1', 'execute', $DatabaseName, '--remote', '--command', "SELECT name FROM sqlite_schema WHERE type='table' AND name IN ('users','sessions') ORDER BY name;", '--json')

Write-Host "`n=== TURNSTILE ===" -ForegroundColor Cyan
$widgetList = Get-ResultItems (Invoke-WranglerJson @('turnstile', 'widget', 'list', '--json'))
$existingWidget = @($widgetList | Where-Object { $_.name -eq $WidgetName } | Select-Object -First 1)

if ($existingWidget.Count -eq 0) {
    Write-Host "Creating Turnstile widget '$WidgetName'..."
    $createdWidget = Get-ResultItems (Invoke-WranglerJson @(
        'turnstile', 'widget', 'create', $WidgetName,
        '--domain', $ProductionDomain,
        '--mode', 'managed',
        '--json'
    ))
    if ($createdWidget.Count -ne 1) { throw 'Turnstile widget creation did not return one widget.' }
    $siteKey = [string]$createdWidget[0].sitekey
} else {
    $siteKey = [string]$existingWidget[0].sitekey
}

if (-not $siteKey) { throw 'Turnstile sitekey was not returned.' }
$widgetDetails = Get-ResultItems (Invoke-WranglerJson @('turnstile', 'widget', 'get', $siteKey, '--json'))
if ($widgetDetails.Count -ne 1) { throw 'Unable to read Turnstile widget details.' }
$turnstileSecret = [string]$widgetDetails[0].secret
if (-not $turnstileSecret) { throw 'Turnstile secret was not returned.' }

try {
    Write-Host 'Uploading TURNSTILE_SECRET_KEY to Cloudflare Pages production...'
    $turnstileSecret | & npx --yes $WranglerVersion pages secret put TURNSTILE_SECRET_KEY --project-name $ProjectName --env production
    if ($LASTEXITCODE -ne 0) { throw 'Failed to upload TURNSTILE_SECRET_KEY.' }
}
finally {
    Remove-Variable turnstileSecret -ErrorAction SilentlyContinue
}

Write-Host "Turnstile sitekey: $siteKey" -ForegroundColor Green

Write-Host "`n=== UPDATE WRANGLER CONFIG ===" -ForegroundColor Cyan
$config = Get-Content -Raw -LiteralPath $ConfigPath | ConvertFrom-Json
$config.env.production.d1_databases = @(
    [pscustomobject]@{
        binding = 'AUTH_DB'
        database_name = $DatabaseName
        database_id = [string]$databaseId
    }
)
$config.env.production.vars = [pscustomobject]@{
    TURNSTILE_SITEKEY = $siteKey
}

$json = $config | ConvertTo-Json -Depth 20
[System.IO.File]::WriteAllText($ConfigPath, $json + [Environment]::NewLine, $Utf8NoBom)

Invoke-NativeChecked 'git' @('diff', '--check')

$changed = @(git status --porcelain -- 'wrangler.jsonc')
if ($LASTEXITCODE -ne 0) { throw 'Unable to inspect Wrangler config changes.' }
if ($changed.Count -gt 0) {
    Invoke-NativeChecked 'git' @('add', 'wrangler.jsonc')
    Invoke-NativeChecked 'git' @('commit', '-m', 'config: bind production auth services')
    Invoke-NativeChecked 'git' @('push', 'origin', $BranchName)
} else {
    Write-Host 'Wrangler production configuration already matches Cloudflare resources.'
}

Write-Host "`n=== SECRET NAMES ===" -ForegroundColor Cyan
Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'pages', 'secret', 'list', '--project-name', $ProjectName, '--env', 'production')

Write-Host "`nAUTH PRODUCTION PROVISIONING: PASS" -ForegroundColor Green
Write-Host 'No Turnstile secret was written to Git.' -ForegroundColor Green
