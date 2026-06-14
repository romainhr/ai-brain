export const meta = {
  name: 'historia-ia-2022',
  description: 'Documentar la historia de la IA (nov 2022 -> hoy) como notas evergreen temáticas en vault/40_Foundations',
  phases: [
    { title: 'Investigar', detail: 'research web por eje: cronología, fechas y URLs verificadas' },
    { title: 'Redactar', detail: 'una nota foundation por eje, formato evergreen + wikilinks' },
    { title: 'Tejer', detail: 'nota índice maestra + actualizar _Home-Foundations' },
  ],
}

// Rutas RELATIVAS al cwd del proyecto (raíz del repo ai-brain o de un worktree).
// Lanzar este workflow desde la raíz del proyecto/worktree.
const FND = 'vault/40_Foundations'
const PERIODO = args?.periodo || 'noviembre 2022 (lanzamiento de ChatGPT) hasta junio 2026'

// Contrato de nota foundation (igual que panorama-de-modelos.md), inyectado en cada redactor.
const CONTRATO = `
FORMATO OBLIGATORIO de la nota (idéntico al resto de vault/40_Foundations/, p.ej. panorama-de-modelos.md):

Frontmatter YAML:
---
title: "<título legible de la línea de tiempo>"
type: foundation
status: evergreen
updated: 2026-06-14
tags: [foundation, history, <tags de taxonomía relevantes: type/model, domain/agents, vendor/openai, ...>]
related: ["[[nota-existente-1]]", "[[nota-existente-2]]", ...]   # 3-8 wikilinks a notas REALES del vault
---

Cuerpo en español, markdown, con esta estructura:
# <Título> — línea de tiempo

> 1-2 frases de encuadre y para qué sirve esta nota.

## Línea de tiempo
Una tabla cronológica densa | Fecha | Hito | Quién | Qué cambió | con TODOS los hitos verificados (apunta a 12-25 hitos por nota).
Cada fila con fecha real (YYYY-MM o YYYY-MM-DD) y el porqué importó.

## Hitos clave (detalle)
Para los 4-8 puntos de inflexión más importantes, un párrafo cada uno con el "por qué importó".

## Por qué importa (para mis proyectos)
1-2 frases accionables.

## Enlaces
- Lista de fuentes primarias verificadas (URLs reales).

REGLAS:
- Etiquetas SOLO de pipeline/taxonomy.yaml (léela). No inventes tags fuera de la lista (salvo 'history').
- 'related' debe apuntar a notas que EXISTEN en vault/20_Items/ o vault/40_Foundations/ (lista provista). Prefiere 3-8 fuertes.
- Verifica cada fecha y URL. No inventes enlaces ni versiones. Si dudas de una fecha, ponla aproximada (YYYY-MM) en vez de inventar día.
- Densidad > prosa: la tabla cronológica es el corazón de la nota.
`

const RESEARCH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'title', 'hitos'],
  properties: {
    slug: { type: 'string' },
    title: { type: 'string' },
    hitos: {
      type: 'array',
      minItems: 8,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['nombre', 'fecha', 'que_cambio', 'url'],
        properties: {
          nombre: { type: 'string' },
          fecha: { type: 'string', description: 'YYYY-MM o YYYY-MM-DD' },
          quien: { type: 'string' },
          que_cambio: { type: 'string', description: 'qué aportó / por qué importó, 1-2 frases' },
          url: { type: 'string', description: 'fuente primaria verificada' },
        },
      },
    },
    related_sugeridos: { type: 'array', items: { type: 'string' }, description: 'slugs de notas existentes del vault a enlazar' },
    notas_fuera_de_taxonomia: { type: 'array', items: { type: 'string' } },
  },
}

const WRITE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'path', 'n_hitos', 'related'],
  properties: {
    slug: { type: 'string' },
    path: { type: 'string' },
    n_hitos: { type: 'integer' },
    related: { type: 'array', items: { type: 'string' } },
    title: { type: 'string' },
    resumen: { type: 'string', description: '1 frase del alcance de la nota' },
  },
}

