#requires -Version 5.1
<#
.SYNOPSIS
  Reconstruye el knowledge graph del cerebro a partir del vault de Obsidian usando graphify.

.DESCRIPTION
  Corre graphify sobre vault/ con el backend 'openrouter' (Gemma 4 31B free) y deja los
  outputs en vault/graphify-out/ (graph.json, graph.html, GRAPH_REPORT.md).

  Backend: definido como custom provider en ~/.graphify/providers.json (clave 'openrouter').
  Requiere la variable de entorno OPENROUTER_API_KEY en la sesión actual.

  Flujo (verificado contra graphify instalado, 2026-06-13):
    1) graphify vault --backend openrouter     -> extrae nodos/edges (graph.json)
    2) graphify cluster-only vault             -> clustering + GRAPH_REPORT.md + graph.html
       (el etiquetado de comunidades usa LLM; con el modelo free puede dar 429 rate-limit,
        en cuyo caso quedan placeholders 'Community N'. Es cosmético; el grafo es funcional.)

.EXAMPLE
  ./scripts/rebuild-graph.ps1
  ./scripts/rebuild-graph.ps1 -Backend openrouter
#>
[CmdletBinding()]
param(
  [string]$Backend = 'openrouter',
  [string]$GraphifyExe,           # ruta explícita a graphify.exe (si no está en PATH)
  [int]$LabelRetries = 3          # reintentos del paso cluster-only ante 429 rate-limit
)

$ErrorActionPreference = 'Stop'

# Raíz del proyecto = carpeta padre de este script
$Root      = Split-Path -Parent $PSScriptRoot
$VaultDir  = Join-Path $Root 'vault'
$OutDir    = Join-Path $VaultDir 'graphify-out'

# 1) Localizar graphify: PATH, luego rutas comunes de uv.
function Resolve-Graphify {
  $inPath = Get-Command graphify -ErrorAction SilentlyContinue
  if ($inPath) { return $inPath.Source }
  $candidates = @(
    "$env:USERPROFILE\.local\bin\graphify.exe",
    "$env:LOCALAPPDATA\uv\tools\graphifyy\Scripts\graphify.exe",
    "$env:APPDATA\uv\tools\graphifyy\Scripts\graphify.exe"
  )
  foreach ($c in $candidates) {
    $hit = Get-ChildItem -Path $c -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($hit) { return $hit.FullName }
  }
  return $null
}

if (-not $GraphifyExe) { $GraphifyExe = Resolve-Graphify }
if (-not $GraphifyExe) {
  Write-Error @"
No se encontró 'graphify' (ni en PATH ni en ~/.local/bin ni en rutas de uv).
Instálalo con:  uv tool install "graphifyy[openai]"
(el extra [openai] es necesario para backends OpenAI-compatibles como openrouter).
"@
  exit 1
}
Write-Host "  graphify: $GraphifyExe" -ForegroundColor DarkGray

if (-not (Test-Path $VaultDir)) { Write-Error "No existe el vault: $VaultDir"; exit 1 }

# 2) Verificar la API key del backend (no se persiste por decisión del usuario).
if ($Backend -eq 'openrouter' -and -not $env:OPENROUTER_API_KEY) {
  Write-Error @"
Falta la variable de entorno OPENROUTER_API_KEY en esta sesión.
Defínela antes de correr el script, p.ej.:
  `$env:OPENROUTER_API_KEY = 'sk-or-...'
Consíguela gratis en https://openrouter.ai/keys
"@
  exit 1
}

# 3) Extracción semántica -> graph.json
Write-Host "▶ Extrayendo grafo desde: $VaultDir  (backend: $Backend)" -ForegroundColor Cyan
& $GraphifyExe vault --backend $Backend
if ($LASTEXITCODE -ne 0) {
  Write-Error "graphify extract terminó con código $LASTEXITCODE."
  exit $LASTEXITCODE
}

# 4) Clustering + reporte + visualización. El etiquetado puede dar 429 con el modelo free;
#    reintentamos unas pocas veces. Si igual falla, quedan placeholders (no es bloqueante).
Write-Host "▶ Clustering y reporte..." -ForegroundColor Cyan
$ok = $false
for ($i = 1; $i -le $LabelRetries; $i++) {
  & $GraphifyExe cluster-only vault
  if ($LASTEXITCODE -eq 0) { $ok = $true; break }
  Write-Host "  intento $i/$LabelRetries falló (posible rate-limit); reintentando..." -ForegroundColor Yellow
  Start-Sleep -Seconds 5
}
if (-not $ok) {
  Write-Host "  cluster-only no completó tras $LabelRetries intentos; el grafo base sigue siendo válido." -ForegroundColor Yellow
}

# 5) Resumen
Write-Host "✔ Grafo reconstruido." -ForegroundColor Green
$graph = Join-Path $OutDir 'graph.json'
$html  = Join-Path $OutDir 'graph.html'
$report= Join-Path $OutDir 'GRAPH_REPORT.md'
if (Test-Path $graph)  { Write-Host "  graph.json:      $graph" -ForegroundColor Green }
if (Test-Path $html)   { Write-Host "  Visualización:   $html" -ForegroundColor Green }
if (Test-Path $report) { Write-Host "  Reporte:         $report" -ForegroundColor Green }
Write-Host "  Consulta el cerebro vía el MCP server de graphify (ver docs/GRAPHIFY.md)." -ForegroundColor DarkGray
