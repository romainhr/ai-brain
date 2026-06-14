---
title: "The Rise of AI-Native Software Engineering (revisión sistemática)"
date: 2026-06-13
type: paper
vendor: community
domain: [coding, agents, eval]
ecosystem: [standalone]
maturity: ga
source_type: paper
relevance: watch
url: https://arxiv.org/abs/2606.12986
tags: [type/paper, vendor/community, domain/coding, domain/agents, domain/eval, ecosystem/standalone]
status: triaged
use_case: >
  Úsala como marco mental cuando rediseñes tu flujo de trabajo agéntico de codificación: el modelo de competencias
  en nueve dimensiones (especificación, evaluación crítica, orquestación de agentes, metacognición) sirve para
  auditar dónde aportas valor tú frente al agente. Su eje "intención-colaboración-verificación" ayuda a decidir qué
  partes del ciclo automatizar con agentes tipo SWE-agent y qué verificación humana mantener.
related: ["[[llm-agent-externalization-survey]]", "[[agentic-rag-sok]]", "[[openai-codex-plugins]]", "[[claude-code-june-2026-update]]"]
---

## Qué es
Revisión sistemática de 48 publicaciones revisadas por pares (2016-2026) sobre cómo la IA generativa, los LLM y la
IA agéntica (agentes de codificación al estilo SWE-bench/SWE-agent) están transformando la ingeniería de software
en práctica, educación y fuerza laboral. El trabajo, elaborado mediante un flujo de cuatro agentes de investigación
(descubrimiento de literatura, análisis cienciométrico, transformación curricular e impacto laboral), aporta cinco
contribuciones: un marco conceptual organizado en torno a intención, colaboración y verificación; un modelo de
competencias de nueve dimensiones; una hoja de ruta curricular universitaria de cuatro fases con evaluación
resistente a la IA; estrategias de desarrollo docente y de transformación de la fuerza laboral; y una agenda de
once vacíos de investigación priorizados.

## Por qué importa (para mis proyectos)
Ordena el panorama de los agentes de codificación que ya uso a diario y nombra explícitamente las habilidades que
se vuelven críticas cuando el agente escribe el código: especificación clara de la intención, evaluación crítica de
salidas y verificación, en lugar de la generación pura de código. Eso es directamente aplicable a cómo estructuro
prompts, contratos y pasos de verificación en mis proyectos agénticos. Además matiza las expectativas: señala que
los beneficios de productividad son dependientes del contexto, un contrapeso útil frente al hype antes de rediseñar
pipelines completos sobre agentes.

## Cómo se usa / requisitos
Es un paper en arXiv (PDF/HTML abierto), no una herramienta; se "usa" como referencia conceptual y de diseño. Para
sacarle partido: lee el marco intención-colaboración-verificación y el modelo de nueve dimensiones, y mapéalos
contra tu propio harness (qué dimensión cubres tú, cuál delegas al agente, dónde falta verificación). Limitaciones:
es una síntesis de literatura con enfoque académico y curricular (orientado a universidades y formación), no ofrece
código ni benchmarks ejecutables; sus conclusiones sobre productividad son contextuales y conviene contrastarlas
con mediciones en tu propio entorno.

## Enlaces
- [arXiv 2606.12986](https://arxiv.org/abs/2606.12986)
