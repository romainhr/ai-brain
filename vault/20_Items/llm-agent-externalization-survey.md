---
title: "Paper: Externalization in LLM Agents (Memory, Skills, Protocols, Harness)"
date: 2026-06-13
type: paper
vendor: community
domain: [agents]
ecosystem: [standalone]
maturity: ga
source_type: paper
relevance: experimental
url: https://arxiv.org/pdf/2604.08224
tags: [type/paper, vendor/community, domain/agents, ecosystem/standalone]
status: triaged
use_case: >
  Marco mental para diseñar agentes: qué se "externaliza" del modelo (memoria, skills, protocolos
  como MCP, harness). Útil como checklist al estructurar el harness agéntico de un proyecto, incl.
  el propio AI Brain (memoria = grafo, skills = pipeline, protocolo = MCP).
related: ["[[claude-code-june-2026-update]]", "[[agentic-rag-sok]]"]
---

## Qué es
Revisión unificada de cómo los agentes LLM externalizan capacidades: **memoria** (almacenes,
recuperación), **skills** (herramientas/acciones), **protocolos** (p. ej. MCP) y **harness
engineering** (el andamiaje de ejecución).

## Por qué importa (para mis proyectos)
Da vocabulario y taxonomía para razonar sobre arquitecturas agénticas. Mapea directamente al
diseño del AI Brain: memoria = knowledge graph (graphify), skills = `ai-news-pipeline`, protocolo
= servidor MCP, harness = Claude Code.

## Cómo se usa / requisitos
- Lectura. arXiv 2604.08224.

## Enlaces
- [arXiv PDF](https://arxiv.org/pdf/2604.08224)
- [Awesome AI Agent Papers 2026](https://github.com/VoltAgent/awesome-ai-agent-papers)
