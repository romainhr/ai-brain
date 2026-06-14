#requires -Version 5.1
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Failures = New-Object System.Collections.Generic.List[string]

$RequiredPaths = @(
  'README.md',
  'CONTRIBUTING.md',
  'docs/ARCHITECTURE.md',
  'docs/OPERATIONS.md',
  'pipeline/README.md',
  'pipeline/schema.md',
  'pipeline/sources.yaml',
  'pipeline/taxonomy.yaml',
  'pipeline/model-routing.yaml',
  'scripts/README.md',
  'scripts/rebuild-graph.ps1',
  'vault/README.md',
  'vault/00_Inbox',
  'vault/10_Daily',
  'vault/20_Items',
  'vault/30_MOC',
  'vault/40_Foundations'
)

foreach ($relativePath in $RequiredPaths) {
  $absolutePath = Join-Path $Root $relativePath
  if (-not (Test-Path -LiteralPath $absolutePath)) {
    $Failures.Add("Falta la ruta requerida: $relativePath")
  }
}

$MarkdownFiles = @()
$MarkdownFiles += Get-ChildItem -LiteralPath $Root -File -Filter '*.md'
$MarkdownFiles += Get-ChildItem -LiteralPath (Join-Path $Root 'docs') -File -Filter '*.md'
$MarkdownFiles += Get-ChildItem -LiteralPath (Join-Path $Root 'pipeline') -File -Filter '*.md'
$MarkdownFiles += Get-ChildItem -LiteralPath (Join-Path $Root 'scripts') -File -Filter '*.md'
$MarkdownFiles += Get-Item -LiteralPath (Join-Path $Root 'vault/README.md')

$LinkPattern = '(?<!\!)\[[^\]]+\]\((?<target>[^)]+)\)'

foreach ($file in $MarkdownFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  $content = [regex]::Replace($content, '(?ms)^```.*?^```\s*', '')
  foreach ($match in [regex]::Matches($content, $LinkPattern)) {
    $target = $match.Groups['target'].Value.Trim()

    if ($target.StartsWith('<') -and $target.EndsWith('>')) {
      $target = $target.Substring(1, $target.Length - 2)
    }
    if ($target -match '^(https?://|mailto:|#)') {
      continue
    }

    $target = ($target -split '#', 2)[0]
    if ([string]::IsNullOrWhiteSpace($target)) {
      continue
    }

    $target = [Uri]::UnescapeDataString($target)
    $resolved = [IO.Path]::GetFullPath((Join-Path $file.DirectoryName $target))
    if (-not (Test-Path -LiteralPath $resolved)) {
      $displayFile = $file.FullName.Substring($Root.Length + 1)
      $Failures.Add("Enlace roto en ${displayFile}: $target")
    }
  }
}

if ($Failures.Count -gt 0) {
  Write-Host "Falló la comprobación del repositorio:" -ForegroundColor Red
  foreach ($failure in $Failures) {
    Write-Host "  - $failure" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Repositorio válido: estructura esperada y enlaces internos correctos." -ForegroundColor Green
