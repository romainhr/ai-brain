---
title: "MRAgent: Memory is Reconstructed, Not Retrieved (ICML 2026)"
date: 2026-06-15
type: paper
vendor: community
domain: [agents, rag]
ecosystem: [standalone]
maturity: ga
source_type: paper
relevance: experimental
url: "https://arxiv.org/abs/2606.06036"
tags: [type/paper, vendor/community, domain/agents, domain/rag, ecosystem/standalone, maturity/ga, source_type/paper, relevance/experimental]
status: triaged
use_case: >
  Usar MRAgent como arquitectura de referencia cuando el agente necesita memoria episódica
  de largo plazo con recuperación de calidad: el grafo Cue-Tag-Content reconstruye activamente
  la ruta de recuperación en lugar de hacer nearest-neighbor estático, lo que es especialmente
  valioso en conversaciones largas o proyectos multi-sesión. Aplicar el patrón al AI Brain
  para indexar las notas del vault como grafo de memoria y recuperar contexto relevante con
  mayor precisión que RAG vectorial puro. +23% sobre baselines fuertes con menos tokens.
related: ["[[gitofthoughts-version-controlled-reasoning]]", "[[harnessx-adaptive-agent-harness]]", "[[agentic-rag-sok]]", "[[evoarena-evomem]]"]
---

## Qué es
**MRAgent** (Memory Reconstructed Agent) es una arquitectura de memoria para agentes LLM
presentada y aceptada en **ICML 2026**. La premisa: la memoria humana no es recuperación
estática sino reconstrucción activa de caminos de asociación. MRAgent implementa esto con:

- **Grafo Cue-Tag-Content**: las memorias se almacenan como nodos con cues (disparadores),
  tags (etiquetas semánticas) y content. Las aristas conectan memorias relacionadas.
- **Reconstrucción activa**: en lugar de embedding nearest-neighbor, el agente recorre
  activamente el grafo siguiendo cues relevantes al contexto actual.
- **Eficiencia**: logra +23% sobre baselines fuertes (MemGPT, A-MEM, HippoRAG) en LoCoMo
  y LongMemEval con menor consumo de tokens que enfoques de contexto largo.

## Por qué importa (para mis proyectos)
Para el AI Brain, donde el vault de Obsidian es esencialmente un grafo de memoria (notas
con wikilinks = Cue-Tag-Content), MRAgent valida que indexar el conocimiento como grafo
y recuperarlo activamente es superior a RAG vectorial puro. El vault ya tiene la estructura;
el paper aporta el argumento teórico y la evidencia empírica para justificar graphify como
capa de consulta. La reducción de tokens en recuperación es un beneficio práctico para el
pipeline diario.

## Cómo se usa / requisitos
Código disponible en GitHub (enlace en el paper). Implementación en Python compatible con
OpenAI y Anthropic APIs. Puede integrarse sobre un grafo existente (Neo4j, NetworkX) o
usar la implementación propia de grafo del paper.

## Enlaces
- [Paper arXiv:2606.06036](https://arxiv.org/abs/2606.06036)
- [ICML 2026](https://icml.cc/virtual/2026/paper/36049)
