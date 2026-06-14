# Conectar el MCP server de graphify a Claude Code

graphify trae un ejecutable **`graphify-mcp`** que sirve el knowledge graph por MCP (stdio o
HTTP). Registrándolo en Claude Code podrás **consultar el cerebro** desde cualquier sesión
("¿mejor harness para agentes de código hoy?", "¿qué MCP servers nuevos hay para RAG?").

> Comandos verificados contra graphify instalado (2026-06-13).
> El grafo vive en `vault/graphify-out/graph.json` (graphify escribe dentro del path que le pasas).

## Ejecutable y uso directo

```bash
graphify-mcp --help
# Sirve un grafo por stdio (default):
graphify-mcp vault/graphify-out/graph.json
# HTTP (acceso en red, requiere api-key):
graphify-mcp vault/graphify-out/graph.json --transport http --host 127.0.0.1 --port 8080 --api-key "<secret>"
```

## Registrar en Claude Code

### Opción A — vía CLI (recomendada)

Desde la raíz del proyecto `ai-brain/`:

```bash
claude mcp add graphify -- graphify-mcp vault/graphify-out/graph.json
claude mcp list   # comprobar
```

### Opción B — manual en `.mcp.json` del proyecto

Archivo `ai-brain/.mcp.json` (ya creado en este repo):

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

Si `graphify-mcp` no está en el PATH de Claude Code, usa la ruta absoluta como `command`
(p.ej. `C:\\Users\\RomainAnge\\.local\\bin\\graphify-mcp.exe`).
Reinicia Claude Code en este directorio y el server "graphify" quedará disponible.

## Flujo de uso

1. Tras cada barrido (`/ai-news-pipeline`), reconstruye el grafo:
   ```powershell
   $env:OPENROUTER_API_KEY = 'sk-or-...'   # la key NO se persiste (decisión del usuario)
   ./scripts/rebuild-graph.ps1
   ```
2. En una sesión de Claude Code dentro de `ai-brain/`, pregunta en lenguaje natural; el modelo
   usará las tools del MCP (`query`, `path`, `explain`) sobre el cerebro para responder con
   fundamento en tus notas.

## Notas

- **Backend de construcción del grafo:** `openrouter` (Gemma 4 31B free), definido como custom
  provider en `~/.graphify/providers.json`. El MCP server **no** llama al LLM: solo recorre el
  `graph.json` ya construido, así que consultar el cerebro vía MCP no consume cuota de OpenRouter.
- **Rate limits del modelo free:** la construcción/etiquetado puede dar 429 en horas de carga.
  El grafo base se genera igual; el etiquetado de comunidades es lo único que puede quedar como
  placeholder ("Community N"). Reintentar más tarde lo resuelve.
- Para HTTP en vez de stdio, usa `--transport http` y registra la URL en lugar del comando.
