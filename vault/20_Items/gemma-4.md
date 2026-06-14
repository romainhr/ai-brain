---
title: "Google Gemma 4 (12B / 31B)"
date: 2026-06-13
type: model
vendor: google
domain: [coding, agents]
ecosystem: [ollama, standalone]
maturity: ga
source_type: official
relevance: core
url: https://blog.google/technology/ai/
tags: [type/model, vendor/google, domain/coding, domain/agents, ecosystem/ollama, ecosystem/standalone]
status: triaged
use_case: >
  Modelo abierto para extracción/etiquetado y tareas no críticas a coste cero. En este propio
  proyecto, Gemma 4 31B (variante free vía OpenRouter) es el backend que construye el knowledge
  graph de graphify. Buena opción por defecto cuando quieras evitar gasto de API.
related: ["[[gemini-3-5-flash]]", "[[claude-fable-5]]"]
---

## Qué es
Familia de modelos abiertos de Google (Gemma 4), con variantes densas (p. ej. 31B) y de menor
tamaño (12B). Contexto largo (256K en la variante 31B) y modo de razonamiento configurable.
Disponible localmente (Ollama) y en gateways como OpenRouter, donde hay un tier gratuito.

## Por qué importa (para mis proyectos)
Es la palanca de **coste cero** del stack: suficiente para extracción de entidades, etiquetado y
resúmenes, que es exactamente lo que el AI Brain necesita para construir el grafo. Desplaza el uso
de APIs de pago en tareas no críticas. Limitación: calidad por debajo de los modelos frontera y,
en el tier free de OpenRouter, rate-limits (429) que pueden cortar lotes grandes.

## Cómo se usa / requisitos
- Local: `ollama pull gemma4` (o la variante) y backend `ollama` en graphify.
- OpenRouter free: `google/gemma-4-31b-it:free` con `OPENROUTER_API_KEY` (ver `~/.graphify/providers.json`).

## Enlaces
- [Google AI Blog](https://blog.google/technology/ai/)
- [Gemma 4 31B (free) en OpenRouter](https://openrouter.ai/google/gemma-4-31b-it:free)
