export const meta = {
  name: 'evaluate-project',
  description: 'Evaluar un repo contra el cerebro: fan-out de scouts -> consulta MCP graphify por eje -> sintesis a DECK_DATA',
  phases: [
    { title: 'Perfilar', detail: 'scouts en paralelo: configs+manifests, codigo LLM/SDK, .claude harness, docs (AGENTS/CLAUDE/README)' },
    { title: 'Consultar cerebro', detail: 'por cada eje del stack: query_graph/path/explain via MCP graphify -> recomendaciones con fuentes' },
    { title: 'Sintetizar', detail: 'consolidar perfil + recomendaciones en DECK_DATA para el deck HTML' },
  ],
}

const A = args || {}
const PROJECT = A.projectPath
const TODAY = A.today || 'sin-fecha'

if (!PROJECT) {
  throw new Error('evaluate-project workflow: falta args.projectPath (ruta al repo a evaluar)')
}

// Facetas del cerebro con las que casan los tags de las notas (espejo de vault/_taxonomy.md).
const TAX = `
type: model|tool|plugin|harness|skill|rule|mcp|framework|agent|dataset|benchmark|paper|service|technique
vendor: anthropic|openai|google|meta|mistral|xai|deepseek|qwen|microsoft|amazon|nvidia|huggingface|cohere|community|unknown
domain: coding|agents|rag|multimodal|voice|vision|infra|eval|data|security|productivity
ecosystem: claude-code|cursor|vscode|jetbrains|windsurf|copilot|langchain|llamaindex|obsidian|n8n|zapier|ollama|huggingface|standalone
maturity: announced|preview|ga|deprecated
relevance: core|experimental|watch
`

// --- Schemas estrictos (estilo del pipeline existente) ---

const AXIS = {
  type: 'object',
  additionalProperties: false,
  required: ['axis', 'value', 'evidence'],
  properties: {
    axis: { type: 'string', enum: ['model', 'harness', 'mcp_servers', 'agent_frameworks', 'patterns', 'ecosystem', 'maturity_observada'] },
    value: { type: 'string', description: 'lo que usa el proyecto en este eje; "" si no aplica' },
    evidence: { type: 'string', description: 'archivo/linea o dependencia que lo justifica' },
  },
}

const STACK_PROFILE = {
  type: 'object',
  additionalProperties: false,
  required: ['axes', 'notes'],
  properties: {
    axes: { type: 'array', items: AXIS },
    notes: { type: 'string', description: 'observaciones libres del scout sobre el stack agentico' },
  },
}

const SOURCE = {
  type: 'object',
  additionalProperties: false,
  required: ['nota', 'url', 'maturity', 'relevance'],
  properties: {
    nota: { type: 'string', description: 'titulo de la nota del cerebro devuelta por el MCP' },
    url: { type: 'string' },
    maturity: { type: 'string' },
    relevance: { type: 'string' },
  },
}

const BRAIN_RECO = {
  type: 'object',
  additionalProperties: false,
  required: ['axis', 'estado_actual', 'recomendado', 'veredicto', 'prioridad', 'accion', 'justificacion', 'fuentes'],
  properties: {
    axis: { type: 'string' },
    estado_actual: { type: 'string' },
    recomendado: { type: 'string', description: 'lo mejor/lo nuevo segun el cerebro; "" si sin datos' },
    veredicto: { type: 'string', enum: ['al-dia', 'mejorable', 'obsoleto', 'sin-datos'] },
    prioridad: { type: 'string', enum: ['P0', 'P1', 'P2', 'NA'] },
    accion: { type: 'string', description: 'que cambiar/adoptar; "" si al-dia o sin-datos' },
    justificacion: { type: 'string' },
    fuentes: { type: 'array', items: SOURCE, description: 'notas reales devueltas por el MCP; [] si sin-datos' },
  },
}

const DECK_DATA = {
  type: 'object',
  additionalProperties: false,
  required: ['project_name', 'date', 'profile', 'matrix', 'strengths', 'gaps', 'recommendations', 'roadmap'],
  properties: {
    project_name: { type: 'string' },
    date: { type: 'string' },
    profile: { type: 'array', items: AXIS },
    matrix: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['axis', 'actual', 'recomendado', 'veredicto'],
        properties: {
          axis: { type: 'string' },
          actual: { type: 'string' },
          recomendado: { type: 'string' },
          veredicto: { type: 'string', enum: ['al-dia', 'mejorable', 'obsoleto', 'sin-datos'] },
        },
      },
    },
    strengths: { type: 'array', items: { type: 'string' } },
    gaps: { type: 'array', items: { type: 'string' } },
    recommendations: { type: 'array', items: BRAIN_RECO },
    roadmap: { type: 'array', items: { type: 'string' }, description: 'orden sugerido de adopcion' },
  },
}

// === FASE 1 — Perfilar (scouts en paralelo) ===
phase('Perfilar')

const scoutPrompt = (focus, detail) => `Eres un scout de stack de IA/agentico. Proyecto a inspeccionar: ${PROJECT}
Foco: ${focus}.
${detail}
Usa Glob/Grep/Read. NO inventes: si un eje no aplica, devuelvelo con value "".
Captura por eje: value (lo que usa el proyecto) y evidence (archivo/linea o dependencia).
Ejes posibles: model, harness, mcp_servers, agent_frameworks, patterns, ecosystem, maturity_observada.
Devuelve SOLO los ejes que tu foco puede observar; el merge posterior los unira.`