// 18 ejes temáticos. seeds = pistas para arrancar el research (NO una lista cerrada; el research verifica y EXPANDE).
const EJES = [
  { slug: 'historia-modelos-openai', title: 'Modelos de OpenAI: de ChatGPT a GPT-5.x',
    seeds: 'text-davinci-003, ChatGPT (nov 2022), GPT-4 (mar 2023), GPT-4 Turbo, GPT-4o (may 2024), GPT-4o mini, o1 (sep 2024), o3, GPT-4.5, GPT-5, GPT-5.5' },
  { slug: 'historia-modelos-anthropic', title: 'Modelos de Anthropic: de Claude 1 a Opus 4.x y Fable/Mythos 5',
    seeds: 'Claude 1 (mar 2023), Claude Instant, Claude 2, Claude 3 Opus/Sonnet/Haiku (mar 2024), Claude 3.5 Sonnet, Claude 3.7 Sonnet, Claude 4 Opus/Sonnet, Opus 4.5/4.8, Fable 5 y Mythos 5' },
  { slug: 'historia-modelos-google', title: 'Modelos de Google/DeepMind: Bard, PaLM, Gemini y Gemma',
    seeds: 'PaLM, Bard (mar 2023), PaLM 2, Gemini 1.0 (dic 2023), Gemini 1.5 (1M contexto), Gemma, Gemini 2.0 Flash, Gemini 2.5, Gemini 3' },
  { slug: 'historia-modelos-open-weight', title: 'Modelos open-weight: Llama, Mistral, Qwen, DeepSeek, Gemma',
    seeds: 'LLaMA (feb 2023), Llama 2 (jul 2023), Mistral 7B, Mixtral, Llama 3, Qwen/Qwen2/Qwen3, DeepSeek V2/V3/R1, Llama 4, Gemma 1/2/3/4, GLM, Falcon' },
  { slug: 'historia-modelos-razonamiento', title: 'Modelos de razonamiento y test-time compute',
    seeds: 'chain-of-thought, OpenAI o1 (sep 2024), o3, DeepSeek R1 (ene 2025), RLVR, reasoning effort, Claude thinking, Gemini thinking, razonamiento extendido' },
  { slug: 'historia-multimodal', title: 'IA multimodal: visión, imagen, video y voz',
    seeds: 'DALL-E 2 (2022)/3, Stable Diffusion, Midjourney, GPT-4V (2023), Sora (2024), GPT-4o voice, Whisper, Gemini multimodal, generación de video, vision-language' },
  { slug: 'historia-agentes', title: 'Agentes autónomos y orquestación',
    seeds: 'ReAct (2022), AutoGPT (mar 2023), BabyAGI, LangChain agents, Microsoft AutoGen, CrewAI, LangGraph, OpenAI Swarm/Agents SDK, agent frameworks' },
  { slug: 'historia-coding-assistants', title: 'Asistentes de código e IDEs con IA',
    seeds: 'GitHub Copilot (2021-22), Copilot Chat, Cursor, Codeium/Windsurf, Aider, Sourcegraph Cody, Devin (2024), Cline, Replit Agent, Tabnine' },
  { slug: 'historia-cli-agents-harness', title: 'Agentes de terminal y harnesses agénticos',
    seeds: 'Claude Code (2025), OpenAI Codex CLI, Gemini CLI, Aider, OpenHands/OpenDevin, SWE-agent, concepto de harness agéntico, agent loop' },
  { slug: 'historia-mcp', title: 'Tool use, function calling y Model Context Protocol',
    seeds: 'function calling de OpenAI (jun 2023), tool use, Model Context Protocol (Anthropic, nov 2024), MCP servers, A2A, estandarización de herramientas' },
  { slug: 'historia-rag-memoria', title: 'RAG, embeddings y memoria de agentes',
    seeds: 'embeddings, vector DBs (Pinecone, Chroma, FAISS, Weaviate), RAG (paper 2020, auge 2023), LangChain/LlamaIndex, GraphRAG (2024), long-context vs RAG, memoria de agentes' },
  { slug: 'historia-entrenamiento-alineacion', title: 'Entrenamiento y alineación de LLMs',
    seeds: 'scaling laws (2020/22), InstructGPT/RLHF (2022), Constitutional AI, DPO (2023), RLAIF, LoRA/QLoRA, destilación, datos sintéticos, RLVR' },
  { slug: 'historia-infra-serving', title: 'Infraestructura, serving y cuantización',
    seeds: 'llama.cpp/GGUF, vLLM, cuantización (GPTQ/AWQ/bitsandbytes), Ollama (2023), TGI, proveedores de inferencia (Groq, Together, Fireworks), H100/GPUs, MoE serving' },
  { slug: 'historia-evaluacion-benchmarks', title: 'Evaluación y benchmarks de LLMs',
    seeds: 'MMLU, HumanEval, HELM, Chatbot Arena/LMSYS (2023), MT-Bench, SWE-bench (2023), GPQA, ARC-AGI, MMMU, contaminación de benchmarks, evals' },
  { slug: 'historia-prompt-context-engineering', title: 'Prompt y context engineering',
    seeds: 'few-shot (GPT-3), chain-of-thought (2022), ReAct, prompt engineering, system prompts, context engineering (2024-25), prompt caching, ventanas de contexto largas' },
  { slug: 'historia-chatgpt-asistentes', title: 'ChatGPT, GPTs y asistentes de consumo',
    seeds: 'ChatGPT (nov 2022), plugins (2023), Code Interpreter, GPTs/GPT Store, Claude.ai, instrucciones personalizadas, memoria, Projects, modo voz' },
  { slug: 'historia-apis-plataformas', title: 'APIs y plataformas de desarrollo de IA',
    seeds: 'OpenAI API, function calling, Assistants API (2023), Responses API (2025), Anthropic API, tool use, batch, prompt caching, AWS Bedrock, Google Vertex AI' },
  { slug: 'historia-ecosistema-estandares', title: 'Ecosistema dev y estándares abiertos de IA',
    seeds: 'Hugging Face, LangChain (oct 2022), LlamaIndex, Model Context Protocol, protocolo A2A, OpenRouter, Ollama, ecosistema open-source' },
]

