---
title: "OpenAI adquiere Ona — ejecución de agentes cloud persistente para Codex"
date: 2026-06-15
type: service
vendor: openai
domain: [agents, coding, infra]
ecosystem: [standalone]
maturity: announced
source_type: official
relevance: experimental
url: "https://openai.com/index/openai-to-acquire-ona/"
tags: [type/service, vendor/openai, domain/agents, domain/coding, domain/infra, ecosystem/standalone, maturity/announced, source_type/official, relevance/experimental]
status: triaged
use_case: >
  Cuando Codex Ona llegue a producción, usarlo para descargar tareas de agente de horas o días
  (análisis de repos grandes, pruebas de regresión largas, pipelines de research) sin mantener
  una laptop abierta. Relevante para workflows donde el agente necesita persistencia y estado
  entre sesiones largas sin intervención manual.
related: ["[[codex-june-2026-updates]]", "[[openai-gpt-5-5]]", "[[microsoft-agent-framework]]", "[[claude-code-agent-sdk-credits]]"]
---

## Qué es
OpenAI anunció la adquisición de **Ona** (anteriormente Gitpod GmbH), startup que provee
entornos de desarrollo en la nube seguros, persistentes y aislados. La integración en Codex
permitirá que los agentes ejecuten tareas de horas o días de forma desatendida, sin depender
de que el ordenador del usuario esté encendido y conectado. Codex superó ya los 5 millones
de usuarios semanales en el momento del anuncio (11 de junio de 2026).

La propuesta de valor: los sandboxes cloud de Ona están diseñados para ejecutar código real en
entornos reproducibles con acceso a filesystem, red controlada y credenciales inyectadas —
exactamente lo que un agente de coding de larga duración necesita para ser fiable.

## Por qué importa (para mis proyectos)
Compete directamente con el modelo de Anthropic (Managed Agents con scheduling cron y vault de
secrets). Si OpenAI integra la infraestructura de Ona en la API de Codex/Responses, los agentes
de OpenAI tendrán la misma proposición de valor que los Managed Agents de Anthropic: ejecutar
pipelines largos sin orquestación manual. Cambia la comparación de "qué modelo es mejor" a
"qué plataforma de ejecución agéntica es más madura". Señal de que el mercado se está moviendo
hacia agentes persistentes como producto.

## Cómo se usa / requisitos
Aún en fase de integración (anunciado, no disponible). Seguir el changelog de Codex para
disponibilidad. La infraestructura base de Gitpod/Ona existe y ya se usa en decenas de miles
de entornos dev. La integración en API y planes de precios está por definirse.

## Enlaces
- [Anuncio oficial OpenAI](https://openai.com/index/openai-to-acquire-ona/)
- [Cobertura SiliconANGLE](https://siliconangle.com/2026/06/11/openai-acquires-ai-agent-orchestration-startup-ona/)