const scouts = await parallel([
  () => agent(scoutPrompt('configs + manifests',
    'Lee .mcp.json, .claude/settings*.json, package.json, requirements.txt, pyproject.toml, pom.xml. Detecta mcp_servers, agent_frameworks (SDK/librerias de IA) y ecosystem.'),
    { label: 'scout:configs', phase: 'Perfilar', schema: STACK_PROFILE, agentType: 'Explore' }),

  () => agent(scoutPrompt('codigo LLM/SDK',
    'Busca llamadas a LLMs y nombres de modelo: anthropic, @anthropic-ai, claude-*, openai, gpt-*, gemini, langchain, llamaindex, crewai. Detecta model (version concreta) y agent_frameworks.'),
    { label: 'scout:codigo-llm', phase: 'Perfilar', schema: STACK_PROFILE, agentType: 'Explore' }),

  () => agent(scoutPrompt('.claude harness',
    'Lee .claude/ (skills, workflows, hooks, commands, agents) y equivalentes de Cursor/Windsurf/Copilot. Detecta harness, patterns (skills/loops/workflows/subagentes/RAG/hooks/rules) y ecosystem.'),
    { label: 'scout:harness', phase: 'Perfilar', schema: STACK_PROFILE, agentType: 'Explore' }),

  () => agent(scoutPrompt('docs del agente',
    'Lee AGENTS.md, CLAUDE.md, README.md, .cursorrules, .github/copilot-instructions.md. Detecta harness, patterns, ecosystem y maturity_observada (experimental vs produccion).'),
    { label: 'scout:docs', phase: 'Perfilar', schema: STACK_PROFILE, agentType: 'Explore' }),
])

// Merge + dedup de ejes (barrera ya consumida por parallel). Un valor por eje, concatenando evidencia.
const merged = {}
for (const s of scouts.filter(Boolean)) {
  for (const ax of (s.axes || [])) {
    if (!ax.value) continue
    if (!merged[ax.axis]) {
      merged[ax.axis] = { axis: ax.axis, value: ax.value, evidence: ax.evidence || '' }
    } else if (!merged[ax.axis].value.includes(ax.value)) {
      merged[ax.axis].value += `; ${ax.value}`
      if (ax.evidence) merged[ax.axis].evidence += `; ${ax.evidence}`
    }
  }
}
const profile = Object.values(merged)
log(`Perfil unificado: ${profile.length} ejes (${profile.map(a => a.axis).join(', ') || 'ninguno'})`)

// === FASE 2 — Consultar cerebro (pipeline por eje) ===
phase('Consultar cerebro')

const recos = (profile.length
  ? await pipeline(
      profile,
      (ax) => agent(`Eres el evaluador del AI Brain. Consulta el cerebro SOLO via las tools del MCP "graphify"
(query_graph / path / explain). Cargalas con ToolSearch (query "select:graphify" o por palabra clave) si no estan en contexto.

Eje a evaluar: "${ax.axis}".
Lo que usa el proyecto en este eje: "${ax.value}" (evidencia: ${ax.evidence || 'n/d'}).

Pregunta al cerebro: "mejor opcion hoy para ${ax.axis}", "alternativas a ${ax.value} / que lo desplaza",
"novedades relacionadas". Usa estas facetas para interpretar los tags de las notas:
${TAX}

Devuelve un BRAIN_RECO. REGLAS:
- "recomendado", "veredicto", "accion" salen SOLO de lo que devuelva el MCP.
- "fuentes" debe contener notas REALES devueltas por el MCP (titulo + url + maturity + relevance). Si el MCP no devuelve nada para este eje: veredicto="sin-datos", prioridad="NA", recomendado="", accion="", fuentes=[].
- NO inventes notas ni URLs.`,
        { label: `cerebro:${ax.axis}`, phase: 'Consultar cerebro', schema: BRAIN_RECO })
    )
  : []
).filter(Boolean)

log(`Recomendaciones del cerebro: ${recos.length} ejes consultados`)

// === FASE 3 — Sintetizar a DECK_DATA ===
phase('Sintetizar')

const deck = await agent(`Eres un arquitecto de IA senior. Consolida la evaluacion de un proyecto en un objeto DECK_DATA
para un deck HTML. Datos reales (no inventes nada fuera de esto):

PROYECTO: ${PROJECT}
FECHA: ${TODAY}

PERFIL DEL STACK (ejes detectados):
${JSON.stringify(profile, null, 2)}

RECOMENDACIONES DEL CEREBRO (una por eje consultado):
${JSON.stringify(recos, null, 2)}

Produce DECK_DATA:
- project_name: nombre legible del proyecto (deriva de la ruta).
- date: ${TODAY}.
- profile: los ejes del perfil tal cual.
- matrix: una fila por eje con actual / recomendado / veredicto (toma del reco correspondiente).
- strengths: 2-5 fortalezas (ejes "al-dia" o bien resueltos).
- gaps: 2-6 huecos/deudas (ejes "mejorable"/"obsoleto" o "sin-datos" relevantes).
- recommendations: ordena los BRAIN_RECO por prioridad (P0 primero), descarta los "sin-datos"/"NA"
  sin fuentes. Conserva sus fuentes (nota+url) intactas; NO añadas fuentes que no vinieran del cerebro.
- roadmap: 3-6 pasos en orden de adopcion sugerido.
Responde en espanol.`,
  { label: 'sintesis-deck', phase: 'Sintetizar', schema: DECK_DATA })

return deck
