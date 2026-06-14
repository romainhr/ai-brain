---
title: "Profiling en PyTorch (Parte 2): de nn.Linear a un MLP fusionado"
date: 2026-06-13
type: technique
vendor: huggingface
domain: [infra]
ecosystem: [huggingface, standalone]
maturity: ga
source_type: official
relevance: watch
url: https://huggingface.co/blog/torch-mlp-fusion
tags: [type/technique, vendor/huggingface, domain/infra, ecosystem/huggingface, ecosystem/standalone]
status: triaged
use_case: >
  Cuando necesites diagnosticar y reducir la latencia de inferencia de modelos propios o de agentes que corren
  modelos locales: aprende a leer trazas de torch.profiler, distinguir regímenes overhead-bound vs compute-bound,
  y aplicar fusión de kernels (torch.compile o la librería kernels del Hub) para acelerar bloques MLP sin
  reescribir la arquitectura.
related: ["[[microsoft-agent-framework]]", "[[openai-responses-api]]", "[[gemma-4]]", "[[diffusiongemma]]"]
---

## Qué es
Segunda parte de una guía técnica del blog de Hugging Face que enseña a perfilar PyTorch y a optimizar un bloque
MLP partiendo de capas `nn.Linear`. Avanza desde una sola capa lineal hasta apilar tres con activaciones
intermedias, y compara tres enfoques: eager (el bias se pliega en el epílogo del GEMM), torch.compile (elimina
overhead de dispatch en CPU y fusiona GeLU, multiplicación y reshape en un único kernel Triton manteniendo
intermedios en registros de GPU) y kernels hechos a mano vía la librería `kernels` del Hub (p. ej.
LigerGEGLUMLP). Explica la cadena de dispatch en CPU, el launch overhead y cómo anticipar la salida del profiler.

## Por qué importa (para mis proyectos)
Para IA agéntica que ejecuta modelos localmente o autoalojados, la latencia y el coste por token dependen de cuán
eficientes sean los kernels subyacentes. Saber leer un profiler y aplicar fusión de kernels permite recortar
overhead invisible (lanzamientos de kernel, ida y vuelta a memoria) que se acumula en bucles de inferencia
repetidos, como los de un agente que hace muchas llamadas cortas. Es conocimiento de infraestructura transferible:
ayuda a decidir cuándo merece la pena torch.compile, cuándo usar kernels precompilados del Hub y a justificar esas
decisiones con datos en vez de intuición.

## Cómo se usa / requisitos
Se sigue como tutorial reproducible: el post incluye scripts (`02_linear.py`, `03_simple_mlp.py`,
`03_kernels_mlp.py`). Requisitos: PyTorch reciente con torch.profiler y torch.compile, una GPU para ver los
efectos de fusión en Triton, y opcionalmente la librería `kernels` de Hugging Face para kernels hardware-optimizados
como LigerGEGLUMLP. Limitaciones: torch.compile introduce latencia de compilación inicial y especialización por
forma de tensor; los kernels precompilados la evitan pero dependen del hardware soportado. Es conocimiento de bajo
nivel orientado a optimización, no un producto; conviene leer la Parte 1 sobre torch.profiler primero.

## Enlaces
- [Blog de Hugging Face](https://huggingface.co/blog/torch-mlp-fusion)
