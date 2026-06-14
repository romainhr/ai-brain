# Scripts

Automatización local del repositorio.

| Script | Función |
|---|---|
| `check-repo.ps1` | Comprueba rutas esperadas y enlaces Markdown internos |
| `rebuild-graph.ps1` | Regenera el grafo de graphify desde `vault/` |

Los scripts deben resolver la raíz a partir de `$PSScriptRoot` para poder ejecutarse desde cualquier
directorio. Mantén compatibilidad con PowerShell 5.1 cuando sea posible.

Documentación relacionada:

- [Operación diaria](../docs/OPERATIONS.md)
- [Graphify y MCP](../docs/GRAPHIFY.md)
- [Routing de modelos](../docs/MODEL-ROUTING.md)
- [Fuentes y scouts](../docs/SOURCES.md)
