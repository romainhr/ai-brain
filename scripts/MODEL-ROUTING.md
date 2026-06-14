# Enrutamiento dinámico de modelos en el ai-news-pipeline

El workflow asigna a cada subtarea el **motor de mayor calidad** entre Claude (Opus/Sonnet),
Codex (GPT) y Gemini. La decisión es **dinámica**: un agente *router* la toma en cada corrida.

## Piezas

| Pieza | Rol |
|-------|-----|
| `pipeline/model-routing.yaml` | **Fuente de verdad**: motores, su `invoke`/`model`, `strengths` y `routing_hints`. |
| `.claude/agents/engine-runner.md` | **Puente** a CLIs externos: invoca `codex`/`gemini` por Bash y estructura la salida. |
| `.claude/workflows/ai-news-pipeline.js` | Orquesta: fase **Routing** (router) → **Research** → **Routing** (triage) → **Triage**. |

## Motores (verificado 2026-06-14)

| Engine key | Tipo | Invocación headless | Auth |
|------------|------|---------------------|------|
| `claude-opus` | nativo | `agent(..., {model:'opus'})` | sesión Claude Code |
| `claude-sonnet` | nativo | `agent(..., {model:'sonnet'})` | sesión Claude Code |
| `codex` | CLI externo | `codex exec --skip-git-repo-check` (encargo por stdin; `-m` opcional) | ✅ ChatGPT (login) |
| `gemini` | CLI externo | `gemini --yolo -p '...'` (encargo por stdin) | ✅ Google OAuth |

> Los CLIs externos corren **dentro del repo**, así que leen ellos mismos `sources.yaml`,
> `taxonomy.yaml` y los `.md` de los scouts — el conocimiento experto vive en un solo lugar.

## Flujo

1. **Routing (research):** el router lee `model-routing.yaml` y asigna un motor a cada uno de los 8
   scouts, optimizando calidad (p.ej. `scout-google-deepmind`/`scout-research` → Gemini;
   `scout-openai` → Codex; `scout-github` → Claude por su dependencia de `gh`).
2. **Research:** cada scout corre en su motor. Claude usa su `agentType` nativo; Codex/Gemini van
   por el puente. Salida común: `RAW_SCHEMA`.
3. **Routing (triage):** tras dedup, el router asigna un motor a cada hallazgo según su tipo/tema.
4. **Triage:** cada hallazgo se clasifica en su motor. Default de triage: `claude-opus` (juicio).

Si un motor externo falla o agota el timeout (300s), hay **fallback automático** a `claude-sonnet`
para no perder la tarea.

## Ajustes

- **Cambiar el modelo de un CLI:** edita `engines.<codex|gemini>.model` en `model-routing.yaml`
  (p.ej. `gpt-5.1-codex`, `gemini-3-pro`). Vacío = usa el default del CLI.
- **Cambiar las preferencias del router:** edita `strengths` y `routing_hints` en el YAML. No hace
  falta tocar el workflow.
- **Forzar un motor (debug):** ejecuta el workflow con `args.forceEngine = "gemini"` (o
  `"codex"`, `"claude-opus"`, `"claude-sonnet"`) para saltar el router.
- **Añadir un motor nuevo:** añádelo a `engines:` en el YAML y a las estructuras `ENGINE_KEYS` +
  (`CLAUDE_ENGINES` o `CLI_ENGINES`) del workflow.

## Requisitos

- `codex` y `gemini` instalados y autenticados (ver tabla). Comprobar: `codex login status`,
  y para gemini la existencia de `~/.gemini/oauth_creds.json`.
- Si un CLI no está disponible, el puente falla limpio y el pipeline cae a Claude por fallback.
