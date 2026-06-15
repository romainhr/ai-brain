---
title: "Anthropic: deprecación Claude Sonnet 4 y Opus 4 (15-jun-2026)"
date: 2026-06-15
type: service
vendor: anthropic
domain: [coding, agents, infra]
ecosystem: [claude-code, standalone]
maturity: deprecated
source_type: official
relevance: core
url: "https://developers.make.com/white-label-documentation/release-notes/anthropic-claude-model-deprecations-on-june-15-2026"
tags: [type/service, vendor/anthropic, domain/coding, domain/agents, domain/infra, ecosystem/claude-code, ecosystem/standalone, maturity/deprecated, source_type/official, relevance/core]
status: triaged
use_case: >
  Migrar inmediatamente cualquier llamada a claude-sonnet-4-20250514 o claude-opus-4-20250514:
  reemplazar por Sonnet 4.6 (claude-sonnet-4-6) u Opus 4.7/4.8 respectivamente. Las llamadas
  a los IDs deprecados fallan sin periodo de gracia desde el 15-jun. Auditar todos los harness,
  scripts y integraciones que hardcodeen esos IDs de modelo.
related: ["[[claude-code-june-2026-update]]", "[[claude-code-agent-sdk-credits]]", "[[claude-fable-5]]"]
---

## Qué es
A partir del 15 de junio de 2026, Anthropic retiró de la API los identificadores
`claude-sonnet-4-20250514` y `claude-opus-4-20250514` sin periodo de gracia transitorio.
Las llamadas a esos IDs devuelven error inmediatamente. Los usuarios de plataformas de
integración (Make, Zapier, n8n, etc.) deben migrar manualmente a los nuevos identificadores.
Las rutas de actualización recomendadas son:
- `claude-sonnet-4-20250514` → `claude-sonnet-4-6`
- `claude-opus-4-20250514` → `claude-opus-4-7` o `claude-opus-4-8`

La retirada coincide con el mismo día en que entró en vigor la separación del pool de crédito
del Agent SDK.

## Por qué importa (para mis proyectos)
Cualquier harness, script, configuración de agente o integración que use esos IDs hardcodeados
dejará de funcionar sin advertencia previa. Es una ruptura de compatibilidad silenciosa. En el
contexto del AI Brain, revisar model-routing.yaml y cualquier referencia a claude-sonnet-4 o
claude-opus-4 sin sufijo de versión actualizado.

## Cómo se usa / requisitos
Buscar en todo el proyecto cualquier cadena `claude-sonnet-4-20250514` o `claude-opus-4-20250514`
y reemplazar. La Anthropic API sigue soportando Sonnet 4.6, Opus 4.7 y Opus 4.8. Verificar
también que los alias de alias (p.ej. `claude-sonnet-4-latest`) no resuelvan a los modelos retirados.

## Enlaces
- [Guía de migración (Make/Integromat)](https://developers.make.com/white-label-documentation/release-notes/anthropic-claude-model-deprecations-on-june-15-2026)
- [Guía de migración (Help Make)](https://help.make.com/anthropic-claude-model-deprecations-on-june-15-2026)
- [Análisis (UsageBox)](https://usagebox.com/articles/anthropic-june-15-agent-sdk-credit-split-claude-4-retirement)
