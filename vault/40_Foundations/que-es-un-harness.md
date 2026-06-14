---
title: "Qué es un harness (agéntico)"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/harness, domain/agents]
related: ["[[que-es-un-agente]]", "[[que-es-mcp]]", "[[entornos-de-desarrollo]]", "[[claude-code-june-2026-update]]", "[[llm-agent-externalization-survey]]"]
---

# Qué es un harness (agéntico)

## Definición
Un **agent harness** es el **andamiaje alrededor de un LLM** que lo convierte en un agente que
funciona: el modelo solo predice tokens; el harness le da **herramientas, memoria, un bucle de
ejecución, verificación y guardrails**. Es la capa de infraestructura que gestiona registro de
tools, manejo del contexto, ejecución, memoria, manejo de errores, seguridad y el *feedback loop*
que permite tomar acciones secuenciales hacia un objetivo.

## Componentes de un harness
1. **Loop de ejecución:** típicamente un ciclo **ReAct** (razonar → actuar → observar) que se
   repite hasta completar la tarea. Claude Code usa 3 fases: *reunir contexto → actuar → verificar*.
2. **Tools:** capacidades externas (ejecutar shell, leer/escribir archivos, buscar, llamar APIs).
   Cada acción se registra y su resultado vuelve al modelo.
3. **Gestión de contexto:** qué entra en la ventana (archivos, historial, memoria), compactación,
   *prompt caching*. Esto es *context engineering* — ver [[tecnicas-clave]].
4. **Memoria:** estado que persiste entre pasos/sesiones (ficheros, vector store, grafo).
5. **Protocolos:** estándar para conectar tools/datos externos → **MCP** ([[que-es-mcp]]).
6. **Verificación y guardrails:** tests, permisos, *deny rules*, sandboxes, revisión humana.
7. **Sub-agentes / orquestación:** delegar sub-tareas a agentes especializados (anidados).

## Harness vs. framework
- **Harness** = los componentes arquitectónicos (loop, tools, memoria, motor de ejecución).
- **Framework** = la librería/plataforma que los implementa (LangChain/LangGraph, CrewAI, Claude
  Agent SDK, Microsoft Agent Framework — ver [[que-es-un-agente]]).
- Un **producto** como Claude Code o Cursor es un harness "llave en mano" (ver [[entornos-de-desarrollo]]).

## Loop engineering (2026)
La palanca se mueve de "escribir el mejor prompt" a **diseñar el sistema que genera y verifica
prompts en bucle** contra un objetivo y, a veces, en intervalo (cron/`/loop`). Calidad del *sistema*
> calidad del prompt suelto.

## Por qué importa (para mis proyectos)
El AI Brain *es* un harness: Claude Code (motor) + skill `ai-news-pipeline` (loop/tools) + grafo
graphify (memoria) + MCP (protocolo de consulta). Entender los componentes ayuda a evaluar
herramientas nuevas: ¿qué pieza del harness mejora?

## Enlaces
- [Qué es un agent harness (MindStudio)](https://www.mindstudio.ai/blog/what-is-agent-harness-architecture-explained)
- [Awesome Harness Engineering](https://github.com/ai-boost/awesome-harness-engineering)
- [Dive into Claude Code (arXiv)](https://arxiv.org/html/2604.14228v1)
