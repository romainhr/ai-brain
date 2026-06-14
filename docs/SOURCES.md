# Fuentes y scouts

`pipeline/sources.yaml` es el catálogo canónico de fuentes. Cada scout lee su sección al arrancar;
los prompts describen el método, pero no deben mantener otra copia de cuentas, feeds o repos.

## Scouts

| Scout | Cobertura | Acceso principal |
|---|---|---|
| `scout-x-twitter` | X y conversación temprana | API de X si hay token; fallback web |
| `scout-github` | repos, releases y actividad | `gh` autenticado |
| `scout-openai` | OpenAI y Codex | documentación, changelog y repos |
| `scout-google-deepmind` | Google, Gemini y DeepMind | blogs, docs y repos |
| `scout-microsoft` | Azure AI, Copilot y frameworks | blogs, changelog y repos |
| `scout-anthropic` | Anthropic y Claude Code | documentación, changelog y repos |
| `scout-research` | papers | arXiv, HF Papers y Papers with Code |
| `scout-community` | señales comunitarias | HN, Reddit y newsletters |

## GitHub

```powershell
gh auth status
gh release list --repo anthropics/claude-code --limit 5
gh search repos "mcp server" --sort updated --limit 10
```

Si la sesión caduca, ejecuta `gh auth login`. No hace falta añadir un MCP de GitHub para el flujo
actual.

## X

Sin `X_BEARER_TOKEN`, el scout usa fuentes web y puede perder fechas o publicaciones. Con acceso a
la API v2, define el token en el entorno local:

```powershell
$env:X_BEARER_TOKEN = '...'
```

No guardes el token en prompts, notas ni archivos versionados.

## Modificar cobertura

1. Edita la sección adecuada de `pipeline/sources.yaml`.
2. Conserva URLs primarias y consultas concretas.
3. Actualiza el agente solo si cambia el método de acceso.
4. Ejecuta una captura acotada y comprueba fechas, duplicados y `source_type`.

Una fuente nueva no implica una categoría nueva. La clasificación sigue dependiendo de
`pipeline/taxonomy.yaml`.