// Notas existentes del vault para que los redactores enlacen 'related' a cosas reales.
const EXISTENTES = [
  'panorama-de-modelos', 'proveedores-de-modelos', 'que-es-un-llm', 'que-es-la-ia', 'que-es-un-agente',
  'que-es-un-harness', 'que-es-mcp', 'que-es-rag', 'tecnicas-clave', 'entornos-de-desarrollo', 'glosario',
  'claude-fable-5', 'claude-mythos-5', 'gemma-4', 'openai-gpt-5-5', 'gemini-3-5-flash', 'mistral-large-3',
  'kimi-k2-7-code', 'microsoft-agent-framework', 'openai-codex-plugins', 'openai-responses-api',
  'claude-code-june-2026-update', 'codex-june-2026-updates',
].join(', ')

phase('Investigar')
log(`Documentando la historia de la IA (${PERIODO}) en ${EJES.length} ejes temáticos.`)

const resultados = await pipeline(
  EJES,
  // Stage 1: research web verificado
  (eje) => agent(
    `Eres un historiador técnico de la IA. Investiga y construye la CRONOLOGÍA VERIFICADA del eje:\n\n` +
    `EJE: "${eje.title}" (slug: ${eje.slug})\n` +
    `PERIODO: ${PERIODO}.\n` +
    `PISTAS para arrancar (NO es lista cerrada; verifica fechas reales y EXPANDE con todo lo relevante que falte): ${eje.seeds}\n\n` +
    `Usa WebSearch y WebFetch para confirmar fechas de lanzamiento y URLs de fuentes primarias (blogs oficiales, papers de arXiv, releases). ` +
    `Apunta a 12-25 hitos densos y bien fechados. Para cada hito: nombre, fecha (YYYY-MM o YYYY-MM-DD), quién, qué cambió/por qué importó, y una URL real. ` +
    `Si una fecha no es verificable al día, dala como YYYY-MM. No inventes enlaces. ` +
    `En related_sugeridos, propón slugs de estas notas existentes del vault que tengan relación: ${EXISTENTES}.`,
    { label: `research:${eje.slug}`, phase: 'Investigar', schema: RESEARCH_SCHEMA }
  ),
  // Stage 2: redacción de la nota foundation
  (research, eje) => {
    if (!research) return null
    const hitosTxt = (research.hitos || []).map(h =>
      `- ${h.fecha} | ${h.nombre} | ${h.quien || ''} | ${h.que_cambio} | ${h.url}`).join('\n')
    return agent(
      `Escribe la nota de línea de tiempo del eje "${eje.title}" en el vault del AI Brain.\n\n` +
      `Antes de escribir: lee pipeline/taxonomy.yaml (tags válidos) y vault/40_Foundations/panorama-de-modelos.md (formato de referencia).\n\n` +
      `${CONTRATO}\n\n` +
      `HITOS YA INVESTIGADOS Y VERIFICADOS (úsalos como base de la tabla cronológica; puedes reordenar y agrupar, NO inventar nuevos sin verificar):\n${hitosTxt}\n\n` +
      `related sugeridos: ${(research.related_sugeridos || []).join(', ') || EXISTENTES}\n\n` +
      `Escribe el archivo con la tool Write en la ruta (relativa al cwd del proyecto): ${FND}/${eje.slug}.md\n` +
      `Si algún tag no existe en taxonomy.yaml, usa el más cercano (no inventes). Devuelve el resultado en el schema.`,
      { label: `write:${eje.slug}`, phase: 'Redactar', schema: WRITE_SCHEMA }
    )
  }
)

