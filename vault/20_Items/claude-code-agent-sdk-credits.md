---
title: "Agent SDK credits (Claude Code)"
date: 2026-06-12
type: harness
vendor: anthropic
domain: [agents, coding, infra]
ecosystem: [claude-code]
maturity: ga
source_type: official
relevance: core
url: "https://code.claude.com/docs/en/agent-sdk/overview"
tags: [type/harness, vendor/anthropic, domain/agents, domain/coding, domain/infra, ecosystem/claude-code, maturity/ga, source_type/official, relevance/core]
status: triaged
use_case: >
  Relevante para presupuestar uso programático: desde 2026-06-15, Agent SDK y `claude -p` en
  planes de suscripción consumen un crédito mensual aparte del uso interactivo. Tenerlo en
  cuenta al automatizar agentes (p. ej. el agente diario del propio AI Brain).
related: ["[[claude-fable-5]]"]
---

## Qué es
A partir del 2026-06-15, el uso del Agent SDK y de `claude -p` en planes de suscripción se
descuenta de un **crédito mensual de Agent SDK** separado de los límites de uso interactivo.
El Agent SDK permite construir agentes que leen archivos, ejecutan comandos, buscan en la web y
editan código, con el mismo loop y gestión de contexto de Claude Code (Python y TypeScript).

## Por qué importa (para mis proyectos)
Cualquier automatización headless (incluido el scheduled agent de este cerebro) consume este
crédito. Conviene dimensionar la frecuencia/volumen del pipeline diario en consecuencia.

**Activo desde 2026-06-15.** Los pools son: $20 en plan Pro, $100 en Max 5x, $200 en Max 20x.
Si el pool se agota, el uso sigue a precios de API estándar. Auditar cuántos tokens consume
el pipeline diario del AI Brain para prever el presupuesto mensual.

## Cómo se usa / requisitos
Plan de suscripción con crédito de Agent SDK; SDK en Python o TypeScript. Ver overview oficial.

## Enlaces
- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
