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
$Utf8NoBom = New-Object System.Text.UTF8Encoding -ArgumentList $false

$WranglerEnvBackup = @{
    WRANGLER_WRITE_LOGS = $env:WRANGLER_WRITE_LOGS
    WRANGLER_LOG = $env:WRANGLER_LOG
    WRANGLER_LOG_SANITIZE = $env:WRANGLER_LOG_SANITIZE
    CI = $env:CI
}

function Restore-EnvironmentVariable {
    param(
        [Parameter(Mandatory = $true)][string]$Name,
        [AllowNull()][string]$Value
    )

    if ($null -eq $Value) {
        Remove-Item ("Env:" + $Name) -ErrorAction SilentlyContinue
    }
    else {
        Set-Item ("Env:" + $Name) $Value
    }
}

function Invoke-WranglerJson {
    param(
        [Parameter(Mandatory = $true)][string[]]$Arguments,
        [switch]$Sensitive
    )

    if ($Sensitive) {
        $output = & npx --yes $WranglerVersion @Arguments 2>$null
        if ($LASTEXITCODE -ne 0) {
            throw 'Wrangler sensitive command failed. No sensitive output was displayed.'
        }
        $text = ($output -join [Environment]::NewLine).Trim()
        if (-not $text) { throw 'Wrangler sensitive command returned no JSON output.' }
        try {
            return $text | ConvertFrom-Json
        }
        catch {
            throw 'Wrangler sensitive command returned invalid JSON. Output was intentionally suppressed.'
        }
    }

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

function Get-FirstPropertyValue {
    param(
        [Parameter(Mandatory = $true)]$Object,
        [Parameter(Mandatory = $true)][string[]]$Names
    )

    foreach ($name in $Names) {
        $property = $Object.PSObject.Properties[$name]
        if ($null -eq $property) { continue }
        $value = $property.Value
        if ($null -eq $value) { continue }
        if ([string]::IsNullOrWhiteSpace([string]$value)) { continue }
        return $value
    }
    return $null
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

try {
    $env:WRANGLER_WRITE_LOGS = 'false'
    $env:WRANGLER_LOG = 'log'
    $env:WRANGLER_LOG_SANITIZE = 'true'

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

    Write-Host "`n=== CLOUDFLARE TARGET ===" -ForegroundColor Cyan
    Write-Host "Pages project: $ProjectName"
    Write-Host "Environment: production"
    Write-Host "Hostname: $ProductionDomain"
    Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'pages', 'secret', 'list', '--project-name', $ProjectName, '--env', 'production')

    Write-Host "`n=== PRODUCTION D1 ===" -ForegroundColor Cyan
    $dbList = @(Get-ResultItems (Invoke-WranglerJson @('d1', 'list', '--json')))
    $db = @($dbList | Where-Object { $_.name -eq $DatabaseName } | Select-Object -First 1)

    if ($db.Count -eq 0) {
        Write-Host "Creating D1 database '$DatabaseName'..."
        $previousCi = $env:CI
        try {
            $env:CI = 'true'
            Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'd1', 'create', $DatabaseName, '--location', $DatabaseLocation)
        }
        finally {
            Restore-EnvironmentVariable 'CI' $previousCi
        }
        $dbList = @(Get-ResultItems (Invoke-WranglerJson @('d1', 'list', '--json')))
        $db = @($dbList | Where-Object { $_.name -eq $DatabaseName } | Select-Object -First 1)
    }

    if ($db.Count -ne 1) { throw "Unable to resolve D1 database '$DatabaseName'." }
    $dbObject = $db[0]
    $databaseId = Get-FirstPropertyValue $dbObject @('uuid', 'id', 'database_id')
    if (-not $databaseId) { throw 'D1 database ID was not returned by Wrangler.' }
    $databaseId = [string]$databaseId
    Write-Host "D1: $DatabaseName ($databaseId)" -ForegroundColor Green

    Write-Host 'Applying auth schema...'
    Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'd1', 'execute', $DatabaseName, '--remote', '--file', $MigrationPath, '--yes')

    Write-Host 'Verifying auth tables...'
    $tableCheck = @(Get-ResultItems (Invoke-WranglerJson @(
        'd1', 'execute', $DatabaseName,
        '--remote',
        '--command', "SELECT name FROM sqlite_schema WHERE type='table' AND name IN ('users','sessions') ORDER BY name;",
        '--json'
    )))
    $tableJson = $tableCheck | ConvertTo-Json -Depth 10
    if ($tableJson -notmatch 'users' -or $tableJson -notmatch 'sessions') {
        throw 'D1 verification did not find both users and sessions tables.'
    }

    Write-Host "`n=== TURNSTILE ===" -ForegroundColor Cyan
    $widgetList = @(Get-ResultItems (Invoke-WranglerJson @('turnstile', 'widget', 'list', '--json')))
    $existingWidget = @($widgetList | Where-Object { $_.name -eq $WidgetName } | Select-Object -First 1)

    if ($existingWidget.Count -eq 0) {
        Write-Host "Creating Turnstile widget '$WidgetName' for '$ProductionDomain'..."
        $createdWidget = @(Get-ResultItems (Invoke-WranglerJson @(
            'turnstile', 'widget', 'create', $WidgetName,
            '--domain', $ProductionDomain,
            '--mode', 'managed',
            '--json'
        ) -Sensitive))
        if ($createdWidget.Count -ne 1) { throw 'Turnstile widget creation did not return exactly one widget.' }
        $siteKey = Get-FirstPropertyValue $createdWidget[0] @('sitekey', 'site_key')
    }
    else {
        Write-Host "Using existing Turnstile widget '$WidgetName'."
        $siteKey = Get-FirstPropertyValue $existingWidget[0] @('sitekey', 'site_key')
    }

    if (-not $siteKey) { throw 'Turnstile sitekey was not returned.' }
    $siteKey = [string]$siteKey

    $widgetDetails = @(Get-ResultItems (Invoke-WranglerJson @('turnstile', 'widget', 'get', $siteKey, '--json') -Sensitive))
    if ($widgetDetails.Count -ne 1) { throw 'Unable to read exactly one Turnstile widget.' }
    $widget = $widgetDetails[0]

    $resolvedSiteKey = Get-FirstPropertyValue $widget @('sitekey', 'site_key')
    if ([string]$resolvedSiteKey -ne $siteKey) { throw 'Turnstile sitekey validation failed.' }

    $mode = [string](Get-FirstPropertyValue $widget @('mode'))
    if ($mode -ne 'managed') { throw "Turnstile widget mode is '$mode', expected 'managed'." }

    $domainsProperty = $widget.PSObject.Properties['domains']
    if ($null -eq $domainsProperty) { throw 'Turnstile widget domains were not returned.' }
    $domains = @($domainsProperty.Value | ForEach-Object { ([string]$_).Trim().ToLowerInvariant() })
    if ($domains -notcontains $ProductionDomain.ToLowerInvariant()) {
        throw "Turnstile widget is not restricted to expected hostname '$ProductionDomain'."
    }

    $turnstileSecret = [string](Get-FirstPropertyValue $widget @('secret', 'secret_key'))
    if ([string]::IsNullOrWhiteSpace($turnstileSecret)) { throw 'Turnstile secret was not returned.' }

    try {
        Write-Host 'Uploading TURNSTILE_SECRET_KEY to Cloudflare Pages production...'
        $turnstileSecret | & npx --yes $WranglerVersion pages secret put TURNSTILE_SECRET_KEY --project-name $ProjectName --env production
        if ($LASTEXITCODE -ne 0) { throw 'Failed to upload TURNSTILE_SECRET_KEY.' }
    }
    finally {
        $turnstileSecret = $null
        Remove-Variable turnstileSecret -ErrorAction SilentlyContinue
    }

    Write-Host "Turnstile sitekey: $siteKey" -ForegroundColor Green

    Write-Host "`n=== UPDATE WRANGLER CONFIG ===" -ForegroundColor Cyan
    $config = Get-Content -Raw -LiteralPath $ConfigPath | ConvertFrom-Json
    $config.env.production.d1_databases = @(
        [pscustomobject]@{
            binding = 'AUTH_DB'
            database_name = $DatabaseName
            database_id = $databaseId
        }
    )
    $config.env.production.vars = [pscustomobject]@{
        TURNSTILE_SITEKEY = $siteKey
        TURNSTILE_HOSTNAMES = $ProductionDomain
        REGISTRATION_CLOSED = '1'
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
    }
    else {
        Write-Host 'Wrangler production configuration already matches Cloudflare resources.'
    }

    Write-Host "`n=== SECRET NAMES ===" -ForegroundColor Cyan
    Invoke-NativeChecked 'npx' @('--yes', $WranglerVersion, 'pages', 'secret', 'list', '--project-name', $ProjectName, '--env', 'production')

    Write-Host "`nAUTH PRODUCTION PROVISIONING: PASS" -ForegroundColor Green
    Write-Host 'Production registration remains CLOSED until the first admin account is bootstrapped.' -ForegroundColor Yellow
    Write-Host 'No Turnstile secret was written to Git, command arguments, or Wrangler log files.' -ForegroundColor Green
}
finally {
    Restore-EnvironmentVariable 'WRANGLER_WRITE_LOGS' $WranglerEnvBackup.WRANGLER_WRITE_LOGS
    Restore-EnvironmentVariable 'WRANGLER_LOG' $WranglerEnvBackup.WRANGLER_LOG
    Restore-EnvironmentVariable 'WRANGLER_LOG_SANITIZE' $WranglerEnvBackup.WRANGLER_LOG_SANITIZE
    Restore-EnvironmentVariable 'CI' $WranglerEnvBackup.CI
}
