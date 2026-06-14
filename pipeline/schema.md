# Contrato de frontmatter de las notas

Toda nota de novedad (`vault/20_Items/`) DEBE empezar con este frontmatter YAML. Los valores
de las facetas provienen **exclusivamente** de `pipeline/taxonomy.yaml`.

## Nota de item (`20_Items/`)

```yaml
---
title: "Nombre de la novedad"     # obligatorio, texto libre
date: 2026-06-12                  # obligatorio, fecha de captura (YYYY-MM-DD)
type: tool                        # obligatorio, 1 valor de taxonomy.type
vendor: anthropic                 # obligatorio, 1 valor de taxonomy.vendor
domain: [coding, agents]          # obligatorio, >=1 valor de taxonomy.domain
ecosystem: [claude-code]          # opcional, >=0 valores de taxonomy.ecosystem
maturity: ga                      # obligatorio, 1 valor de taxonomy.maturity
source_type: official             # obligatorio, 1 valor de taxonomy.source_type
relevance: core                   # obligatorio, 1 valor de taxonomy.relevance
url: https://...                  # obligatorio, enlace primario
tags: [type/tool, domain/coding, domain/agents, ecosystem/claude-code, vendor/anthropic]
status: triaged                   # raw | triaged | reviewed
use_case: >                       # obligatorio, 1-3 frases: cuándo/para qué usarlo
  Texto accionable.
related: ["[[otra-nota]]"]         # opcional, wikilinks a items afines (aristas del grafo)
---
```

### Reglas
- **`tags`** se DERIVA de las facetas: por cada faceta con valor se añade `faceta/valor`
  (p. ej. `type/tool`, `vendor/anthropic`, cada `domain/*`, cada `ecosystem/*`). Esto habilita
  navegación y consultas Dataview/graphify.
- **Nombre de archivo:** `kebab-case` del `title`, sin fecha (p. ej. `claude-code-skills.md`).
  Si ya existe, se ACTUALIZA esa nota en vez de crear un duplicado.
- **Validación:** todo valor de faceta debe existir en `taxonomy.yaml`. Si no existe, usar el
  término más cercano y registrar el término faltante en `taxonomy.yaml > candidates`.
- **`related`** debe apuntar a notas reales del vault (crea las aristas que graphify y el grafo
  nativo de Obsidian explotan). Preferir 2-5 relaciones de calidad sobre muchas débiles.

## Cuerpo de la nota de item

```markdown
## Qué es
Descripción breve y neutra.

## Por qué importa (para mis proyectos)
Análisis accionable: a qué problema responde, qué desplaza, cuándo elegirlo.

## Cómo se usa / requisitos
Instalación, dependencias, API keys, limitaciones.

## Enlaces
- [Fuente primaria](url)
- [Repo / docs](url)
```

## Nota diaria (`10_Daily/YYYY-MM-DD.md`)

```yaml
---
date: 2026-06-12
type: daily
items_new: 0          # nº de notas item nuevas creadas
items_updated: 0      # nº de notas item actualizadas
tags: [daily]
---
```
Cuerpo: items del día agrupados por `type`, cada uno como `[[wikilink]]` con una línea de
resumen. Cierra con "Candidatos a taxonomía" si los hubo.
