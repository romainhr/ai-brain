---
title: "Claude Fable 5 suspendido en GitHub Copilot"
date: 2026-06-13
type: service
vendor: anthropic
domain: [coding, agents]
ecosystem: [copilot, vscode]
maturity: deprecated
source_type: official
relevance: watch
url: https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/
tags: [type/service, vendor/anthropic, domain/coding, domain/agents, ecosystem/copilot, ecosystem/vscode]
status: triaged
use_case: >
  Si tenías flujos agénticos de coding apoyados en Claude Fable 5 dentro de Copilot, debes migrar ya a Opus 4.8,
  Sonnet 4.6 o Haiku 4.5, que siguen disponibles. Útil como recordatorio de no acoplar un harness de producción a
  un único modelo y de mantener una capa de abstracción que permita cambiar de modelo sin reescribir agentes.
related: ["[[claude-fable-5]]", "[[claude-mythos-5]]", "[[claude-code-june-2026-update]]", "[[openai-codex-plugins]]", "[[microsoft-agent-framework]]"]
---

## Qué es
GitHub suspendió el acceso a Claude Fable 5 en todas las experiencias de Copilot a partir del 12 de junio de 2026,
apenas tres días después de anunciarlo como generalmente disponible (anuncio original del 9 de junio). La
suspensión sigue a una decisión de Anthropic, que deshabilitó Fable 5 (y Mythos 5) para todos los clientes. Los
demás modelos de Claude —Opus 4.8, Sonnet 4.6 y Haiku 4.5— permanecen disponibles y sin cambios dentro de Copilot.

## Por qué importa (para mis proyectos)
Ilustra un riesgo concreto de dependencia: un modelo recién lanzado y promocionado para tareas autónomas de coding
a largo plazo puede desaparecer de un día para otro por motivos regulatorios o de políticas. Si construyes harness
o agentes acoplados a un modelo específico, una retirada repentina rompe tus flujos en producción. Refuerza la
necesidad de diseñar con una capa de abstracción de modelos y planes de contingencia.

## Cómo se usa / requisitos
No requiere acción técnica de instalación: es una baja de servicio. Quien usara Fable 5 en Copilot debe
seleccionar otro modelo Claude (Opus 4.8 para razonamiento profundo, Sonnet 4.6 como equilibrio, Haiku 4.5 para
latencia/coste). Contexto: la retirada fue global y no selectiva; además, Fable 5 exigía retención de datos
(30 días, hasta 2 años para contenido marcado) para sus clasificadores de seguridad, lo que ya había motivado
restricciones internas en Microsoft. Conviene verificar el changelog de GitHub para futuras reactivaciones.

**Actualización 2026-06-13:** La suspensión fue desencadenada por una **orden formal del gobierno de EEUU**
de control de exportación que prohíbe el acceso a Fable 5 y Mythos 5 por parte de nacionales extranjeros.
Amazon, en su rol simultáneo de inversor estratégico, cloud host (AWS Bedrock) y parte regulada, alertó
sobre vulnerabilidades de ciberseguridad explotables en Fable 5 que aceleraron la decisión. El ciclo completo
fue de 72 horas: lanzamiento el martes 9-jun → suspensión el viernes 12-jun.

## Enlaces
- [Changelog de GitHub](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/)
- [Statement oficial Anthropic](https://www.anthropic.com/news/fable-mythos-access)
- [Análisis Amazon como trigger del shutdown](https://www.techtimes.com/articles/318350/20260614/amazon-triggered-claude-fable-5-shutdown-investor-cloud-host-now-regulator.htm)
