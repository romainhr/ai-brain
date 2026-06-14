# Graphify y MCP

Graphify proyecta el vault a un knowledge graph. `graphify-mcp` sirve el archivo generado para que
un agente pueda consultar relaciones y contexto sin modificar las notas.

## Construcción

```powershell
$env:OPENROUTER_API_KEY = '...'
./scripts/rebuild-graph.ps1
```

La clave se proporciona por entorno o por otro gestor de secretos local. Nunca debe escribirse en
archivos versionados.

El resultado esperado vive en:

```text
vault/graphify-out/
  graph.json
  graph.html
  GRAPH_REPORT.md
```

## Configuración MCP

El repo incluye `.mcp.json`:

```json
{
  "mcpServers": {
    "graphify": {
      "command": "graphify-mcp",
      "args": ["vault/graphify-out/graph.json"]
    }
  }
}
```

Si el ejecutable no está en `PATH`, configura una ruta absoluta solo en la configuración local del
cliente. No introduzcas rutas personales en el archivo compartido.

## Uso directo

```powershell
graphify-mcp vault/graphify-out/graph.json
graphify-mcp vault/graphify-out/graph.json --transport http --host 127.0.0.1 --port 8080 --api-key "<secret>"
```

El transporte HTTP expone el grafo en red y requiere una clave. Para uso local del proyecto,
`stdio` es la opción más simple.

## Límites operativos

- El MCP consulta un grafo ya construido; no ejecuta el pipeline diario.
- Cambiar una nota no actualiza el grafo hasta ejecutar `rebuild-graph.ps1`.
- Los modelos gratuitos pueden sufrir rate limits durante clustering.
- `vault/graphify-out/` es regenerable y está ignorado por Git.
