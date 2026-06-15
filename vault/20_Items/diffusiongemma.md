---
title: "DiffusionGemma (26B-A4B): difusión de texto open-weights de Google"
date: 2026-06-13
type: model
vendor: google
domain: [coding, infra]
ecosystem: [huggingface, ollama, standalone]
maturity: preview
source_type: official
relevance: watch
url: https://gigazine.net/gsc_news/en/20260611-google-ai-diffusiongemma
tags: [type/model, vendor/google, domain/coding, domain/infra, ecosystem/huggingface, ecosystem/ollama, ecosystem/standalone]
status: triaged
use_case: >
  Úsalo cuando necesites generación de texto/código de muy baja latencia: infilling de código, edición inline y
  reescritura, donde la difusión por bloques (256 tokens en paralelo) acelera hasta 4x frente a modelos
  autorregresivos. Útil como motor local rápido para herramientas agénticas con presupuesto de cómputo acotado
  (MoE de 25.2B total y ~3.8B activos), siempre que valides la calidad contra Gemma 4 antes de adoptarlo.
related: ["[[gemma-4]]", "[[gemini-3-5-flash]]", "[[mistral-large-3]]", "[[openai-gpt-5-5]]"]
---

## Qué es
DiffusionGemma es un modelo de lenguaje open-weights de Google que aplica el enfoque de difusión (el paradigma
de las IA de imágenes) a la generación de texto. En lugar de predecir un token tras otro de forma
autorregresiva, refina iterativamente bloques de hasta 256 tokens en paralelo mediante denoising discreto con
atención bidireccional. Es un Mixture-of-Experts de 25.2B parámetros totales con ~3.8B activos por paso
(clase 26B-A4B), bajo licencia Apache 2.0. Google reporta más de 1.000 tokens/s en una sola NVIDIA H100,
hasta 4x más rápido que modelos autorregresivos comparables.

## Por qué importa (para mis proyectos)
La latencia es un cuello de botella real en IA agéntica: cada paso de un agente espera la salida del modelo, y
en bucles con muchas iteraciones el coste de tiempo se acumula. Un modelo open-weights con licencia permisiva y
generación 4x más rápida puede reducir drásticamente el tiempo de respuesta en tareas como infilling de código,
edición inline y reescritura, que encajan bien con la atención bidireccional de la difusión. Al ser MoE con pocos
parámetros activos, ofrece buena relación coste/rendimiento para despliegues locales o autohospedados.

## Cómo se usa / requisitos
Los pesos están en Hugging Face (`google/diffusiongemma-26B-A4B-it`) y existe una variante cuantizada NVFP4 de
NVIDIA (`nvidia/diffusiongemma-26B-A4B-it-NVFP4`) que corre en una GeForce RTX 5090; también por Kaggle y Vertex
AI. Licencia Apache 2.0 (modificable y desplegable comercialmente sin coste). Limitaciones: es un lanzamiento
experimental/preview, el paradigma de difusión en texto es novedoso y conviene validar calidad frente a Gemma 4
antes de producción; la ventaja de velocidad depende del hardware (cifras sobre H100) y la generación por bloques
puede requerir ajustes de prompting distintos a los de modelos autorregresivos.

## Enlaces
- [Developer Guide oficial (Google Developers Blog)](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)
- [Guía NVIDIA para RTX locales](https://blogs.nvidia.com/blog/rtx-ai-garage-local-gemma-diffusion/)
- [Cobertura Gigazine](https://gigazine.net/gsc_news/en/20260611-google-ai-diffusiongemma)
- [MarkTechPost — anuncio](https://www.marktechpost.com/2026/06/10/google-ai-releases-diffusiongemma-a-26b-moe-open-model-using-text-diffusion-for-up-to-4x-faster-generation/)
