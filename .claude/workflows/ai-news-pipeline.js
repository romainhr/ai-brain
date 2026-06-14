export const meta = {
  name: 'ai-news-pipeline',
  description: 'Barrido diario AI Brain: enrutamiento dinámico de modelo (Claude/Codex/Gemini) -> research por expertos -> dedup -> clasificación por taxonomía',
  phases: [
    { title: 'Routing', detail: 'un router decide en runtime el motor de mayor calidad por scout y por hallazgo (lee model-routing.yaml)' },
    { title: 'Research', detail: 'experto por plataforma (x-twitter, github, openai, google-deepmind, microsoft, anthropic, research, community), cada uno en el motor asignado' },
    { title: 'Triage', detail: 'clasificar y redactar nota para cada hallazgo nuevo, en el motor asignado' },
  ],
}

const A = args || {}
const TODAY = A.today || '2026-06-13'
const WINDOW = A.windowHours || 48
const FORCE = A.forceEngine || ''   // si se fija, salta el router y usa ese motor en todo (debug)
const EXISTING = A.existing || [ // slugs ya en 20_Items
  'agentic-rag-sok', 'claude-code-agent-sdk-credits', 'claude-code-june-2026-update',
  'claude-fable-5', 'claude-mythos-5', 'gemini-3-5-flash', 'gemma-4',
  'llm-agent-externalization-survey', 'microsoft-agent-framework', 'mistral-large-3',
  'openai-codex-plugins', 'openai-gpt-5-5', 'openai-responses-api',
]

// ---------------------------------------------------------------------------
// Motores de enrutamiento. El JS solo necesita saber qué motores son Claude
// (nativos via agent+model) y cuáles son CLI externos (via puente engine-runner).
// El detalle de invocación (invoke/model/strengths/hints) vive en
// pipeline/model-routing.yaml — lo leen el ROUTER (para decidir) y el puente (para ejecutar).
// Si añades un motor al YAML, añádelo también a una de estas dos estructuras.
const ENGINE_KEYS = ['claude-opus', 'claude-sonnet', 'codex', 'gemini']
const CLAUDE_ENGINES = { 'claude-opus': 'opus', 'claude-sonnet': 'sonnet' }
const CLI_ENGINES = new Set(['codex', 'gemini'])
const DEFAULT_ENGINE_RESEARCH = 'claude-sonnet'
const DEFAULT_ENGINE_TRIAGE = 'claude-opus'   // triage = juicio fino: por defecto el más fiable
const FALLBACK_ENGINE = 'claude-sonnet'       // si un motor externo falla/agota timeout

const TAX = `
type: model|tool|plugin|harness|skill|rule|mcp|framework|agent|dataset|benchmark|paper|service|technique
vendor: anthropic|openai|google|meta|mistral|xai|deepseek|qwen|microsoft|amazon|nvidia|huggingface|cohere|community|unknown
domain: coding|agents|rag|multimodal|voice|vision|infra|eval|data|security|productivity
ecosystem: claude-code|cursor|vscode|jetbrains|windsurf|copilot|langchain|llamaindex|obsidian|n8n|zapier|ollama|huggingface|standalone
maturity: announced|preview|ga|deprecated
source_type: official|github|community|paper
relevance: core|experimental|watch  (criterio: utilidad para un dev que mejora sus proyectos de IA agéntica)
`

const RAW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['findings'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'url', 'source_type', 'one_liner', 'published_date', 'in_window'],
        properties: {
          title: { type: 'string' },
          url: { type: 'string' },
          source_type: { type: 'string', enum: ['official', 'github', 'community', 'paper'] },
          vendor_guess: { type: 'string' },
          one_liner: { type: 'string' },
          published_date: { type: 'string', description: 'YYYY-MM-DD o "unknown"' },
          in_window: { type: 'boolean', description: `true solo si se publicó dentro de las ultimas ${WINDOW}h respecto a ${TODAY}` },
        },
      },
    },
  },
}

