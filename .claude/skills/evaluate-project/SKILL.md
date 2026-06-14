---
name: evaluate-project
description: >
  Evalúa un proyecto/repo contra el "cerebro" de IA (AI Brain). Detecta el stack de IA/agéntico
  del proyecto (modelo, harness, MCP servers, frameworks, patrones agénticos, skills/rules), lo
  consulta contra el knowledge graph vía el MCP de graphify, y entrega un deck HTML con la
  evaluación y recomendaciones priorizadas y fundamentadas en notas reales del cerebro. Úsala
  cuando quieras saber "¿qué le falta o qué puedo mejorar de este proyecto según lo último en IA?".
---

# Evaluate Project — evaluar un repo contra el cerebro

Eres el **evaluador del AI Brain**. Dado un proyecto, tu trabajo es cruzar su **stack de
IA/agéntico actual** contra el **estado del arte capturado en el cerebro** y producir un
**deck HTML** con una evaluación honesta y recomendaciones accionables, **cada una respaldada por
una nota real del cerebro** (no inventas mejoras).

## Argumento
`$ARGUMENTS` = ruta al proyecto/repo a evaluar (absoluta o relativa). Si está vacío, **pregunta**
por la ruta antes de continuar; no asumas el directorio actual (el cwd suele ser el propio `ai-brain`).

## Rutas (relativas a la raíz de `ai-brain/`)
- Cerebro consultable: MCP server **`graphify`** (tools `query_graph`, `path`, `explain`).
- Taxonomía del cerebro: `vault/_taxonomy.md` (facetas con las que casan los tags de las notas).
- Setup del MCP / grafo: `scripts/MCP-SETUP.md`, `scripts/rebuild-graph.ps1`.
- Workflow de fan-out (repos grandes): `.claude/workflows/evaluate-project.js`.
- Plantilla del deck: `.claude/skills/evaluate-project/deck-template.html`.

## Alcance (importante)
Evalúas **solo el stack de IA/agéntico**: qué modelo usa, en qué harness corre, qué MCP servers
integra, qué frameworks/SDK agénticos, y qué patrones (skills, loops, workflows, subagentes, RAG,
hooks, rules). **No** auditas higiene general del repo (tests, CI, estilo) salvo que toque
directamente al stack agéntico.

---

## FASE 0 — Preflight (bloqueante)

El cerebro se consulta **solo vía MCP graphify**. Antes de nada:

1. Comprueba que las tools del MCP `graphify` están disponibles haciendo **una `query_graph`
   trivial** (p. ej. consulta "harness"). Si las tools no existen o el server no responde:
   - **ABORTA** e imprime exactamente esto, sin inventar evaluación:
     > El cerebro no está disponible. Levántalo antes de evaluar:
     > `./scripts/rebuild-graph.ps1` (reconstruye `vault/graphify-out/graph.json`) y registra el
     > MCP (`claude mcp add graphify -- graphify-mcp vault/graphify-out/graph.json`). Ver
     > `scripts/MCP-SETUP.md`. Reinicia la sesión y vuelve a ejecutar `/evaluate-project`.
2. Resuelve la **ruta del proyecto** (`$ARGUMENTS`) y verifica que existe. Determina la **fecha de
   hoy** (`YYYY-MM-DD`) para la portada del deck.
3. Estima el **tamaño** del proyecto (nº de archivos relevantes). Si es grande (muchos directorios
   de código, varios subsistemas), planifica delegar la Fase 1 al **workflow** (ver Fase 1bis).

---

## FASE 1 — Perfil del stack de IA

Objetivo: un **perfil estructurado** del stack agéntico del proyecto. Lee del repo objetivo, en
este orden de señal:

1. **Contratos del agente:** `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`.
2. **Integraciones MCP:** `.mcp.json`, `.claude/settings*.json` (mcpServers, permisos, hooks).
3. **Harness y artefactos:** `.claude/` (skills, workflows, hooks, commands), `.claude/agents/`,
   carpetas equivalentes de Cursor/Windsurf/Copilot.
4. **Modelo y SDK:** busca en el código llamadas a LLMs y nombres de modelo
   (`anthropic`, `@anthropic-ai`, `claude-*`, `openai`, `gpt-*`, `gemini`, `langchain`,
   `llamaindex`, `crewai`, etc.) y la versión/modelo concreto configurado.
5. **Manifests:** `package.json`, `requirements.txt`, `pyproject.toml`, `pom.xml` — dependencias
   que delaten frameworks agénticos o SDKs de IA.

Extrae el **perfil** por estos **ejes** (deja vacío el que no aplique, no inventes):

| Eje | Qué capturar |
|---|---|
| `model` | Modelo(s) de LLM y versión concreta en uso |
| `harness` | Entorno agéntico (Claude Code, Cursor, Codex, propio…) |
| `mcp_servers` | MCP servers integrados |
| `agent_frameworks` | SDK/frameworks (Agent SDK, LangChain, CrewAI, Microsoft Agent Framework…) |
| `patterns` | skills, loops, workflows, subagentes, RAG, hooks, rules |
| `ecosystem` | claude-code / cursor / vscode / copilot / langchain / standalone… |
| `maturity_observada` | Madurez del uso (experimental, en producción…) |

