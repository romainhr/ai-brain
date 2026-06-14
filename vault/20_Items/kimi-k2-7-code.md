---
title: "Moonshot AI Kimi K2.7-Code"
date: 2026-06-13
type: model
vendor: community
domain: [coding, agents]
ecosystem: [huggingface, ollama, standalone]
maturity: ga
source_type: official
relevance: core
url: https://www.marktechpost.com/2026/06/12/moonshot-ai-releases-kimi-k2-7-code-a-coding-model-reporting-21-8-on-kimi-code-bench-v2-over-k2-6/
tags: [type/model, vendor/community, domain/coding, domain/agents, ecosystem/huggingface, ecosystem/ollama, ecosystem/standalone]
status: triaged
use_case: >
  Úsalo como modelo de codificación agéntica open-weight self-hosted (vLLM/SGLang/KTransformers) o vía API
  barata cuando quieras reducir costes frente a modelos cerrados sin perder calidad en tool-use. Ideal para
  agentes de coding con uso intensivo de herramientas MCP y para flujos donde el coste por token de razonamiento
  importa, dado el recorte de ~30% en thinking tokens. Aprovecha los 256K de contexto para repos grandes.
related: ["[[mistral-large-3]]", "[[openai-codex-plugins]]", "[[claude-code-june-2026-update]]", "[[gemma-4]]", "[[openai-gpt-5-5]]"]
---

## Qué es
Kimi K2.7-Code es el nuevo modelo de codificación open-weight de Moonshot AI, sucesor de K2.6. Es una
arquitectura Mixture-of-Experts con 1T de parámetros totales y 32B activos por token (384 expertos, 8
seleccionados + 1 compartido, 61 capas), atención Multi-head Latent (MLA) y ventana de contexto de 256K.
Se publica bajo licencia Modified MIT con los pesos en Hugging Face, y también está disponible vía la API de
Kimi (identificador `kimi-k2.7-code`) y en la interfaz web de Kimi Code. Reporta +21.8% en Kimi Code Bench v2
(62.0 vs 50.9), mejoras en Program Bench y MLS Bench Lite, y supera a Opus 4.8 en MCP Mark Verified
(81.1 vs 76.4), con un recorte de ~30% en uso de tokens de razonamiento frente a K2.6. Llegó a la portada de
Hacker News con 444 puntos.

## Por qué importa (para mis proyectos)
Es un modelo de coding agéntico abierto y self-hostable que compite directamente con los modelos cerrados de
primera línea (afirma batir a Opus 4.8 en tool-use de MCP) a una fracción del coste por token. Para proyectos
de IA agéntica esto significa poder ejecutar un motor de coding fuerte sin depender de un proveedor cerrado,
controlar privacidad y costes, y experimentar con agentes intensivos en herramientas. El recorte de ~30% en
tokens de razonamiento reduce latencia y gasto en bucles agénticos largos, donde el coste se acumula rápido.

## Cómo se usa / requisitos
Se consume de tres formas: descargando los pesos desde Hugging Face para self-hosting (vLLM, SGLang o
KTransformers), llamando a la API de Kimi con el identificador `kimi-k2.7-code`, o usando la web de Kimi Code.
Precio de API en torno a 0.95 USD por millón de tokens de entrada y 4.00 USD por millón de salida. Limitaciones
importantes: el modo "thinking" es obligatorio (desactivarlo devuelve error de API) y los parámetros de sampling
están fijados; el self-hosting de un MoE de 1T exige hardware considerable. La comunidad (HN) matiza el hype:
rinde bien en tareas sencillas pero necesita instrucciones más precisas que los modelos frontier y a veces se
"descarrila"; varios cuestionan que los benchmarks publicados se sostengan en uso real, y Opus sigue aventajándolo
en captar la intención del usuario. La licencia Modified MIT permite self-hosting; revisar sus cláusulas para uso comercial.

## Enlaces
- [MarkTechPost — anuncio](https://www.marktechpost.com/2026/06/12/moonshot-ai-releases-kimi-k2-7-code-a-coding-model-reporting-21-8-on-kimi-code-bench-v2-over-k2-6/)
- [Model card en Hugging Face](https://huggingface.co/moonshotai/Kimi-K2.7-Code)
- [Discusión en Hacker News](https://news.ycombinator.com/item?id=48502347)
