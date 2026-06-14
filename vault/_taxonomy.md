---
type: reference
tags: [reference, taxonomy]
---

# Taxonomía de etiquetas (espejo legible)

Fuente de verdad: `pipeline/taxonomy.yaml`. Esta nota es la versión navegable dentro del vault.
Todo etiquetado de notas usa **solo** estos valores. Si algo no encaja, se registra como
candidato en `taxonomy.yaml`, no se inventa un tag.

| Faceta | Cardinalidad | Valores |
|---|---|---|
| **type** | 1 | model, tool, plugin, harness, skill, rule, mcp, framework, agent, dataset, benchmark, paper, service, technique |
| **vendor** | 1 | anthropic, openai, google, meta, mistral, xai, deepseek, qwen, microsoft, amazon, nvidia, huggingface, cohere, community, unknown |
| **domain** | ≥1 | coding, agents, rag, multimodal, voice, vision, infra, eval, data, security, productivity |
| **ecosystem** | ≥0 | claude-code, cursor, vscode, jetbrains, windsurf, copilot, langchain, llamaindex, obsidian, n8n, zapier, ollama, huggingface, standalone |
| **maturity** | 1 | announced, preview, ga, deprecated |
| **source_type** | 1 | official, github, community, paper |
| **relevance** | 1 | core, experimental, watch |

Los `tags` de cada nota se derivan como `faceta/valor` (p. ej. `type/harness`, `domain/agents`,
`ecosystem/claude-code`).