const notas = resultados.filter(Boolean)
log(`${notas.length}/${EJES.length} notas-eje escritas. Tejiendo índice maestro.`)

phase('Tejer')
const indice = await agent(
  `Eres el bibliotecario del AI Brain. Se acaban de crear ${notas.length} notas de línea de tiempo histórica en ${FND}/.\n\n` +
  `Notas creadas (slug | título | nº hitos):\n` +
  notas.map(n => `- ${n.slug} | ${n.title || n.slug} | ${n.n_hitos}`).join('\n') + `\n\n` +
  `Haz DOS cosas:\n\n` +
  `1) Crea la nota índice maestra ${FND}/historia-de-la-ia-2022.md con este formato:\n` +
  `   - Frontmatter foundation/evergreen (type: foundation, status: evergreen, updated: 2026-06-14, tags: [foundation, history, moc], related con wikilinks a TODAS las notas-eje de arriba).\n` +
  `   - Cuerpo: introducción breve a "La historia de la IA para desarrolladores (${PERIODO})", luego una TABLA MAESTRA por año (2022-2026) con los 3-5 hitos más importantes de cada año (léelos de las notas-eje reales), y una sección "Líneas de tiempo por tema" con un wikilink + 1 frase a cada una de las ${notas.length} notas-eje.\n\n` +
  `2) Edita ${FND}/_Home-Foundations.md: añade una sección nueva "## Historia y líneas de tiempo" (antes de la línea '---' final) que enlace a [[historia-de-la-ia-2022]] como entrada y liste con wikilinks las notas-eje agrupadas (Modelos / Agentes y harness / Técnicas e infra / Ecosistema). Usa Read antes de Edit.\n\n` +
  `Verifica con Read que las notas-eje existen antes de enlazarlas. Devuelve un resumen en texto: nº de notas enlazadas, hitos totales en la tabla maestra, y rutas escritas.`,
  { label: 'indice-maestro', phase: 'Tejer' }
)

return {
  notas_eje: notas.map(n => ({ slug: n.slug, n_hitos: n.n_hitos, path: n.path })),
  total_notas: notas.length,
  indice,
}
