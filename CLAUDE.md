# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->

## Workflows multi-agente — routing de modelos (OBLIGATORIO)

**Siempre que ejecutes un `Workflow`** (orquestación multi-agente), enruta cada `agent(...)`
a la opción **más barata que resuelva bien su tarea**. Objetivo: **estirar los tokens de plan de
Claude** descargando todo lo posible a motores de coste cero o de suscripción plana, y reservar
Claude para lo crítico. Fija el motor/modelo de forma explícita — no dejes el modelo por defecto.

### Principio de coste (de más barato a más caro para *tu* plan)

1. **OpenRouter `:free`** y **Codex/Gemini CLI** → **coste cero o suscripción plana** (no gastan
   tokens de tu plan de Claude). Prefiérelos para el grueso del trabajo cuando la calidad alcance.
2. **Claude nativo** (`haiku` < `sonnet` < `opus`) → consume tu plan. Resérvalo para juicio fino,
   coherencia con instrucciones/taxonomía y la **verificación/síntesis final**.

> Heurística: deriva fan-out amplio y tareas auto-contenidas a CLIs externos / OpenRouter free;
> mantén en Claude la orquestación, las decisiones ambiguas y el QA final. Todo motor externo
> debe tener **fallback a Claude** si falla o agota timeout.

### Motores y cuándo usarlos

| Motor / modelo | Coste | Cuándo |
|---|---|---|
| **Claude `haiku`** | plan | mecánico/determinista: editar JSON/markdown, mover/borrar archivos, formatear, extracción acotada |
| **Claude `sonnet`** | plan | criterio o varios pasos: redactar prosa, refactors locales, clasificación, research acotado |
| **Claude `opus`** | plan | razonamiento difícil o QA crítico: diseño/arquitectura, verificación adversarial, síntesis final |
| **Codex CLI** `gpt-5.5` / `gpt-5.4` / `gpt-5.4-mini` | suscripción ChatGPT (0 tokens de plan) | coding y razonamiento, ecosistema OpenAI, análisis de repos. Modula el coste con el modelo (`mini` < `5.4` < `5.5`) y con `reasoning_effort` (`low`/`medium`/`high`/`xhigh`) |
| **Gemini CLI** (default del CLI) | suscripción Google (0 tokens de plan) | grounding/búsqueda web nativa, contexto enorme, barridos amplios y papers |
| **OpenRouter `:free`** (p. ej. `qwen/qwen3-coder:free`, `nvidia/nemotron-3-super-120b-a12b:free`, `openai/gpt-oss-120b:free`) | gratis (requiere `OPENROUTER_API_KEY`) | tareas auto-contenidas de alto volumen donde el rate-limit bajo y la variabilidad son aceptables; **siempre** con fallback a Claude |

### Cómo invocarlos en un workflow

- **Claude**: nativo — `agent(prompt, { model: 'haiku' | 'sonnet' | 'opus', schema })`.
- **Codex / Gemini / OpenRouter**: vía el agente puente — `agent(prompt, { agentType: 'engine-runner', schema })`,
  indicando el `ENGINE` y el encargo auto-contenido. El puente lee `pipeline/model-routing.yaml`
  (fuente de verdad: `invoke`, `model`, `reasoning_effort`, `strengths`) y estructura la salida.
  **No** mezcles `stderr` con `stdout` al capturar (los CLIs imprimen banners que rompen el JSON);
  usa la salida JSON nativa cuando exista (`gemini -o json`).

**Regla práctica:** el grueso del fan-out va a CLIs de suscripción / OpenRouter free o a `haiku`;
`sonnet` donde haga falta criterio; `opus` reservado a verificación/síntesis. Ante la duda, prueba
el motor más barato y deja que la fase de verificación (`opus`) detecte fallos.

## Build & Test

_Add your build and test commands here_

```bash
# Example:
# npm install
# npm test
```

## Architecture Overview

_Add a brief overview of your project architecture_

## Conventions & Patterns

_Add your project-specific conventions here_
