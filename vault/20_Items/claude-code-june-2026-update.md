---
title: "Claude Code — actualización junio 2026"
date: 2026-06-13
type: harness
vendor: anthropic
domain: [coding, agents]
ecosystem: [claude-code]
maturity: ga
source_type: official
relevance: core
url: https://releasebot.io/updates/anthropic/claude-code
tags: [type/harness, vendor/anthropic, domain/coding, domain/agents, ecosystem/claude-code]
status: triaged
use_case: >
  Si trabajas a diario en Claude Code (como en este proyecto): usa Safe Mode para diagnosticar
  configs rotas, /cd para mover la sesión de directorio sin romper el cache, y /usage para ver qué
  componente de un plugin consume tokens. Los sub-agentes anidados y fallback models mejoran flujos
  agénticos largos.
related: ["[[claude-code-agent-sdk-credits]]", "[[claude-fable-5]]"]
---

## Qué es
Tanda de mejoras de Claude Code en junio 2026:
- **Safe Mode** (`--safe-mode`): arranca sin CLAUDE.md, skills, plugins, hooks, MCP, comandos ni
  temas — para aislar una configuración rota.
- **`/cd`**: mueve la sesión a otro directorio sin invalidar el prompt cache.
- **Desglose de `/usage`**: muestra qué componente dentro de un plugin gasta tokens.
- **Sub-agentes anidados**, **fallback models**, soporte de deny-rules por glob más amplio,
  seguridad de mensajes entre sesiones y **límites de tasa duplicados**.

## Por qué importa (para mis proyectos)
Es el harness donde opero el AI Brain. Safe Mode y `/cd` afectan el día a día; el desglose de
`/usage` ayuda a vigilar consumo (relevante tras el cambio de Agent SDK credits). Los sub-agentes
anidados habilitan pipelines más complejos sin salir del entorno interactivo.

## Cómo se usa / requisitos
- Actualizar Claude Code a la build de junio 2026. Flags/comandos: `--safe-mode`, `/cd`, `/usage`.

## Enlaces
- [Claude Code updates (junio 2026)](https://releasebot.io/updates/anthropic/claude-code)
- [Resumen de cambios](https://jangwook.net/en/blog/en/claude-code-june-2026-new-features-changelog-developer-guide/)