const CLASSIFY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'title', 'type', 'vendor', 'domain', 'maturity', 'source_type', 'relevance', 'url', 'use_case', 'body_que_es', 'body_por_que', 'body_como', 'related', 'is_duplicate_of', 'confirmed_in_window'],
  properties: {
    slug: { type: 'string', description: 'kebab-case del title, sin fecha' },
    title: { type: 'string' },
    type: { type: 'string' },
    vendor: { type: 'string' },
    domain: { type: 'array', items: { type: 'string' } },
    ecosystem: { type: 'array', items: { type: 'string' } },
    maturity: { type: 'string' },
    source_type: { type: 'string' },
    relevance: { type: 'string' },
    url: { type: 'string' },
    use_case: { type: 'string', description: '1-3 frases accionables en español' },
    body_que_es: { type: 'string', description: 'parrafo en español, neutro' },
    body_por_que: { type: 'string', description: 'parrafo en español: por que importa para mis proyectos' },
    body_como: { type: 'string', description: 'parrafo en español: como se usa / requisitos / limitaciones' },
    related: { type: 'array', items: { type: 'string' }, description: '2-5 slugs de notas existentes afines' },
    is_duplicate_of: { type: 'string', description: 'slug existente si es duplicado real sin novedad; si no, ""' },
    confirmed_in_window: { type: 'boolean', description: 'true solo si verificaste fecha de publicacion dentro de la ventana' },
  },
}

const ROUTING_SCHEMA_R = {
  type: 'object', additionalProperties: false, required: ['assignments'],
  properties: {
    assignments: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['scout', 'engine', 'reason'],
        properties: {
          scout: { type: 'string', description: 'el type exacto, p.ej. scout-github' },
          engine: { type: 'string', enum: ENGINE_KEYS },
          reason: { type: 'string', description: '1 frase' },
        },
      },
    },
  },
}

