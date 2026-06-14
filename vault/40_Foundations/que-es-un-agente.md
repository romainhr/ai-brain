---
title: "Qué es un agente de IA"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/agent, domain/agents]
related: ["[[que-es-un-harness]]", "[[que-es-mcp]]", "[[que-es-rag]]", "[[microsoft-agent-framework]]", "[[openai-responses-api]]", "[[claude-code-agent-sdk-credits]]"]
---

# Qué es un agente de IA

## Definición
Un **agente** es un sistema que usa un LLM para **decidir y ejecutar acciones en bucle** hacia un
objetivo, en vez de producir una sola respuesta. La diferencia con un chatbot: el agente **actúa**
(usa tools), **observa** el resultado y **continúa** hasta terminar o pedir ayuda.

## Anatomía
- **Cerebro:** el LLM (mejor si es *reasoning* y bueno en tool-use).
- **Tools:** lo que puede hacer (shell, ficheros, búsqueda, APIs) — a menudo vía [[que-es-mcp]].
- **Loop + memoria + guardrails:** los aporta el harness ([[que-es-un-harness]]).
- **Objetivo y criterio de parada:** qué cuenta como "hecho" y cómo se verifica.

## Niveles de autonomía
1. **Asistente** (responde, no actúa).
2. **Copiloto** (sugiere acciones, el humano aprueba) — p. ej. autocompletado en IDE.
3. **Agente supervisado** (actúa en bucle, humano revisa puntos clave) — p. ej. Claude Code.
4. **Agente autónomo / cloud teammate** (trabaja horas solo sobre una tarea) — ver
   [[entornos-de-desarrollo]].

## Frameworks y SDKs de agentes (2026)
- **Claude Agent SDK** (Anthropic) — primitivas del harness de Claude Code (consume Agent SDK
  credit en uso headless — ver [[claude-code-agent-sdk-credits]]).
- **OpenAI Responses API** — tools integradas (web/file search, computer use) — ver [[openai-responses-api]].
- **Microsoft Agent Framework** — ecosistema Azure/.NET — ver [[microsoft-agent-framework]].
- **LangChain / LangGraph, CrewAI** — orquestación open, multi-agente.

## Patrones comunes
- **ReAct:** razonar↔actuar en cada paso.
- **Multi-agente:** roles especializados (planner, coder, reviewer) que colaboran.
- **Reflection / self-critique:** el agente revisa su propio output y reintenta.
- **Agentic RAG:** la recuperación se vuelve una decisión del agente ([[que-es-rag]]).

## Por qué importa (para mis proyectos)
Casi cualquier "app de IA" útil hoy es un agente. Saber el nivel de autonomía y el patrón adecuado
evita sobre-ingeniería (no todo necesita multi-agente) y guía qué SDK/harness elegir.

## Enlaces
- [AI Agent Frameworks 2026 (Morphllm)](https://www.morphllm.com/ai-agent-framework)
- [Awesome AI Agents 2026](https://github.com/Zijian-Ni/awesome-ai-agents-2026)
