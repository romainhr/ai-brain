---
title: "vLLM v0.23.0 — Model Runner V2, DeepSeek-V4, Gemma 4 MTP, frontend Rust"
date: 2026-06-15
type: tool
vendor: community
domain: [infra, coding, agents]
ecosystem: [huggingface, ollama, standalone]
maturity: ga
source_type: github
relevance: watch
url: "https://github.com/vllm-project/vllm/releases/tag/v0.23.0"
tags: [type/tool, vendor/community, domain/infra, domain/coding, domain/agents, ecosystem/huggingface, ecosystem/standalone, maturity/ga, source_type/github, relevance/watch]
status: triaged
use_case: >
  Actualizar a vLLM v0.23.0 si se sirven modelos Llama/Mistral (Model Runner V2 mejora
  rendimiento por defecto), DeepSeek-V4 (kernels TRTLLM optimizados) o Gemma 4 (soporte MTP).
  El KV cache offloading multi-tier es relevante para servir modelos grandes con VRAM limitada.
  El frontend Rust mejora throughput en alta concurrencia.
related: ["[[kimi-k2-7-code]]", "[[diffusiongemma]]", "[[gemma-4]]"]
---

## Qué es
**vLLM v0.23.0** es una release mayor del motor de inferencia LLM más popular para
self-hosting. Cambios principales:
- **Model Runner V2** como default para Llama y Mistral: nuevo backend de ejecución más
  eficiente en throughput y gestión de memoria.
- **Soporte DeepSeek-V4** con kernels TRTLLM nativos (más rápido que implementaciones
  previas).
- **Gemma 4 con MTP** (Multi-Token Prediction): aceleración especulativa para modelos Gemma 4.
- **KV cache offloading multi-tier**: offload de caché KV a CPU RAM o NVMe cuando la VRAM
  se agota, permitiendo servir contextos más largos.
- **Frontend en Rust** con streaming mejorado: mayor throughput en escenarios de alta
  concurrencia.

## Por qué importa (para mis proyectos)
vLLM es el motor de inferencia de facto para self-hosting. Las mejoras de Model Runner V2
y el KV offloading multi-tier hacen más accesible servir modelos grandes (como Kimi K2.7)
en hardware no enterprise. El soporte mejorado de DeepSeek-V4 y Gemma 4 amplía las opciones
de modelos open-weight de calidad para el engine-runner del AI Brain.

## Cómo se usa / requisitos
```bash
pip install vllm==0.23.0
vllm serve meta-llama/Llama-4-Scout-17B-16E-Instruct
```
Requiere GPU NVIDIA con CUDA 11.8+. El KV offloading multi-tier se activa con
`--kv-cache-dtype auto --max-model-len 131072 --cpu-offload-gb 20`.

## Enlaces
- [Release v0.23.0](https://github.com/vllm-project/vllm/releases/tag/v0.23.0)
- [vLLM docs](https://docs.vllm.ai)
