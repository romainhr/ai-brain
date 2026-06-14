---
title: "Qué es RAG (Retrieval-Augmented Generation)"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/technique, domain/rag]
related: ["[[que-es-un-agente]]", "[[tecnicas-clave]]", "[[agentic-rag-sok]]", "[[que-es-un-llm]]"]
---

# Qué es RAG (Retrieval-Augmented Generation)

## Definición
**RAG** es el patrón de **recuperar información relevante de una fuente externa** (documentos, base
de datos, grafo) e **inyectarla en el contexto** del LLM antes de que responda. Resuelve dos
límites del modelo: el **corte de conocimiento** y la **alucinación**, anclando la respuesta a
evidencia recuperada.

## Pipeline clásico
1. **Ingesta:** trocear documentos en *chunks* y generar *embeddings*.
2. **Indexado:** guardar los embeddings en un *vector store* (o un grafo).
3. **Recuperación:** ante una consulta, buscar los chunks más similares.
4. **Generación:** pasar consulta + chunks al LLM para que responda citando la evidencia.

## El estado del arte en 2026
- **Agentic RAG (patrón dominante):** la recuperación deja de ser un paso fijo y se vuelve una
  **decisión del agente** — decide *cuándo* y *cómo* buscar durante el razonamiento. Ver [[agentic-rag-sok]].
- **Adaptive RAG:** un clasificador enruta cada consulta a un pipeline según su complejidad (barato
  para preguntas simples, agéntico/grafo para las difíciles).
- **Self-reflective / Corrective RAG:** el modelo evalúa sus propias recuperaciones y **re-consulta**
  si la evidencia es débil, reduciendo alucinaciones.
- **GraphRAG:** recuperar sobre un **knowledge graph** en vez de (o además de) similitud vectorial
  — captura relaciones, no solo cercanía semántica. *Es el enfoque de este proyecto con graphify.*
- **Gobernanza:** control de acceso y metadatos **antes** de recuperar (RAG empresarial).

## RAG vs. fine-tuning vs. context engineering
- ¿Falta **conocimiento fresco / privado**? → **RAG / context engineering**, no fine-tuning.
- ¿Falta **comportamiento/estilo** consistente? → fine-tuning (último recurso). Ver [[tecnicas-clave]].

## Por qué importa (para mis proyectos)
El AI Brain es, en el fondo, un **GraphRAG**: las notas son la fuente, graphify construye el grafo,
y consultar vía MCP recupera el subgrafo relevante para que Claude responda con fundamento. Conocer
los patrones (adaptive, corrective) marca cómo evolucionar las consultas.

## Enlaces
- [Qué es RAG en 2026 (Atlan)](https://atlan.com/know/what-is-rag/)
- [RAG techniques compared 2026 (Starmorph)](https://blog.starmorph.com/blog/rag-techniques-compared-best-practices-guide)
- [Agentic RAG Survey](https://github.com/asinghcsu/AgenticRAG-Survey)
