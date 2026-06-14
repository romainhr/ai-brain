---
title: "InterleaveThinker: generación intercalada texto-imagen agéntica"
date: 2026-06-13
type: paper
vendor: community
domain: [multimodal, agents, vision]
ecosystem: [standalone, huggingface]
maturity: preview
source_type: paper
relevance: watch
url: https://arxiv.org/abs/2606.13679
tags: [type/paper, vendor/community, domain/multimodal, domain/agents, domain/vision, ecosystem/standalone, ecosystem/huggingface]
status: triaged
use_case: >
  Útil como referencia de diseño cuando quieras montar un pipeline multi-agente planner-critic sobre un generador
  de imágenes existente, para producir secuencias intercaladas texto-imagen (narrativas visuales, guías paso a paso,
  anotación de subtareas en agentes embodied). Mira el patrón de recompensas step-wise con GRPO si entrenas agentes
  que deben autocorregir instrucciones intermedias en vez de optimizar la trayectoria completa.
related: ["[[llm-agent-externalization-survey]]", "[[agentic-rag-sok]]", "[[evoarena-evomem]]"]
---

## Qué es
InterleaveThinker (arXiv:2606.13679, 11-jun-2026) propone el primer pipeline multi-agente para dotar a cualquier
generador de imágenes existente de capacidad de generación intercalada texto-imagen. Usa un agente planner que
organiza la secuencia de entrada imagen-texto y un agente critic que evalúa la salida del generador, detecta
desviaciones y refina las instrucciones paso a paso. Se entrena con tres datasets dedicados
(Interleave-Planner-SFT-80k, Interleave-Critic-SFT-112k, Interleave-Critic-RL-13k) y aplica RL vía GRPO con
recompensas de exactitud y step-wise. Reporta rendimiento comparable a Nano Banana y GPT-5 en benchmarks de
generación intercalada, con mejoras notables en razonamiento (WISE de 0.47 a 0.73, RISE de 13.3 a 28.9 sobre
FLUX.2-klein de 4 pasos).

## Por qué importa (para mis proyectos)
Traslada el patrón agéntico planner-critic con RL, ya familiar en agentes de texto y coding, al dominio multimodal
de generación de imágenes. El enfoque de optimizar recompensas por paso en lugar de la trayectoria completa es
directamente transferible a cualquier agente que ejecute pipelines largos con autocorrección intermedia. Además,
al ser un envoltorio que mejora generadores ya existentes sin reentrenarlos, es un buen modelo mental para añadir
capas de razonamiento y verificación encima de modelos que ya usas, sin tocar sus pesos.

## Cómo se usa / requisitos
Es investigación en fase preview: hay paper en arXiv y repositorio oficial en GitHub
(github.com/zhengdian1/InterleaveThinker), pero no es un producto GA. Requiere un generador de imágenes base
(validado sobre FLUX.2-klein) y reproducir el setup de SFT + GRPO con los datasets liberados si quieres replicar
resultados. Limitaciones: orientado a investigación, coste de entrenamiento RL no trivial, y los benchmarks comparan
contra modelos cerrados (Nano Banana, GPT-5) que no controlas. Úsalo como referencia arquitectónica y fuente de
datasets, más que como dependencia directa.

## Enlaces
- [arXiv 2606.13679](https://arxiv.org/abs/2606.13679)
- [Repo zhengdian1/InterleaveThinker](https://github.com/zhengdian1/InterleaveThinker)
