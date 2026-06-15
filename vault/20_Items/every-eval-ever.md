---
title: "Every Eval Ever — schema unificado y repositorio comunitario de evaluaciones AI"
date: 2026-06-15
type: benchmark
vendor: community
domain: [eval, agents]
ecosystem: [huggingface, standalone]
maturity: preview
source_type: paper
relevance: watch
url: "https://arxiv.org/abs/2606.14516"
tags: [type/benchmark, vendor/community, domain/eval, domain/agents, ecosystem/huggingface, ecosystem/standalone, maturity/preview, source_type/paper, relevance/watch]
status: triaged
use_case: >
  Cuando necesites comparar el rendimiento de un modelo en múltiples benchmarks sin
  reimplementar parsers: Every Eval Ever tiene ya convertidores para 31 formatos y una
  base de datos con 22,235 modelos. Usar su schema JSON como estándar propio para registrar
  resultados de evaluaciones del AI Brain pipeline, facilitando comparación entre runs.
related: ["[[olmo-eval-workbench]]", "[[claude-fable-5-coding-eval]]", "[[harnessx-adaptive-agent-harness]]"]
---

## Qué es
**Every Eval Ever** es un schema JSON unificado + conjunto de convertidores automáticos
para normalizar resultados de evaluación de IA de 31 formatos distintos (Eleuther lm-eval,
BIG-bench, OpenLLM Leaderboard, HELM, etc.) a una estructura común. Incluye:
- **Base de datos comunitaria en Hugging Face**: 22,235 modelos y 2,273 benchmarks indexados.
- **Convertidores automáticos**: ingesta resultados de los harnesses de eval más populares
  y los normaliza al schema unificado.
- **API pública**: consultar rendimiento de cualquier modelo en cualquier benchmark sin
  buscar en múltiples leaderboards separados.

Licencia: Apache 2.0. Datos: CC BY.

## Por qué importa (para mis proyectos)
Elimina el siloamiento de resultados de eval: en lugar de buscar en 5-10 leaderboards
distintos para comparar modelos, una sola consulta. Para el AI Brain, donde se toman
decisiones de routing de modelos basadas en rendimiento, tener una fuente normalizada de
benchmarks reduce la fricción de actualizar `model-routing.yaml` con datos reales.

## Cómo se usa / requisitos
```python
from every_eval import EvalDB
db = EvalDB.from_hub()  # carga la BD de HuggingFace
results = db.query(model="claude-sonnet-4-6", benchmark="swe-bench")
```
O via dataset HuggingFace: `datasets.load_dataset("every-eval/results")`.

## Enlaces
- [Paper arXiv:2606.14516](https://arxiv.org/abs/2606.14516)
- [Dataset en Hugging Face](https://huggingface.co/datasets/every-eval/results)
