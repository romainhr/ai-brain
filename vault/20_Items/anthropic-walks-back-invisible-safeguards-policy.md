---
title: "Anthropic revierte las \"salvaguardas invisibles\" de Fable 5"
date: 2026-06-13
type: service
vendor: anthropic
domain: [security, agents]
ecosystem: [claude-code, standalone]
maturity: ga
source_type: community
relevance: watch
url: https://simonwillison.net/2026/Jun/11/anthropic-walks-back-policy/
tags: [type/service, vendor/anthropic, domain/security, domain/agents, ecosystem/claude-code, ecosystem/standalone]
status: triaged
use_case: >
  Tenlo en cuenta si tus agentes o pipelines dependen de Claude Fable 5 para tareas relacionadas con desarrollo de
  LLM frontera o evaluación de modelos: antes podías sufrir degradación silenciosa de respuestas sin saberlo.
  Ahora, si una petición cae en una salvaguarda, recibirás una señal explícita (fallback visible a Opus 4.8 y
  explicación vía API), lo que te permite depurar respuestas inesperadas y ajustar prompts o modelo.
related: ["[[claude-fable-5]]", "[[claude-fable-5-suspended-github-copilot]]", "[[claude-code-june-2026-update]]", "[[claude-mythos-5]]"]
---

## Qué es
Anthropic revirtió un cambio de política que había introducido "salvaguardas invisibles" en Claude Fable 5: el
modelo degradaba en secreto su utilidad cuando detectaba peticiones relacionadas con el desarrollo de LLM frontera,
sin avisar al usuario. Tras las quejas de desarrolladores e investigadores de IA, la compañía hizo esas
salvaguardas visibles y transparentes: ahora una petición marcada muestra un fallback claro a Opus 4.8 (igual que
las salvaguardas de ciber y bio), con notificaciones visibles y explicación vía API. Anthropic reconoció que optar
por salvaguardas invisibles "fue el tradeoff equivocado". Lo reporta Simon Willison el 11 de junio de 2026.

## Por qué importa (para mis proyectos)
La fiabilidad y previsibilidad de un modelo son críticas para cualquier proyecto agéntico. Una degradación
silenciosa rompe la confianza: tus agentes podrían dar peores resultados sin ninguna señal, haciendo imposible
distinguir un fallo de prompt de una restricción del proveedor. El cambio a salvaguardas explícitas significa que
ahora puedes detectar cuándo una respuesta pobre se debe a una política y no a tu código. También es una lección
de gobernanza: al elegir proveedor, la transparencia sobre cuándo y cómo se limita el modelo es tan importante como
el rendimiento bruto.

## Cómo se usa / requisitos
No requiere acción de configuración: es un cambio de política aplicado por Anthropic sobre Claude Fable 5. A partir
de ahora, si tu petición activa una salvaguarda, verás un fallback explícito a Opus 4.8 y, vía API, una explicación
del rechazo o redirección. Limitación: las salvaguardas siguen existiendo (solo cambia su visibilidad), de modo que
peticiones sobre desarrollo de LLM frontera pueden seguir restringidas; la diferencia es que ahora lo sabrás.
Conviene instrumentar tus llamadas para registrar estos avisos y manejar el cambio de modelo (Fable 5 → Opus 4.8)
en tu lógica de costes y comportamiento.

## Enlaces
- [Simon Willison — Anthropic walks back policy](https://simonwillison.net/2026/Jun/11/anthropic-walks-back-policy/)
