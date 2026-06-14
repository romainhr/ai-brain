---
title: "OpenAI Responses API"
date: 2026-06-13
type: service
vendor: openai
domain: [agents]
ecosystem: [standalone]
maturity: ga
source_type: official
relevance: experimental
url: https://developers.openai.com/api/docs/changelog
tags: [type/service, vendor/openai, domain/agents, ecosystem/standalone]
status: triaged
use_case: >
  Si construyes un agente sobre OpenAI, la Responses API trae tools integradas (web search, file
  search, computer use) sin cablear cada una a mano. Evaluar como atajo frente a orquestar tools
  manualmente; comparar con el Claude Agent SDK.
related: ["[[openai-codex-plugins]]", "[[microsoft-agent-framework]]"]
---

## Qué es
API de OpenAI para construir asistentes y apps basadas en tools de forma más flexible que
Chat Completions, con herramientas integradas (web search, file search, computer use) y facturación
por minuto de sesiones de contenedor (mínimo 5 min) desde junio 2026.

## Por qué importa (para mis proyectos)
Es el equivalente OpenAI al andamiaje agéntico de Anthropic. Útil conocerla para decidir SDK al
arrancar un agente nuevo; las tools integradas reducen el boilerplate de RAG/búsqueda.

## Cómo se usa / requisitos
- API de OpenAI (`OPENAI_API_KEY`). Endpoint Responses con bloques de tools.

## Enlaces
- [OpenAI API Changelog](https://developers.openai.com/api/docs/changelog)
