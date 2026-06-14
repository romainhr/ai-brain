---
title: "Glosario de IA"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, glossary]
related: ["[[que-es-un-llm]]", "[[que-es-un-harness]]", "[[que-es-rag]]", "[[que-es-mcp]]"]
---

# Glosario de IA

> Términos sueltos que aparecen en las notas. Definición de una línea + enlace al fundamento.

## Modelos y entrenamiento
- **Token** — unidad mínima de texto que procesa/factura un LLM (~¾ palabra). Ver [[que-es-un-llm]].
- **Ventana de contexto** — cuánto texto ve el modelo a la vez (128K–2M en 2026).
- **Parámetros / pesos** — los valores aprendidos; "tamaño" del modelo (3B…cientos de B).
- **MoE (Mixture of Experts)** — solo se activa una fracción de parámetros por token (eficiencia).
- **Embedding** — vector numérico que representa el significado de un texto; base de la búsqueda RAG.
- **Vector store** — base de datos de embeddings para recuperación por similitud.
- **Temperatura** — aleatoriedad de la salida (0 = determinista).
- **Reasoning / thinking model** — dedica cómputo a razonar antes de responder.
- **Fine-tuning / LoRA** — ajustar pesos (o adaptadores ligeros) con ejemplos. Ver [[tecnicas-clave]].
- **Cuantización** — reducir precisión de pesos para correr modelos en menos memoria.

## Agentes y harness
- **Agente** — LLM que actúa en bucle con tools hacia un objetivo. Ver [[que-es-un-agente]].
- **Harness** — andamiaje (loop, tools, memoria, guardrails) alrededor del LLM. Ver [[que-es-un-harness]].
- **ReAct** — patrón razonar↔actuar↔observar.
- **Tool / function calling** — capacidad externa que el modelo invoca.
- **Sub-agente** — agente especializado al que se delega una sub-tarea.
- **Guardrails** — límites de seguridad (permisos, deny rules, sandbox).
- **Loop engineering** — diseñar el sistema que genera/verifica prompts en bucle.

## Protocolos e integración
- **MCP (Model Context Protocol)** — estándar para conectar tools/datos a agentes. Ver [[que-es-mcp]].
- **ACP (Agent Client Protocol)** — permite a un IDE hospedar agentes de distintos vendors.
- **stdio / HTTP transport** — formas de servir un MCP (local vs. red).

## Recuperación y contexto
- **RAG** — recuperar evidencia externa e inyectarla en el contexto. Ver [[que-es-rag]].
- **GraphRAG** — RAG sobre un knowledge graph (enfoque de este proyecto).
- **Context engineering** — gestionar qué entra en la ventana de contexto. Ver [[tecnicas-clave]].
- **Prompt caching** — reutilizar el cómputo de un prefijo de contexto para abaratar requests.
- **Alucinación** — afirmación falsa con apariencia segura.

## Ecosistema y herramientas
- **Ollama** — runtime local para modelos open-weights (coste cero, privado).
- **OpenRouter** — agregador: una API key, muchos modelos (incl. tiers `:free`).
- **graphify** — herramienta que construye un knowledge graph del vault y lo sirve por MCP.
- **SWE-bench** — benchmark de resolución de issues de software reales (mide coding agéntico).
- **Open-weights vs. cerrado** — pesos descargables vs. solo API.
