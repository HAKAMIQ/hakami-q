Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$InputJson = Join-Path $PWD 'blogger-live-export\all-live-posts-fixed.json'
$StagePath = Join-Path $PWD 'src\content\blog-live-stage'
$ReportPath = Join-Path $PWD 'blogger-live-export\astro-import-report.csv'
$Utf8NoBom = [System.Text.UTF8Encoding]::new($false)

if (-not (Test-Path -LiteralPath $InputJson -PathType Leaf)) {
    throw "ملف Blogger غير موجود: $InputJson"
}

function Get-AtomText {
    param(
        [Parameter(Mandatory)]
        [object]$Entry,

        [Parameter(Mandatory)]
        [string]$PropertyName
    )

    if (-not ($Entry.PSObject.Properties.Name -contains $PropertyName)) {
        return ''
    }

    $Value = $Entry.$PropertyName

    if ($null -eq $Value) {
        return ''
    }

    if ($Value.PSObject.Properties.Name -contains '$t') {
        return [string]$Value.'$t'
    }

    return [string]$Value
}

function ConvertTo-YamlString {
    param([AllowEmptyString()][string]$Value)

    if ($null -eq $Value) {
        $Value = ''
    }

    return "'" + ($Value -replace "'", "''") + "'"
}

function ConvertTo-Description {
    param(
        [AllowEmptyString()]
        [string]$Html,

        [string]$Fallback
    )

    if ([string]::IsNullOrWhiteSpace($Html)) {
        return $Fallback
    }

    $Text = [regex]::Replace(
        $Html,
        '<script\b[^>]*>.*?</script>',
        ' ',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase `
            -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
    )

    $Text = [regex]::Replace(
        $Text,
        '<style\b[^>]*>.*?</style>',
        ' ',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase `
            -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
    )

    $Text = [regex]::Replace($Text, '<[^>]+>', ' ')
    $Text = [System.Net.WebUtility]::HtmlDecode($Text)
    $Text = [regex]::Replace($Text, '\s+', ' ').Trim()

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return $Fallback
    }

    if ($Text.Length -gt 180) {
        return $Text.Substring(0, 180).Trim() + '…'
    }

    return $Text
}

