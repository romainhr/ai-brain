---
title: "CacheRL: entrenamiento eficiente de agentes multi-turno con tool-calling"
date: 2026-06-15
type: paper
vendor: community
domain: [agents, coding]
ecosystem: [standalone]
maturity: preview
source_type: paper
relevance: watch
url: "https://arxiv.org/abs/2606.14179"
tags: [type/paper, vendor/community, domain/agents, domain/coding, ecosystem/standalone, maturity/preview, source_type/paper, relevance/watch]
status: triaged
use_case: >
  Referencia técnica cuando se quiera afinar un modelo pequeño (3-7B) para tool-calling
  multi-turno sin los costes de ejecutar herramientas reales durante el entrenamiento: el
  sistema de cache fuzzy de CacheRL elimina la necesidad de entorno real en el training loop.
  Útil para construir modelos especializados en herramientas MCP concretas con pocos recursos.
related: ["[[harnessx-adaptive-agent-harness]]", "[[kimi-k2-7-code]]", "[[mragent-graph-memory]]"]
---

## Qué es
**CacheRL** entrena modelos pequeños (Qwen3-4B) para tool-calling multi-turno mediante
un sistema de **rollouts con caché fuzzy**: en lugar de ejecutar herramientas reales durante
el entrenamiento (lento, costoso, requiere entorno), CacheRL cachea las respuestas de
herramientas de runs anteriores y las reutiliza via matching fuzzy cuando el input es similar.

Resultados: 92% de process accuracy en benchmarks de tool-calling multi-turno vs. 94% de
GPT-5 (7B), usando **100x menos compute** que enfoques de entrenamiento estándar con
ejecución real de herramientas.

## Por qué importa (para mis proyectos)
Demuestra que es posible entrenar modelos 4B para tool-calling de alta calidad sin
infraestructura masiva. Para proyectos que quieran afinar un modelo small para herramientas
MCP específicas (p.ej. un agente especializado en el vault de Obsidian), CacheRL ofrece
una ruta práctica de fine-tuning sin el coste de simular el entorno en cada paso.

## Cómo se usa / requisitos
Código disponible en el repositorio del paper. Requiere: modelo base Qwen3 o compatible,
dataset de trazas de tool-calling para bootstrapping del caché, y infraestructura de
entrenamiento RL (PPO o similares). El caché fuzzy se implementa con similitud semántica
(embeddings) sobre las entradas de herramientas.

## Enlaces
- [Paper arXiv:2606.14179](https://arxiv.org/abs/2606.14179)
