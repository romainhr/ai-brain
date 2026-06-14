---
title: "olmo-eval: workbench de evaluación continua de modelos (AllenAI)"
date: 2026-06-13
type: harness
vendor: huggingface
domain: [eval]
ecosystem: [huggingface, standalone]
maturity: ga
source_type: official
relevance: core
url: https://huggingface.co/blog/allenai/olmo-eval
tags: [type/harness, vendor/huggingface, domain/eval, ecosystem/huggingface, ecosystem/standalone]
status: triaged
use_case: >
  Úsalo cuando la evaluación sea parte continua del desarrollo de un modelo o agente y no una corrida única:
  define benchmarks como tasks, agrúpalos en suites y ejecútalos bajo distintas configuraciones (harnesses) sobre
  cada checkpoint para comparar versiones. Aprovecha la comparación pregunta-por-pregunta y las métricas
  estadísticas (error estándar, efecto mínimo detectable) para decidir si una mejora es real. También sirve para
  evaluaciones multi-turno y agénticas reproducibles.
related: ["[[agentic-rag-sok]]", "[[llm-agent-externalization-survey]]", "[[gemma-4]]", "[[microsoft-agent-framework]]"]
---

## Qué es
olmo-eval es un workbench de evaluación de código abierto creado por AllenAI (AI2) y anunciado en el blog de
Hugging Face el 12 de junio de 2026. Extiende el marco OLMES (Open Language Model Evaluation Standard) hacia el
resto del ciclo de desarrollo de un modelo. Se organiza en torno a tres abstracciones: **tasks** (definen
benchmarks), **suites** (agrupan tasks) y **harnesses** (especifican la configuración de ejecución), de modo que
un mismo benchmark puede correrse bajo distintas condiciones sin modificarlo. El repositorio está en
github.com/allenai/olmo-eval.

## Por qué importa (para mis proyectos)
La mayoría de las herramientas de evaluación están pensadas para correr benchmarks establecidos sobre modelos
terminados o para sandboxes agénticos puntuales, y no acompañan bien a un modelo que cambia constantemente. Cada
ajuste de datos, arquitectura o hiperparámetros obliga a reconfigurar benchmarks y re-ejecutarlos. Para proyectos
donde itero modelos o configuraciones, esto da una forma reproducible y estadísticamente honesta de medir
progreso real, incluyendo evaluaciones multi-turno y agénticas, evitando decisiones basadas en ruido de las
métricas agregadas.

## Cómo se usa / requisitos
Se usa definiendo tasks (benchmarks) y agrupándolas en suites, y ejecutándolas mediante harnesses que fijan las
condiciones de runtime; así se corre el mismo conjunto sobre múltiples checkpoints de forma consistente. Permite
comparación pregunta-por-pregunta además del puntaje agregado, soporta evaluaciones multi-turno/agénticas y aporta
análisis estadístico (error estándar, efecto mínimo detectable). Requisitos y límites: está pensado para
desarrollo continuo y aporta más valor en seguimiento checkpoint-a-checkpoint que en una corrida única; al
construirse sobre OLMES conviene familiarizarse con ese estándar. Es open source (repo allenai/olmo-eval).

## Enlaces
- [Blog de Hugging Face (AllenAI)](https://huggingface.co/blog/allenai/olmo-eval)
- [Repo allenai/olmo-eval](https://github.com/allenai/olmo-eval)
