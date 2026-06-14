---
title: "Técnicas clave: prompt, context engineering, fine-tuning"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/technique, domain/productivity]
related: ["[[que-es-un-llm]]", "[[que-es-rag]]", "[[que-es-un-harness]]", "[[glosario]]"]
---

# Técnicas clave para sacar partido a un LLM

> Cómo "programar" el comportamiento de un modelo, de lo más barato/rápido a lo más costoso.

## 1) Prompt engineering (ajustar la instrucción)
Coste cero de entrenamiento, iteración instantánea (cambias un string). Maduro en 2026:
- **Few-shot:** dar ejemplos de entrada→salida deseada.
- **Chain-of-Thought (CoT):** pedir razonamiento paso a paso.
- **System prompt estructurado:** rol, reglas, formato.
- **Salida estructurada:** forzar JSON con *schema* (decoding restringido).
- **Self-consistency:** muestrear varias veces y votar.
- **ReAct:** intercalar razonamiento y uso de tools (base de los agentes).
- *Límite:* un prompt de 4.000 tokens con 15 reglas es **frágil** y cada regla cuesta tokens en
  **cada** request.

## 2) Context engineering (inyectar los datos correctos) — la skill de 2026
Pasa de "cómo fraseo" a **"qué información entra en la ventana y cuándo"**: inyección dinámica,
gestión del estado, compactación, *prompt caching*, recuperación (RAG). El **82%** de líderes de
datos dice que el prompt engineering por sí solo ya no basta a escala.
- Trae datos **en vivo**: si cambias un precio el martes, el pipeline de contexto lo refleja esa
  tarde — sin reentrenar.
- Es lo que hace un buen **harness** ([[que-es-un-harness]]) y se apoya en **RAG** ([[que-es-rag]]).

## 3) Fine-tuning (cambiar los pesos)
Entrenar con cientos/miles de pares (entrada, salida) para **hornear** un comportamiento.
- **Cuándo SÍ:** estilo/formato muy consistente, tarea estrecha y estable, latencia/coste por token
  crítico a gran volumen.
- **Cuándo NO (lo más común):** el problema es **falta de contexto** (políticas cambiantes, datos
  privados, info fresca) → eso es RAG/context engineering, no fine-tuning.
- 2026: el **full fine-tuning casi nunca** es lo correcto para equipos de producto (caro, GPUs,
  días). Alternativas ligeras: LoRA/adapters.

## Árbol de decisión rápido
1. ¿Funciona con un buen **prompt**? → quédate ahí.
2. ¿Falta **conocimiento/datos** (frescos o privados)? → **RAG / context engineering**.
3. ¿Falta **comportamiento/estilo** estable y repetitivo, ya con contexto resuelto? → **fine-tuning**.
> Regla: validar con prompting, **hornear con fine-tuning solo cuando los datos lo demuestren**.

## Por qué importa (para mis proyectos)
Evita el error caro de fine-tunear cuando bastaba contexto. En el AI Brain todo es prompt + context
engineering (el grafo es la capa de contexto/RAG); no hay fine-tuning, y está bien así.

## Enlaces
- [Context engineering vs prompt engineering (DataHub)](https://datahub.com/blog/context-engineering-vs-prompt-engineering/)
- [Fine-tuning vs context engineering (2026)](https://aishwaryasrinivasan.substack.com/p/fine-tuning-vs-prompt-engineering)