function ConvertTo-BloggerImageUrl {
    param([AllowEmptyString()][string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return ''
    }

    if ($Value -notmatch 'blogger\.googleusercontent\.com') {
        return $Value
    }

    return [regex]::Replace(
        $Value,
        '/s(?:32|72|96|144|160|200|220|240|320|400|480|512|600|640)(-[^/]+)?/',
        {
            param($Match)

            $Modifier = $Match.Groups[1].Value
            return "/s1280$Modifier/"
        },
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
}

function ConvertTo-SafeArticleHtml {
    param([AllowEmptyString()][string]$Html)

    if ([string]::IsNullOrEmpty($Html)) {
        return ''
    }

    # Keep editorial HTML, styles, images, tables and embeds, but remove active script execution paths.
    $Result = [regex]::Replace(
        $Html,
        '<script\b[^>]*>.*?</script>',
        '',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase `
            -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
    )

    $Result = [regex]::Replace(
        $Result,
        '<!--.*?-->',
        '',
        [System.Text.RegularExpressions.RegexOptions]::Singleline
    )

    # Inline event handlers are executable code and are never required for migrated editorial content.
    $Result = [regex]::Replace(
        $Result,
        '\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|''[^'']*''|[^\s>]+)',
        '',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )

    # Remove javascript: navigation/source attributes rather than rewriting their destination.
    $Result = [regex]::Replace(
        $Result,
        '\s+(?:href|src|xlink:href)\s*=\s*(?:"\s*javascript:[^"]*"|''\s*javascript:[^'']*''|javascript:[^\s>]+)',
        '',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )

    # srcdoc can create an executable nested document; migrated articles do not need it.
    $Result = [regex]::Replace(
        $Result,
        '\s+srcdoc\s*=\s*(?:"[^"]*"|''[^'']*''|[^\s>]+)',
        '',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )

    return $Result.Trim()
}

function Get-SafeSlug {
    param(
        [string]$Url,
        [string]$Id,
        [int]$Index
    )

    $Slug = ''

    if (-not [string]::IsNullOrWhiteSpace($Url)) {
        try {
            $Uri = [Uri]$Url
            $Slug = [IO.Path]::GetFileNameWithoutExtension($Uri.AbsolutePath)
            $Slug = [Uri]::UnescapeDataString($Slug)
        }
        catch {
            $Slug = ''
        }
    }

    if ([string]::IsNullOrWhiteSpace($Slug)) {
        if ($Id -match 'post-(\d+)$') {
            $Slug = "blogger-post-$($Matches[1])"
        }
        else {
            $Slug = "blogger-post-$Index"
        }
    }

    $Slug = $Slug.ToLowerInvariant()
    $Slug = $Slug -replace '[<>:"/\\|?*\x00-\x1F]', '-'
    $Slug = $Slug -replace '\s+', '-'
    $Slug = $Slug -replace '-{2,}', '-'
    $Slug = $Slug.Trim(' ', '-')
    $Slug = $Slug.TrimEnd([char[]]'.')

    if ($Slug.Length -gt 120) {
        $Slug = $Slug.Substring(0, 120).TrimEnd('-')
    }

    if ([string]::IsNullOrWhiteSpace($Slug)) {
        $Slug = "blogger-post-$Index"
    }

    return $Slug
}

$Parsed = Get-Content -LiteralPath $InputJson -Raw -Encoding UTF8 |
    ConvertFrom-Json

if (
    $Parsed -is [System.Array] -and
    $Parsed.Count -eq 1 -and
    $Parsed[0] -is [System.Array]
) {
    $Posts = @($Parsed[0])
}
else {
    $Posts = @($Parsed)
}

if ($Posts.Count -ne 406) {
    throw "عدد مواضيع Blogger غير متوقع: $($Posts.Count). المتوقع 406."
}

Remove-Item -LiteralPath $StagePath -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $StagePath -Force | Out-Null

$UsedNames = @{}
$Report = [System.Collections.Generic.List[object]]::new()
$Index = 0

foreach ($Entry in $Posts) {
    $Index++

    $Id = Get-AtomText -Entry $Entry -PropertyName 'id'
    $Title = Get-AtomText -Entry $Entry -PropertyName 'title'
    $Published = Get-AtomText -Entry $Entry -PropertyName 'published'
    $Updated = Get-AtomText -Entry $Entry -PropertyName 'updated'
    $Content = Get-AtomText -Entry $Entry -PropertyName 'content'

    if ([string]::IsNullOrWhiteSpace($Title)) {
        $Title = "موضوع Blogger رقم $Index"
    }

    if ([string]::IsNullOrWhiteSpace($Published)) {
        throw "الموضوع رقم $Index لا يحتوي على تاريخ نشر."
    }

    $OriginalUrl = ''

    if (
        $Entry.PSObject.Properties.Name -contains 'link' -and
        $null -ne $Entry.link
    ) {
        $Alternate = @($Entry.link) |
            Where-Object {
                $_.PSObject.Properties.Name -contains 'rel' -and
                $_.rel -eq 'alternate'
            } |
            Select-Object -First 1

        if (
            $null -ne $Alternate -and
            $Alternate.PSObject.Properties.Name -contains 'href'
        ) {
            $OriginalUrl = [string]$Alternate.href
        }
    }

    $Labels = @()

    if (
        $Entry.PSObject.Properties.Name -contains 'category' -and
        $null -ne $Entry.category
    ) {
        $Labels = @(
            @($Entry.category) |
                Where-Object {
                    $_.PSObject.Properties.Name -contains 'scheme' -and
                    $_.scheme -eq 'http://www.blogger.com/atom/ns#' -and
                    $_.PSObject.Properties.Name -contains 'term'
                } |
                ForEach-Object {
                    [string]$_.term
                } |
                Where-Object {
                    -not [string]::IsNullOrWhiteSpace($_)
                } |
                Sort-Object -Unique
        )
    }

    $HeroImageUrl = ''

    if (-not [string]::IsNullOrWhiteSpace($Content)) {
        $ImageMatch = [regex]::Match(
            $Content,
            '<img\b[^>]*(?:data-original|data-src|src)\s*=\s*["'']([^"'']+)["'']',
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
        )

        if ($ImageMatch.Success) {
            $HeroImageUrl = ConvertTo-BloggerImageUrl -Value (
                [System.Net.WebUtility]::HtmlDecode($ImageMatch.Groups[1].Value)
            )
        }
    }

    $CleanContent = ConvertTo-SafeArticleHtml -Html $Content

    $Description = ConvertTo-Description `
        -Html $CleanContent `
        -Fallback $Title

    try {
        $DatePrefix = ([datetimeoffset]$Published).ToString('yyyy-MM-dd')
    }
    catch {
        $DatePrefix = 'undated'
    }

    $Slug = Get-SafeSlug `
        -Url $OriginalUrl `
        -Id $Id `
        -Index $Index

    $BaseName = "$DatePrefix-$Slug"
    $FileBaseName = $BaseName
    $DuplicateNumber = 2

    while ($UsedNames.ContainsKey($FileBaseName.ToLowerInvariant())) {
        $FileBaseName = "$BaseName-$DuplicateNumber"
        $DuplicateNumber++
    }

    $UsedNames[$FileBaseName.ToLowerInvariant()] = $true

    $FileName = "$FileBaseName.md"
    $OutputFile = Join-Path $StagePath $FileName
    $LabelsJson = ConvertTo-Json -InputObject @($Labels) -Compress

    $Frontmatter = [System.Collections.Generic.List[string]]::new()

    $Frontmatter.Add('---')
    $Frontmatter.Add("title: $(ConvertTo-YamlString $Title)")
    $Frontmatter.Add("description: $(ConvertTo-YamlString $Description)")
    $Frontmatter.Add("pubDate: $(ConvertTo-YamlString $Published)")

    if (
        -not [string]::IsNullOrWhiteSpace($Updated) -and
        $Updated -ne $Published
    ) {
        $Frontmatter.Add("updatedDate: $(ConvertTo-YamlString $Updated)")
    }

    $Frontmatter.Add(
        "heroImage: '../../assets/blog-placeholder-1.jpg'"
    )

    if (-not [string]::IsNullOrWhiteSpace($HeroImageUrl)) {
        $Frontmatter.Add(
            "heroImageUrl: $(ConvertTo-YamlString $HeroImageUrl)"
        )
    }

    if (-not [string]::IsNullOrWhiteSpace($OriginalUrl)) {
        $Frontmatter.Add(
            "originalUrl: $(ConvertTo-YamlString $OriginalUrl)"
        )
    }

    $Frontmatter.Add("labels: $LabelsJson")
    $Frontmatter.Add('---')
    $Frontmatter.Add('')
    $Frontmatter.Add($CleanContent)
    $Frontmatter.Add('')

    [IO.File]::WriteAllText(
        $OutputFile,
        ($Frontmatter -join "`r`n"),
        $Utf8NoBom
    )

    $Report.Add(
        [PSCustomObject]@{
            FileName       = $FileName
            Title          = $Title
            Published      = $Published
            Labels         = $Labels -join ' | '
            LabelCount     = $Labels.Count
            OriginalUrl    = $OriginalUrl
            HeroImageUrl   = $HeroImageUrl
            ContentLength  = $CleanContent.Length
        }
    )
}

$GeneratedCount = @(
    Get-ChildItem -LiteralPath $StagePath -Filter *.md -File
).Count

if ($GeneratedCount -ne 406) {
    throw "تم إنشاء $GeneratedCount ملفًا فقط بدل 406."
}

$Report |
    Sort-Object Published -Descending |
    Export-Csv `
        -LiteralPath $ReportPath `
        -NoTypeInformation `
        -Encoding UTF8

[PSCustomObject]@{
    SourcePosts     = $Posts.Count
    GeneratedFiles = $GeneratedCount
    WithoutLabels  = @($Report | Where-Object LabelCount -eq 0).Count
    StagePath       = $StagePath
    ReportPath      = $ReportPath
} | Format-List

Write-Host 'تم إنشاء الاستيراد الحي في المجلد المرحلي.' -ForegroundColor Green