const ROUTING_SCHEMA_T = {
  type: 'object', additionalProperties: false, required: ['assignments'],
  properties: {
    assignments: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['idx', 'engine'],
        properties: {
          idx: { type: 'integer' },
          engine: { type: 'string', enum: ENGINE_KEYS },
        },
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Despachador: corre un ENCARGO en el motor elegido.
// - Motor Claude  -> agent nativo con el model correspondiente (+ agentType del scout si aplica).
// - Motor CLI     -> agente puente engine-runner que invoca el CLI por Bash y estructura la salida.
//                    Si el puente falla (null), se reintenta en FALLBACK_ENGINE (Claude).
async function runOnEngine(engineKey, encargo, opts) {
  const { schema, label, phase: ph, claudeAgentType } = opts
  if (CLAUDE_ENGINES[engineKey]) {
    const o = { label, phase: ph, schema, model: CLAUDE_ENGINES[engineKey] }
    if (claudeAgentType) o.agentType = claudeAgentType
    return agent(encargo, o)
  }
  if (CLI_ENGINES.has(engineKey)) {
    const bridge =
`ENGINE: ${engineKey}
Lee pipeline/model-routing.yaml -> engines.${engineKey} para obtener 'invoke' (prefijo de comando) y 'model'. Si 'model' está vacío, NO pases -m.

Ejecuta ese CLI externo pasándole por STDIN el ENCARGO de abajo, con timeout (300s). Captura su stdout, extrae el JSON que devuelve y emítelo conforme al esquema de salida. Sigue tu procedimiento de puente; NO resuelvas tú la tarea.

=== ENCARGO ===
${encargo}`
    const r = await agent(bridge, { label: `${label} [${engineKey}]`, phase: ph, schema, agentType: 'engine-runner' })
    if (r != null) return r
    log(`⚠ motor ${engineKey} falló en ${label} -> fallback ${FALLBACK_ENGINE}`)
    const o = { label: `${label} [fallback]`, phase: ph, schema, model: CLAUDE_ENGINES[FALLBACK_ENGINE] }
    if (claudeAgentType) o.agentType = claudeAgentType
    return agent(encargo, o)
  }
  // engineKey desconocido -> default seguro
  const o = { label: `${label} [def]`, phase: ph, schema, model: CLAUDE_ENGINES[DEFAULT_ENGINE_RESEARCH] }
  if (claudeAgentType) o.agentType = claudeAgentType
  return agent(encargo, o)
}

// ---------------------------------------------------------------------------
// Scouts de research. 'key' = sección en sources.yaml; 'stype' = source_type por defecto.
const SCOUTS = [
  { type: 'scout-x-twitter', label: 'x-twitter', key: 'x_twitter', stype: 'community', enc: 'novedades de IA para devs circulando en X/Twitter (cuentas de labs, tooling, investigadores)' },
  { type: 'scout-github', label: 'github', key: 'github', stype: 'github', enc: 'repos/releases nuevos en GitHub: agentes, MCP servers, skills/plugins, frameworks, herramientas dev (usa gh CLI para fechas exactas)' },
  { type: 'scout-openai', label: 'openai', key: 'openai', stype: 'official', enc: 'novedades oficiales de OpenAI: modelos, API/Responses, Codex, changelog de plataforma' },
  { type: 'scout-google-deepmind', label: 'google-deepmind', key: 'google_deepmind', stype: 'official', enc: 'novedades de Google/DeepMind: Gemini, Gemma, Google AI/Developers, Vertex, papers DeepMind' },
  { type: 'scout-microsoft', label: 'microsoft', key: 'microsoft', stype: 'official', enc: 'novedades de Microsoft: Azure AI/Foundry, Copilot, Semantic Kernel, AutoGen/Agent Framework' },
  { type: 'scout-anthropic', label: 'anthropic', key: 'anthropic', stype: 'official', enc: 'novedades de Anthropic: modelos Claude, Claude Code, Agent SDK, API/changelog, MCP' },
  { type: 'scout-research', label: 'research', key: 'research', stype: 'paper', enc: 'papers notables con valor práctico: arXiv cs.AI/cs.CL/cs.LG, HF Papers, Papers with Code' },
  { type: 'scout-community', label: 'community', key: 'community', stype: 'community', enc: 'lo que destaca la comunidad: Hacker News, r/LocalLLaMA, r/ClaudeAI, r/MachineLearning, newsletters' },
]

// Encargo de research AUTOCONTENIDO: sirve igual para Claude (con agentType) y para CLIs externos
// (que leen ellos mismos los archivos del repo). El conocimiento experto sigue en un solo sitio.
function researchEncargo(s) {
  return `Eres el scout "${s.label}" del AI Brain (experto en su plataforma). Hoy es ${TODAY}; ventana: últimas ${WINDOW} horas (≈ ${TODAY} y los 2 días previos).
Antes de buscar, LEE estos archivos del repo para tu método y tus fuentes exactas (perfiles/repos/feeds):
  - pipeline/sources.yaml  -> sección scouts.${s.key}
  - .claude/agents/${s.type}.md
Encargo del día: ${s.enc}
Reglas: prioriza RECALL alto, pero VERIFICA la fecha de publicación de cada hallazgo; marca in_window=true SOLO si cae en la ventana. Descarta IA no relevante para devs y duplicados obvios entre tus propias fuentes.
Devuelve EXCLUSIVAMENTE un JSON con esta forma (sin texto alrededor):
{"findings":[{"title":"...","url":"<real y verificada>","source_type":"official|github|community|paper","vendor_guess":"...","one_liner":"<1 frase en español>","published_date":"YYYY-MM-DD|unknown","in_window":true|false}]}
Máximo 12 hallazgos. El source_type de este scout suele ser "${s.stype}".`
}

function triageEncargo(f) {
  return `Eres el clasificador del "AI Brain". Hoy ${TODAY}.
Hallazgo: "${f.title}" — ${f.one_liner}
URL: ${f.url}
Fecha estimada: ${f.published_date}

Taxonomía controlada (USA SOLO estos valores; si dudas, lee pipeline/taxonomy.yaml):
${TAX}

Notas YA EXISTENTES en el vault (slugs) — para 'related' y para detectar duplicados:
${EXISTING.join(', ')}

Pasos:
1) Verifica que la fecha de publicación cae dentro de las últimas ${WINDOW}h respecto a ${TODAY} (busca en la web si puedes). Ajusta confirmed_in_window.
2) Si es el mismo asunto que una nota existente SIN novedad real, is_duplicate_of=<slug>; si no, "".
3) Clasifica: type(1), vendor(1), domain(>=1), ecosystem(>=0), maturity, source_type, relevance, url.
4) use_case: 1-3 frases accionables (cuándo/para qué sirve para mejorar proyectos de IA agéntica).
5) related: 2-5 slugs de la lista existente que sean afines de verdad.
6) Cuerpo en español con acentos correctos: body_que_es, body_por_que (por qué importa para mis proyectos), body_como (cómo se usa/requisitos/limitaciones).

Devuelve EXCLUSIVAMENTE un JSON con estos campos (sin texto alrededor):
{"slug":"kebab-sin-fecha","title":"...","type":"...","vendor":"...","domain":["..."],"ecosystem":["..."],"maturity":"...","source_type":"...","relevance":"...","url":"...","use_case":"...","body_que_es":"...","body_por_que":"...","body_como":"...","related":["slug1","slug2"],"is_duplicate_of":"","confirmed_in_window":true|false}`
}

// ===========================================================================
// FASE 0 — ROUTING (research): el router decide el motor de cada scout.
phase('Routing')
const engineOf = {}
if (FORCE) {
  SCOUTS.forEach(s => { engineOf[s.type] = FORCE })
  log(`Routing: forzado a ${FORCE} (todos los scouts)`)
} else {
  const routeR = await agent(
    `Eres el ROUTER de modelos del AI Brain. Objetivo: MÁXIMA CALIDAD del resultado por tarea.
LEE pipeline/model-routing.yaml: úsalo para conocer los motores, sus 'strengths' y las 'routing_hints.research'.
Motores válidos (engine keys): ${ENGINE_KEYS.join(', ')}.
Asigna a CADA scout de research el motor de MAYOR CALIDAD para su tarea (pondera la naturaleza de la plataforma y las fortalezas de cada motor; respeta restricciones de herramientas como la dependencia de 'gh' en scout-github):
${SCOUTS.map(s => `- ${s.type}: ${s.enc}`).join('\n')}
Devuelve assignments: por scout (usa el 'type' exacto), el engine elegido y 1 frase de reason.`,
    { label: 'router:research', phase: 'Routing', schema: ROUTING_SCHEMA_R, model: 'sonnet' }
  )
  for (const a of (routeR?.assignments || [])) {
    if (ENGINE_KEYS.includes(a.engine)) engineOf[a.scout] = a.engine
  }
  log(`Routing research: ${SCOUTS.map(s => `${s.label}->${engineOf[s.type] || DEFAULT_ENGINE_RESEARCH}`).join(', ')}`)
}

// ===========================================================================
// FASE 1 — RESEARCH: cada scout corre en su motor asignado.
phase('Research')
const raw = (await parallel(SCOUTS.map(s => () => {
  const eng = engineOf[s.type] || DEFAULT_ENGINE_RESEARCH
  return runOnEngine(eng, researchEncargo(s), {
    schema: RAW_SCHEMA, label: `research:${s.label}`, phase: 'Research', claudeAgentType: s.type,
  })
}))).filter(Boolean)

// Aplanar + dedup por url/slug aproximado, quedarnos con in_window
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
const all = raw.flatMap(r => r.findings || [])
const seen = new Set()
const fresh = []
for (const f of all) {
  if (!f.in_window) continue
  const key = (f.url || '') + '|' + slugify(f.title)
  if (seen.has(key)) continue
  seen.add(key)
  fresh.push(f)
}
log(`Research: ${all.length} crudos -> ${fresh.length} en ventana (dedup intra-barrido)`)

// ===========================================================================
// FASE 2 — ROUTING (triage) + clasificación: el router decide el motor por hallazgo.
const triageEngineOf = {}
if (fresh.length) {
  phase('Routing')
  if (FORCE) {
    fresh.forEach((_, i) => { triageEngineOf[i] = FORCE })
  } else {
    const routeT = await agent(
      `Eres el ROUTER de modelos del AI Brain (fase TRIAGE). Objetivo: MÁXIMA CALIDAD de la clasificación.
LEE pipeline/model-routing.yaml: 'strengths' y 'routing_hints.triage'.
Motores válidos: ${ENGINE_KEYS.join(', ')}.
Asigna a CADA hallazgo el motor que mejor lo clasificará/redactará con la taxonomía (pondera tipo/tema del hallazgo):
${fresh.map((f, i) => `[${i}] ${f.title} — ${f.one_liner} (${f.url})`).join('\n')}
Devuelve assignments: por hallazgo, su idx (entero) y el engine.`,
      { label: 'router:triage', phase: 'Routing', schema: ROUTING_SCHEMA_T, model: 'sonnet' }
    )
    for (const a of (routeT?.assignments || [])) {
      if (ENGINE_KEYS.includes(a.engine)) triageEngineOf[a.idx] = a.engine
    }
  }
  log(`Routing triage: ${fresh.length} hallazgos -> ${fresh.map((_, i) => triageEngineOf[i] || DEFAULT_ENGINE_TRIAGE).join(', ')}`)
}

phase('Triage')
const classified = (await parallel(fresh.map((f, i) => () => {
  const eng = triageEngineOf[i] || DEFAULT_ENGINE_TRIAGE
  return runOnEngine(eng, triageEncargo(f), {
    schema: CLASSIFY_SCHEMA, label: `triage:${slugify(f.title)}`, phase: 'Triage',
  })
}))).filter(Boolean)

return {
  today: TODAY,
  routing: { forced: FORCE || null, research: engineOf, triage: triageEngineOf },
  raw_count: all.length,
  in_window_count: fresh.length,
  raw_findings: all,
  classified,
}
