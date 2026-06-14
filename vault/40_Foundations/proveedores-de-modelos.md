---
title: "Proveedores de modelos de IA"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/model]
related: ["[[que-es-un-llm]]", "[[panorama-de-modelos]]", "[[que-es-un-harness]]", "[[glosario]]"]
---

# Proveedores de modelos de IA (estado junio 2026)

> Quién produce los modelos y qué los distingue. Los modelos concretos y rankings viven en
> [[panorama-de-modelos]]; aquí va el mapa de **actores**.

## Frontera cerrada (API gestionada)
| Proveedor | Líneas principales | Rasgo distintivo |
|---|---|---|
| **Anthropic** | Claude Opus / Sonnet / Haiku; Fable 5, Mythos 5 | Foco en seguridad y agentes; **Opus 4.8 = #1 overall y en coding** (jun 2026). Harness propio: Claude Code |
| **OpenAI** | GPT-5.5 (y GPT-5.5 Instant) | "Sistema unificado" con router interno que elige el sub-modelo; Responses API para agentes |
| **Google** | Gemini 3.1 Pro, Gemini 3.5 Flash; Gemma (open) | El más barato de los frontera cerrados en prompts cortos; ecosistema Cloud |
| **xAI** | Grok 4.3, Grok 4 Fast | Muy económico; **Grok 4 Fast ~2M tokens** de contexto |

## Open-weights (pesos descargables)
| Proveedor | Líneas | Nota |
|---|---|---|
| **Meta** | Llama 4 | Referencia open histórica |
| **Qwen** (Alibaba) | Qwen3.7 Max, Qwen3-Coder | **Mejor coding open** y muy barato (~$1.25/M) |
| **DeepSeek** | V3 / R1 / V4 | Fuerte en razonamiento a bajo coste |
| **Mistral** | Large 3, Medium 3.5 | Proveedor europeo (jurisdicción UE) — ver [[mistral-large-3]] |
| **Google** | Gemma 4 (12B/31B) | Open de Google; **el 31B free es el backend de este proyecto** — ver [[gemma-4]] |
| **Z.AI** | GLM-5 | Contendiente open emergente |

## Cómo elegir proveedor (ejes de decisión)
1. **Capacidad** para la tarea (coding, reasoning, multimodal).
2. **Coste por token** (entrada/salida) y volumen previsto.
3. **Privacidad / jurisdicción:** ¿datos sensibles? → open-weights local u hosting UE.
4. **Contexto** necesario (¿documentos largos? → modelos de 1-2M).
5. **Ecosistema/harness:** si vives en Claude Code, Claude integra mejor; si en Azure, Microsoft.
6. **Fiabilidad/limits:** los tiers free (p. ej. OpenRouter) tienen rate-limits; los de pago, no.

## Vías de acceso
- **API directa** del proveedor (claves `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`…).
- **Agregadores** como **OpenRouter** (una sola key, muchos modelos, incl. tiers `:free`).
- **Local** vía **Ollama** / vLLM para open-weights (coste cero, privado).
- **Cloud enterprise:** AWS Bedrock, Azure OpenAI, Google Vertex.

## Por qué importa (para mis proyectos)
Mi stack prioriza **coste**: modelos free/locales (Gemma 4) para tareas no críticas y Claude para
lo interactivo. Esta tabla es la chuleta para decidir proveedor según el eje que domine cada
proyecto.

## Enlaces
- [AI Model Cost Breakdowns 2026 (Finout)](https://www.finout.io/blog/ai-model-cost-breakdowns-the-complete-2026-comparison-guide)
- [Best AI models 2026 (Pluralsight)](https://www.pluralsight.com/resources/blog/ai-and-data/best-ai-models-2026-list)
