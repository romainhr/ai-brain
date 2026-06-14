# Operación diaria

## Requisitos

- Un cliente capaz de ejecutar la skill `ai-news-pipeline`.
- Obsidian, opcional pero recomendado para revisar el vault.
- `graphify` para construir el grafo.
- `OPENROUTER_API_KEY` si el backend configurado para graphify es OpenRouter.
- `bd` para registrar trabajo de mantenimiento.

La instalación de graphify usada por el proyecto es:

```powershell
uv tool install "graphifyy[openai]"
```

## Captura diaria

1. Ejecuta `ai-news-pipeline` desde la raíz del repo.
2. Comprueba `vault/00_Inbox/<fecha>-raw.md`.
3. Revisa items nuevos o actualizados en `vault/20_Items/`.
4. Revisa el resumen de `vault/10_Daily/<fecha>.md`.
5. Resuelve candidatos nuevos de `pipeline/taxonomy.yaml` cuando corresponda.

La ejecución debe respetar la ventana de `pipeline/sources.yaml`, verificar fechas y evitar crear
otra nota cuando el asunto ya tenga una canónica.

## Reconstrucción del grafo

```powershell
$env:OPENROUTER_API_KEY = '...'
./scripts/rebuild-graph.ps1
```

El script localiza `graphify`, extrae el grafo y ejecuta clustering. Un fallo de rate limit durante
el etiquetado de comunidades puede dejar nombres genéricos, pero no invalida necesariamente el
grafo base.

## Consulta

`.mcp.json` registra `graphify-mcp` contra:

```text
vault/graphify-out/graph.json
```

Después de reconstruir el grafo, reinicia el cliente MCP si no detecta el archivo actualizado.
Consulta [Graphify y MCP](GRAPHIFY.md) para el setup completo.

## Mantenimiento

```powershell
# Estructura y documentación
./scripts/check-repo.ps1

# Salud del issue tracker
bd doctor
bd preflight

# Trabajo listo
bd ready
```

## Diagnóstico rápido

| Síntoma | Comprobación |
|---|---|
| Faltan novedades | Revisa ventana y fuentes en `pipeline/sources.yaml` |
| Tags desconocidos | Compara con `pipeline/taxonomy.yaml` |
| Nota duplicada | Busca por URL y título en `vault/20_Items/` |
| MCP sin resultados | Comprueba que exista `vault/graphify-out/graph.json` |
| Graphify no arranca | Ejecuta `graphify --help` y revisa la variable del backend |
| Motor externo falla | Revisa `pipeline/model-routing.yaml` y el fallback |
