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
al modelo **más barato que resuelva bien su tarea**. Objetivo: **mayor rendimiento al menor coste**.
Fija `model` de forma explícita en cada llamada — no dejes el modelo por defecto.

| Modelo | Cuándo usarlo | Ejemplos |
|---|---|---|
| **`haiku`** | Tareas mecánicas y deterministas | editar JSON/markdown, renombrar/mover/borrar archivos, formatear, extracción/búsqueda acotada, sincronizar tablas |
| **`sonnet`** | Tareas con criterio o varios pasos | redactar/editar prosa, instalar/configurar con manejo de errores, refactors locales, clasificación por taxonomía, research acotado |
| **`opus`** | Razonamiento difícil o QA crítico | diseño/arquitectura, verificación adversarial/escéptica final, síntesis de muchas fuentes, decisiones de alto impacto |

**Regla práctica:** el grueso del fan-out va en `haiku`; `sonnet` solo donde haga falta criterio;
`opus` reservado a la fase de **verificación/síntesis** final. Si una tarea es ambigua entre dos
niveles, prueba con el más barato y deja que la fase de verificación (`opus`) detecte fallos.

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
