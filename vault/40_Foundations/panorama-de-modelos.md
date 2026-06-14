---
title: "Panorama de modelos (junio 2026)"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/model, type/benchmark]
related: ["[[proveedores-de-modelos]]", "[[que-es-un-llm]]", "[[claude-fable-5]]", "[[gemma-4]]", "[[openai-gpt-5-5]]", "[[gemini-3-5-flash]]"]
---

# Panorama de modelos — junio 2026

> Foto del mercado; **caduca rápido** (revisar mensualmente con el barrido). Los rankings exactos
> varían por benchmark. Para "¿cuál uso para X?" combinar con [[proveedores-de-modelos]].

## Frontera (lo mejor de cada casa)
| Modelo | Proveedor | Para qué destaca |
|---|---|---|
| **Claude Opus 4.8** | Anthropic | **#1 overall** y mejor en **coding** (SWE-bench Pro 69.2%) y computer-use (Mind2Web 84%); Intelligence Index 61.4 |
| **GPT-5.5** | OpenAI | Sistema unificado con router; fuerte generalista y productividad |
| **Gemini 3.1 Pro** | Google | Frontera cerrada más barata en prompts cortos; multimodal |
| **Grok 4.3 / Grok 4 Fast** | xAI | Muy económico; Grok 4 Fast con **~2M de contexto** |
| **Claude Mythos Preview** | Anthropic | Lidera **reasoning** (GPQA), acceso restringido |

## Rápidos / económicos (alto volumen, baja latencia)
- **GPT-5.5 Instant** (OpenAI) — default de ChatGPT, conciso. Ver [[openai-gpt-5-5]].
- **Gemini 3.5 Flash** (Google) — rápido y barato. Ver [[gemini-3-5-flash]].

## Open-weights (privacidad / coste / control)
| Modelo | Proveedor | Nota |
|---|---|---|
| **Qwen3.7 Max / Qwen3-Coder** | Qwen | Mejor coding open; ~$1.25/M (lo más barato del top) |
| **Llama 4** | Meta | Referencia open generalista |
| **DeepSeek V4 / R1** | DeepSeek | Razonamiento barato |
| **Mistral Large 3 / Medium 3.5** | Mistral | Opción UE — ver [[mistral-large-3]] |
| **Gemma 4 (12B/31B)** | Google | **Backend free de este proyecto** — ver [[gemma-4]] |
| **GLM-5** | Z.AI | Emergente |

## Precios de referencia (frontera, USD / 1M tokens, in/out)
- GPT-5.5 ≈ **$5 / $30**
- Claude Opus 4.8 ≈ **$5 / $25**
- Grok 4.3: de los más baratos de la frontera
- Gemini 3.1 Pro: barato en prompts cortos
- Qwen3.7 Max (open): ≈ **$1.25/M**
> La salida cuesta bastante más que la entrada: diseñar prompts y limitar `max_tokens` importa.

## Guía rápida "¿cuál para X?"
- **Coding agéntico serio:** Claude Opus 4.8 (o Qwen3-Coder si necesitas open/barato).
- **Razonamiento duro:** Claude Mythos Preview / modelos reasoning.
- **Alto volumen barato:** Gemini 3.5 Flash, GPT-5.5 Instant, o Gemma 4 free.
- **Contexto gigante (1-2M):** Grok 4 Fast.
- **Privacidad / coste cero:** open-weights local (Gemma 4, Qwen, Llama) vía Ollama.

## Por qué importa (para mis proyectos)
Esta es la nota que responde directamente "¿cuál es la mejor opción para X hoy?". Mantenerla al día
es el objetivo práctico del AI Brain.

## Enlaces
- [AI Leaderboard 2026 (llm-stats)](https://llm-stats.com/)
- [LLM Leaderboard (Artificial Analysis)](https://artificialanalysis.ai/leaderboards/models)
- [Best LLM for coding 2026 (pricepertoken)](https://pricepertoken.com/leaderboards/coding)
