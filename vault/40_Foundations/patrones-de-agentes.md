---
title: "Patrones Comunes en Sistemas Agénticos"
type: foundation
status: evergreen
updated: 2026-06-15
tags: [foundation, concept, type/agent, type/technique, domain/agents]
related: ["[[que-es-un-agente]]", "[[que-es-un-harness]]", "[[que-es-rag]]", "[[MOC-Agents-Harness]]", "[[llm-agent-externalization-survey]]", "[[harnessx-adaptive-agent-harness]]", "[[patrones-de-agentes]]"]
---

# Patrones Comunes en Sistemas Agénticos

> Los patrones de diseño que aparecen una y otra vez en agentes reales: cuándo usarlos y cuándo evitarlos.

---

## ¿Por qué importan los patrones?

Un agente sin estructura es un LLM con un loop. Los patrones convierten ese loop en algo predecible, depurable y componible. El survey de referencia [[llm-agent-externalization-survey]] los organiza en cuatro ejes: **memoria, skills, protocolos y harness**.

---

## Patrones de razonamiento

### ReAct (Reasoning + Acting)
El modelo intercala pasos de razonamiento (`Thought:`) con acciones (`Action:`) y observaciones (`Observation:`). Cada ciclo actualiza el contexto antes de la siguiente decisión.

- **Cuándo**: tareas que requieren múltiples pasos con feedback externo (búsqueda, código, APIs).
- **Riesgo**: loops infinitos si la observación no converge.

### Chain of Thought (CoT)
El modelo razona en voz alta antes de dar la respuesta final. Puede ser zero-shot (`"piensa paso a paso"`) o few-shot (ejemplos con razonamiento explícito).

- **Cuándo**: razonamiento matemático, lógica, planificación.
- **Variante**: Tree of Thought (ToT) — el modelo explora múltiples ramas.

### Reflexión / Critique-and-Revise
El agente genera una respuesta, luego la critica, luego la revisa. Puede ser auto-crítica o mediante un segundo agente.

- **Cuándo**: tareas donde la primera respuesta es frecuentemente incorrecta (código, argumentos).
- **Coste**: dobla o triplica el número de llamadas al LLM.

---

## Patrones de memoria

### In-context (scratchpad)
Toda la información relevante vive en el contexto actual. Simple pero limitado por la ventana.

### External Memory (RAG)
El agente recupera documentos relevantes antes de generar. Ver [[que-es-rag]].

### Episodic Memory
El agente guarda resúmenes de interacciones pasadas y los recupera cuando son relevantes. Útil para agentes de larga duración.

### Graph Memory
La memoria se estructura como grafo (entidades + relaciones). Permite razonamiento sobre conexiones. → [[mragent-graph-memory]]: la memoria se *reconstruye* a partir del grafo, no se recupera literalmente.

### Working Memory
Estado temporal que persiste durante la tarea pero no entre sesiones. Implementado como variables en el harness o como secciones del sistema prompt.

---

## Patrones de acción

### Tool Use
El modelo elige y llama herramientas (funciones, APIs, bash) definidas en el sistema. El harness ejecuta la tool y devuelve el resultado. Patrón central en MCP ([[que-es-mcp]]).

### Code Execution
El agente escribe código, lo ejecuta en sandbox y reacciona al output. Ejemplo: Codex CLI, Claude Code en modo agentic.

### Computer Use
El agente controla un navegador o escritorio mediante screenshots + acciones (clic, teclado). Más general que tool use pero más caro y frágil.

---

## Patrones multi-agente

### Orquestador + Sub-agentes
Un agente central descompone la tarea y delega subtareas a agentes especializados. El orquestador sintetiza los resultados.

- **Cuándo**: tareas paralelizables o que requieren expertise distinto.
- **Ejemplo**: Claude Code (orquestador) + scouts especializados en este vault.
- **Riesgo de caso real**: [[ai-agent-dn42-aws-bankruptcy]] — un sub-agente generó costes masivos sin supervisión.

### Pipeline (cascada)
La salida de un agente es la entrada del siguiente. Sin feedback hacia atrás.

- **Cuándo**: transformaciones secuenciales bien definidas (scrape → parse → classify → store).

### Debate / Panel de jueces
Múltiples agentes generan respuestas independientes; un juez (o votación) selecciona la mejor.

- **Cuándo**: decisiones críticas, generación de código difícil de verificar.

### Enjambre (Swarm)
Muchos agentes homogéneos trabajan en paralelo sobre partes del mismo problema.

- **Ejemplo**: [[kimi-work-desktop-agent]] — 300 sub-agentes paralelos.
- **Riesgo**: coordinación compleja, coste exponencial si mal acotado.

---

## Patrones de externalización

Según [[llm-agent-externalization-survey]], los agentes modernos externalizan cuatro cosas fuera del modelo:

| Qué | Dónde vive | Patrón |
|---|---|---|
| **Memoria** | DB, vector store, grafo | RAG, Graph Memory, Episodic |
| **Skills** | Archivos de skill, funciones | Tool use, code execution |
| **Protocolos** | MCP, ACP, A2A | Tool definitions, handshakes |
| **Harness** | CLI, orquestador | Pipeline, orquestador |

---

## Señales de alarma en diseño agéntico

- **Loops sin cota**: siempre define un `max_iterations` o un presupuesto de tokens/llamadas.
- **Herramientas destructivas sin confirmación**: borrar, enviar, publicar — siempre requieren aprobación explícita.
- **Contexto que crece sin límite**: un scratchpad sin compresión llena el contexto y degrada el rendimiento.
- **Agente sin observabilidad**: si no puedes ver qué herramientas llama y con qué argumentos, no puedes depurarlo.

---

## Recursos en el vault
- [[llm-agent-externalization-survey]] — taxonomía completa de externalización
- [[harnessx-adaptive-agent-harness]] — harness composable y adaptable
- [[cacherl-multi-turn-tool-calling]] — entrenamiento eficiente de agentes multi-turno
- [[gitofthoughts-version-controlled-reasoning]] — razonamiento con control de versiones
- [[mragent-graph-memory]] — memoria como reconstrucción (ICML 2026)
- [[ai-agent-dn42-aws-bankruptcy]] — caso de riesgo real (agente sin freno)
- [[MOC-Agents-Harness]] — todos los items del vault sobre agentes
