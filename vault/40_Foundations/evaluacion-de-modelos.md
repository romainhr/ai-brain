---
title: "Evaluación de Modelos de IA"
type: foundation
status: evergreen
updated: 2026-06-15
tags: [foundation, concept, type/benchmark, domain/eval]
related: ["[[que-es-un-llm]]", "[[panorama-de-modelos]]", "[[proveedores-de-modelos]]", "[[MOC-Research-Papers]]", "[[every-eval-ever]]", "[[claude-fable-5-coding-eval]]", "[[olmo-eval]]"]
---

# Evaluación de Modelos de IA

> Cómo se mide la capacidad real de un modelo — y por qué los números a menudo engañan.

---

## ¿Qué es un benchmark?

Un **benchmark** es un conjunto de tareas estándar con respuestas conocidas que permite comparar modelos de forma reproducible. El modelo "resuelve" cada tarea; la métrica agrega los resultados en un único número.

Problema fundamental: los benchmarks miden un **proxy** del comportamiento real, no el comportamiento en sí.

---

## Tipos de evaluación

### 1. Benchmarks académicos estándar

| Benchmark | Qué mide |
|---|---|
| **MMLU** | Conocimiento general (57 materias) |
| **HumanEval / MBPP** | Generación de código funcional |
| **SWE-bench** | Resolución de issues reales de GitHub |
| **MATH / AIME** | Razonamiento matemático |
| **GPQA** | Conocimiento experto (PhD-level) |
| **BIG-Bench Hard** | Tareas de razonamiento difícil |

### 2. Benchmarks de agentes

| Benchmark | Qué mide |
|---|---|
| **SWE-bench Verified** | Resolución end-to-end de bugs en repos reales |
| **WebArena / WorkArena** | Tareas en entornos web/desktop reales |
| **GAIA** | Agentes generalistas en tareas del mundo real |
| **EvoArena / EvoMem** ([[evoarena-evomem]]) | Memoria robusta en entornos dinámicos |

### 3. Arenas / comparación humana
- **LMSys Chatbot Arena** — comparaciones ciegas entre modelos por votación humana.
- Ventaja: captura preferencias reales. Desventaja: sesgo hacia respuestas largas/formales.

### 4. Evals internas de vendor
Cada empresa publica sus propias métricas al lanzar un modelo. Sesgo inherente: controlan qué mostrar.

---

## Cómo leer un benchmark: banderas rojas

1. **Contaminación de datos** — el modelo fue entrenado con datos que incluyen las respuestas del benchmark. Indicios: puntuación inusualmente alta en un benchmark viejo.
2. **Overfitting al benchmark** — fine-tuning específico para subir el número sin mejorar en uso real.
3. **Métrica irrelevante al caso de uso** — un modelo top en MATH puede ser peor que otro en SWE-bench para tareas de coding.
4. **Comparación con versiones distintas** — "gpt-4o" no es siempre el mismo modelo; los providers actualizan sin cambiar el nombre.
5. **Falta de intervalo de confianza** — la mayoría de benchmarks tienen varianza alta; diferencias pequeñas no son significativas.

---

## Cómo elegir el benchmark correcto

Pregunta: **¿qué tarea voy a hacer realmente?**

| Caso de uso | Benchmark útil |
|---|---|
| Completar código en un repo | SWE-bench, HumanEval |
| Agente autónomo con tools | GAIA, WebArena, EvoArena |
| Razonamiento complejo | GPQA, MATH |
| Conocimiento general / chat | MMLU, Arena |
| Evaluación continua de modelos | olmo-eval ([[olmo-eval]]) |

---

## El problema de los evals en 2026

- Los modelos más capaces se **saturan** en benchmarks clásicos (scores ~90%).
- La comunidad está construyendo evals dinámicos y repositorios colaborativos → [[every-eval-ever]].
- Las evaluaciones propias de vendors como Anthropic ([[claude-fable-5-coding-eval]]) son útiles pero no independientes.
- **Tendencia**: evals centrados en tareas agénticas end-to-end (SWE-bench Verified, GAIA) son más predictivos que preguntas de múltiple opción.

---

## Recursos en el vault
- [[every-eval-ever]] — schema unificado y repo comunitario de evals
- [[claude-fable-5-coding-eval]] — eval comunitaria de Fable 5 en coding
- [[olmo-eval]] — workbench de evaluación continua (AllenAI)
- [[evoarena-evomem]] — benchmark de memoria agéntica
- [[MOC-Research-Papers]] — papers sobre técnicas de evaluación