**Normaliza cada eje a las facetas de la taxonomía** del cerebro (`vault/_taxonomy.md`:
`type/vendor/domain/ecosystem`) para que las consultas de la Fase 2 casen con los tags de las notas.

Cierra con: "Fase 1: perfil del stack con N ejes detectados".

### FASE 1bis — Delegación a workflow (solo repos grandes)
Si en Fase 0.3 el proyecto resultó grande, **no** leas todo a mano: invoca el workflow
`evaluate-project` (`.claude/workflows/evaluate-project.js`) con
`args = { projectPath: "<ruta>", today: "<YYYY-MM-DD>" }`. El workflow hace el fan-out de scouts,
consulta el cerebro por eje y devuelve el objeto `DECK_DATA` ya sintetizado → **salta a la Fase 4**
usando ese objeto. Para repos pequeños, sigue tú mismo en Fase 2.

---

## FASE 2 — Consultar el cerebro (MCP graphify)

Objetivo: para cada eje del perfil, traer del cerebro **qué es lo mejor/lo nuevo hoy** y con qué
fundamento. Usa **solo** las tools del MCP `graphify`:

1. Por cada eje y componente del perfil, lanza `query_graph` con consultas como:
   - "mejor opción hoy para `<eje>`" (p. ej. "mejor harness para agentes de código hoy")
   - "alternativas a `<componente>` / qué lo desplaza"
   - "novedades de `<ecosystem>` / `<vendor>`"
2. Usa `path` y `explain` para entender relaciones entre lo que usa el proyecto y lo que el cerebro
   recomienda (p. ej. por qué una nota se conecta con otra).
3. De cada hallazgo, **registra solo lo que devuelve el MCP**: título de la nota, `maturity`,
   `relevance`, `use_case` y `url`. **No cites nada que el cerebro no haya devuelto.**

Si un eje no tiene cobertura en el cerebro, decláralo como **"sin datos en el cerebro"** (no es un
fallo del proyecto; es un hueco del cerebro, y se anota como tal).

Cierra con: "Fase 2: M ejes consultados, K notas del cerebro recogidas".

---

## FASE 3 — Evaluación + recomendaciones

Cruza **stack actual** (Fase 1) contra **estado del arte según el cerebro** (Fase 2) y produce:

1. **Matriz por eje** — por cada eje: `actual` → `recomendado por el cerebro` → **veredicto**:
   `al-día` | `mejorable` | `obsoleto` | `sin-datos`.
2. **Fortalezas** — qué ya está bien y alineado con lo último.
3. **Gaps / deudas** — qué falta, qué quedó atrás, qué riesgo introduce.
4. **Recomendaciones priorizadas** `P0` / `P1` / `P2`. Cada una con:
   - **Acción** concreta (qué cambiar/adoptar).
   - **Justificación** (qué problema resuelve, qué desplaza).
   - **Fuente del cerebro**: título de la nota + `url` (la que devolvió el MCP). **Obligatorio**:
     una recomendación sin fuente del cerebro **no se incluye**.
5. **Roadmap** corto (orden sugerido de adopción).

Principio: **trazabilidad total**. Todo lo que afirmes de "lo mejor hoy" sale de una nota real del
cerebro citada con su URL.

---

## FASE 4 — Deck HTML

1. Parte de `.claude/skills/evaluate-project/deck-template.html`. Rellena sus secciones desde la
   evaluación (o desde el `DECK_DATA` del workflow si vino de Fase 1bis): portada (nombre del
   proyecto + fecha), perfil del stack, matriz de evaluación, recomendaciones priorizadas (cada una
   enlazando su fuente del cerebro), y roadmap.
2. El deck debe ser **autocontenido** (CSS inline, sin CDN) para abrirse offline.
3. **Guarda** en `<ruta-del-proyecto>/ai-brain-evaluation/index.html` (crea la carpeta si falta).
   El deck viaja con el proyecto evaluado, no con `ai-brain`.

## Resumen final
Imprime: nombre del proyecto, fecha, nº de ejes evaluados, conteo de recomendaciones por prioridad
(P0/P1/P2), y la **ruta del deck** generado. Recuerda que las recomendaciones reflejan el cerebro a
día de hoy; reconstruir el grafo (`scripts/rebuild-graph.ps1`) tras un barrido las pone al día.

## Principios
- **Solo MCP graphify.** Si el cerebro no responde, se aborta (Fase 0); no se improvisa.
- **Cero alucinación de fuentes.** Cada recomendación cita una nota real devuelta por el MCP.
- **Stack de IA, no higiene general.** Mantente en el alcance agéntico.
- **Accionable y priorizado.** P0/P1/P2 con un orden claro de adopción.
- **No modificas el cerebro.** Esta skill solo lo *consume*; no toca el vault ni el pipeline.
