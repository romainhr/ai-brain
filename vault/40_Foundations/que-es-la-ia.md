---
title: "Qué es la IA (para desarrolladores)"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, domain/productivity]
related: ["[[que-es-un-llm]]", "[[que-es-un-agente]]", "[[glosario]]"]
---

# Qué es la IA (para desarrolladores)

> Nota fundacional. Marco conceptual estable; los datos puntuales se actualizan en las notas de
> novedades (`20_Items/`) y en [[panorama-de-modelos]].

## Definición de trabajo
**Inteligencia Artificial (IA)** es el campo que construye sistemas capaces de realizar tareas que
normalmente requieren inteligencia humana: percibir, razonar, decidir, generar lenguaje o imágenes.
Para un desarrollador en 2026, "IA" en la práctica casi siempre significa **modelos generativos
basados en deep learning**, y en particular **LLMs** (ver [[que-es-un-llm]]).

## Mapa de subcampos (de general a concreto)
- **Machine Learning (ML):** algoritmos que aprenden patrones de datos en vez de seguir reglas
  programadas a mano.
- **Deep Learning:** ML con redes neuronales profundas. Base de casi toda la IA moderna.
- **IA Generativa:** modelos que *producen* contenido nuevo (texto, código, imagen, audio, video).
- **Modelos fundacionales (foundation models):** modelos grandes preentrenados sobre corpus
  enormes, reutilizables para muchas tareas vía prompting o fine-tuning.
- **Agentes:** sistemas que usan un modelo para *actuar* en bucle con herramientas y memoria
  (ver [[que-es-un-agente]], [[que-es-un-harness]]).

## Paradigmas de uso (cómo se "programa" la IA hoy)
1. **Prompting / in-context learning:** describir la tarea en lenguaje natural; sin reentrenar.
2. **Context engineering:** inyectar dinámicamente los datos correctos en la ventana de contexto.
3. **Fine-tuning:** ajustar pesos con ejemplos cuando el comportamiento debe quedar "horneado".
4. **Sistemas agénticos:** orquestar modelo + tools + loop para tareas multi-paso.
Comparativa detallada en [[tecnicas-clave]].

## Conceptos transversales que conviene tener claros
- **Tokens:** unidad en la que el modelo lee/escribe; el coste y los límites se miden en tokens.
- **Ventana de contexto:** cuánto texto puede "ver" el modelo de una vez (de 128K a 2M en 2026).
- **Inferencia vs. entrenamiento:** usar el modelo (inferencia) vs. crearlo/ajustarlo (entrenar).
- **Alucinación:** el modelo afirma con seguridad algo falso; se mitiga con RAG ([[que-es-rag]])
  y verificación.
- **Multimodalidad:** un mismo modelo procesa texto + imagen + audio/video.

## Por qué importa (para mis proyectos)
Saber dónde encaja cada pieza evita errores caros: muchos problemas que parecen "necesitar
fine-tuning" son en realidad falta de contexto (RAG/context engineering), y muchas "apps de IA"
son en realidad **agentes** que necesitan un buen harness. Esta nota es el índice mental al que
cuelgan el resto de fundamentos.

## Enlaces
- [The best AI models in 2026 (Pluralsight)](https://www.pluralsight.com/resources/blog/ai-and-data/best-ai-models-2026-list)
- [AI Leaderboard 2026 (llm-stats)](https://llm-stats.com/)
