# Conexión de los agentes scout (expertos de plataforma)

Los expertos de la Fase 1 viven en `.claude/agents/scout-*.md` y leen sus fuentes de
`pipeline/sources.yaml` (clave `scouts:`). Este doc explica **cómo se conectan** a cada plataforma
y qué activar para una conexión "API/MCP real" donde aporte.

## Estado actual (verificado 2026-06-14)

| Scout | Mecanismo hoy | Estado |
|-------|---------------|--------|
| `scout-github` | **`gh` CLI autenticada** (`romainhr`, API real) | ✅ Listo, sin setup |
| `scout-openai` / `-google-deepmind` / `-microsoft` / `-anthropic` | WebFetch/WebSearch de blogs y changelogs (+ `gh` para repos) | ✅ Listo |
| `scout-research` | WebFetch de arXiv / HF Papers / Papers with Code | ✅ Listo |
| `scout-community` | WebFetch de HN (API Algolia) y Reddit | ✅ Listo |
| `scout-x-twitter` | Web/Nitter + WebSearch (sin token) | ⚠️ Funciona, pero limitado — ver abajo |

## GitHub — API real vía `gh` (ya activo)

`gh` está instalado y con sesión iniciada, así que `scout-github` usa la API de GitHub
directamente (fechas exactas de releases/commits). Comprobar:

```bash
gh auth status            # debe decir "Logged in to github.com"
gh release list --repo anthropics/claude-code --limit 5
gh search repos "mcp server" --sort updated --limit 10 --json fullName,updatedAt,url
```

Si algún día caduca el token: `gh auth login`. Nada más que hacer.

### Opcional — GitHub MCP server

Si prefieres MCP en vez de la CLI, añade el server oficial a `.mcp.json` (requiere un PAT en
`GITHUB_PERSONAL_ACCESS_TOKEN`). Ejemplo (Docker):

```jsonc
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
               "ghcr.io/github/github-mcp-server"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}" }
    }
  }
}
```

No es necesario: `gh` ya cubre el caso. La CLI es más simple y no añade dependencia de Docker.

## X / Twitter — activar la API (recomendado para fechas exactas)

Sin credenciales, `scout-x-twitter` cae a web/Nitter: funciona pero X limita el scraping y algunas
fechas quedan `unknown`. Para una conexión fiable, dale un **Bearer Token** de la API de X v2.

1. Crea una app en `https://developer.x.com/` (plan con acceso a `tweets/search/recent`).
2. Exporta el token en el entorno donde corres Claude Code:
   ```powershell
   # PowerShell (persistente para tu usuario)
   setx X_BEARER_TOKEN "AAAA..."
   # o solo para la sesión actual:
   $env:X_BEARER_TOKEN = "AAAA..."
   ```
3. El agente detecta `X_BEARER_TOKEN` automáticamente y usa `search/recent` (cubre ~7 días con
   `created_at` exacto). No hace falta tocar el agente ni el workflow.

> Alternativa MCP: si usas un MCP de X/Twitter, regístralo en `.mcp.json` y añade una línea en
> `scout-x-twitter.md` indicando la tool a usar. El campo `connection:` de `sources.yaml > x_twitter`
> documenta el mecanismo activo.

## Cómo lo usa el pipeline

- **Workflow** (`/workflows` → `ai-news-pipeline`): hace fan-out por los 8 scouts vía `agentType`.
- **Skill** (`/ai-news-pipeline`): la Fase 1 delega en los mismos expertos (tool `Agent`,
  `subagent_type: scout-<nombre>`) o recorre sus fuentes manualmente.

Para añadir/quitar perfiles, repos o feeds, edita `pipeline/sources.yaml` (es la fuente de verdad
que cada scout lee al arrancar) — no hace falta tocar los `.md` de los agentes salvo que cambie el
*método* de conexión.
