export const meta = {
  name: 'ai-news-pipeline',
  description: 'Barrido diario AI Brain: research fan-out (4 categorías) -> dedup -> clasificación por taxonomía',
  phases: [
    { title: 'Research', detail: 'un agente por categoría de fuente (official/github/community/paper), ventana 48h' },
    { title: 'Triage', detail: 'clasificar y redactar nota para cada hallazgo nuevo en ventana' },
  ],
}

const A = args || {}
const TODAY = A.today || '2026-06-13'
const WINDOW = A.windowHours || 48
const EXISTING = A.existing || [ // slugs ya en 20_Items
  'agentic-rag-sok', 'claude-code-agent-sdk-credits', 'claude-code-june-2026-update',
  'claude-fable-5', 'claude-mythos-5', 'gemini-3-5-flash', 'gemma-4',
  'llm-agent-externalization-survey', 'microsoft-agent-framework', 'mistral-large-3',
  'openai-codex-plugins', 'openai-gpt-5-5', 'openai-responses-api',
]

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

phase('Research')
const CATS = [
  { key: 'official', q: 'Anthropic/OpenAI/Google/Meta/Mistral/HuggingFace anuncios oficiales de modelos o features' },
  { key: 'github', q: 'nuevos MCP servers, skills/plugins de Claude Code o Codex, agentes de coding, herramientas dev en GitHub trending/releases' },
  { key: 'community', q: 'Hacker News, r/LocalLLaMA, r/ClaudeAI, newsletters: lanzamientos de herramientas/modelos de IA' },
  { key: 'paper', q: 'arXiv cs.AI/cs.CL y Papers with Code: papers notables de agentes LLM, RAG, memoria, harness, técnicas' },
]

const raw = (await parallel(CATS.map(c => () =>
  agent(
    `Eres un scout de research del "AI Brain". Hoy es ${TODAY}. Categoria: ${c.key}.
Tarea: con WebSearch (y WebFetch si hace falta), encuentra novedades de IA para desarrolladores publicadas DENTRO de las ultimas ${WINDOW} horas (aprox. ${TODAY} y los 2 dias previos). Tema: ${c.q}.
Prioriza RECALL alto pero verifica la FECHA de publicacion de cada hallazgo: marca in_window=true SOLO si realmente cae en la ventana. Descarta IA no relevante para devs.
Para cada hallazgo: title, url real (verificada, no inventada), source_type='${c.key}', vendor_guess, one_liner (1 frase), published_date (YYYY-MM-DD o unknown), in_window.
Devuelve hasta 12 hallazgos.`,
    { label: `research:${c.key}`, phase: 'Research', schema: RAW_SCHEMA }
  )
))).filter(Boolean)

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

phase('Triage')
const classified = (await parallel(fresh.map(f => () =>
  agent(
    `Eres el clasificador del "AI Brain". Hoy ${TODAY}.
Hallazgo: "${f.title}" — ${f.one_liner}
URL: ${f.url}
Fecha estimada: ${f.published_date}

Taxonomia controlada (USA SOLO estos valores, no inventes):
${TAX}

Notas YA EXISTENTES en el vault (slugs) — usalas para 'related' y para detectar duplicados:
${EXISTING.join(', ')}

Pasos:
1) Verifica con WebSearch/WebFetch que la fecha de publicacion cae dentro de las ultimas ${WINDOW}h respecto a ${TODAY}. Pon confirmed_in_window en consecuencia. Si NO lo confirmas, igual rellena pero marca confirmed_in_window=false.
2) Si es el mismo asunto que una nota existente SIN novedad real, pon is_duplicate_of=<slug>. Si no, "".
3) Clasifica con la taxonomia. Frontmatter: type(1), vendor(1), domain(>=1), ecosystem(>=0), maturity, source_type, relevance, url.
4) use_case: 1-3 frases accionables (cuando/para que sirve para mejorar proyectos de IA agentica).
5) related: 2-5 slugs de la lista existente que sean afines de verdad.
6) Cuerpo en español: body_que_es, body_por_que (por que importa para mis proyectos), body_como (como se usa/requisitos/limitaciones).
Todo el texto en ESPAÑOL con acentos correctos.`,
    { label: `triage:${slugify(f.title)}`, phase: 'Triage', schema: CLASSIFY_SCHEMA }
  )
))).filter(Boolean)

return {
  today: TODAY,
  raw_count: all.length,
  in_window_count: fresh.length,
  raw_findings: all,
  classified,
}