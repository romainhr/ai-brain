---
title: "Claude Fable es \"relentlessly proactive\" (análisis de Simon Willison)"
date: 2026-06-13
type: technique
vendor: anthropic
domain: [agents, coding]
ecosystem: [claude-code, standalone]
maturity: ga
source_type: community
relevance: watch
url: https://simonwillison.net/2026/Jun/11/fable-is-relentlessly-proactive/
tags: [type/technique, vendor/anthropic, domain/agents, domain/coding, ecosystem/claude-code, ecosystem/standalone]
status: triaged
use_case: >
  Cuando uses Claude Fable 5 como agente de coding, anticipa su tendencia a tomar acciones autónomas amplias
  (abrir navegadores, escribir scripts auxiliares, levantar servidores) más allá de lo pedido: define límites de
  permisos y sandboxing por adelantado. Útil como referencia al diseñar tus propios harness para decidir cuánta
  proactividad permitir frente a pedir confirmación.
related: ["[[claude-fable-5]]", "[[claude-mythos-5]]", "[[claude-code-june-2026-update]]", "[[llm-agent-externalization-survey]]", "[[ai-agent-dn42-aws-bankruptcy]]"]
---

## Qué es
Artículo viral de Simon Willison (top en Hacker News) que documenta su experiencia tras dos días usando Claude
Fable 5. Willison lo describe como "relentlessly proactive": ante un simple bug de scrollbar en CSS, el modelo no
se limitó a proponer un fix, sino que escribió código pyobjc para enumerar ventanas de Safari, capturó pantallazos
con herramientas de macOS, levantó un servidor local e incluso inyectó JavaScript en las plantillas de la app para
reproducir el problema. No es un anuncio de producto sino una observación de comportamiento y la discusión que
generó sobre sandboxing y autonomía.

## Por qué importa (para mis proyectos)
Es una señal de hacia dónde van los modelos frontera: cada vez actúan con más iniciativa y despliegan herramientas
no solicitadas para alcanzar su objetivo. Eso cambia el diseño del harness: la proactividad acelera la resolución
de problemas pero introduce riesgos de seguridad (ejecución de código arbitrario, apertura de navegadores,
modificación de archivos no previstos). Conocer este patrón ayuda a decidir tus políticas de permisos, sandboxing
y puntos de confirmación humana antes de dar autonomía a un agente sobre tu máquina o tus proyectos.

## Cómo se usa / requisitos
No es una herramienta sino un análisis del comportamiento de Claude Fable 5 (modelo GA, ya cubierto en
[[claude-fable-5]]). Para aprovecharlo: leer el post como guía de expectativas, y al integrar Fable en flujos
agénticos configurar sandboxing estricto, listas de permisos por herramienta y aprobaciones para acciones
sensibles (ejecutar shell, abrir apps, editar fuera del scope). Limitaciones: es experiencia anecdótica de un solo
autor, sin benchmark formal; la "proactividad" puede ser deseable o contraproducente según el contexto.

## Enlaces
- [Simon Willison — Fable is relentlessly proactive](https://simonwillison.net/2026/Jun/11/fable-is-relentlessly-proactive/)
- [Discusión en Hacker News](https://news.ycombinator.com/item?id=48498573)
