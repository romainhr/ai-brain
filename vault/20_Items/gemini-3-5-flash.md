---
title: "Google Gemini 3.5 Flash"
date: 2026-06-13
type: model
vendor: google
domain: [coding, agents, multimodal]
ecosystem: [standalone]
maturity: ga
source_type: official
relevance: experimental
url: https://llm-stats.com/llm-updates
tags: [type/model, vendor/google, domain/coding, domain/agents, domain/multimodal, ecosystem/standalone]
status: triaged
use_case: >
  Modelo rápido y económico de Google para tareas de alto volumen con baja latencia (clasificación,
  enrutamiento, asistentes). Evaluar como backend de pago barato si el tier free de Gemma se queda
  corto por rate-limits.
related: ["[[gemma-4]]", "[[openai-gpt-5-5]]", "[[claude-fable-5]]"]
---

## Qué es
Nueva iteración Flash de Google (junio 2026): modelo multimodal optimizado para velocidad y coste
por token bajo, manteniendo capacidad razonable de razonamiento.

## Por qué importa (para mis proyectos)
Compite en el segmento "rápido y barato" con GPT-5.5 Instant. Útil como capa de inferencia
de alto throughput. Frente a Gemma 4 free, ofrece fiabilidad (sin rate-limits agresivos) a cambio
de coste por token.

## Cómo se usa / requisitos
- API de Google AI Studio / Gemini API (`GEMINI_API_KEY`).
- Compatible vía endpoint OpenAI-compat de Google (mismo patrón que el backend `gemini` de graphify).

## Enlaces
- [AI Updates (junio 2026)](https://llm-stats.com/llm-updates)
- [Google AI Blog](https://blog.google/technology/ai/)
