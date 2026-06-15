---
name: moc-rebuild
description: >
  Reconstruye y actualiza los MOCs del vault (30_MOC/) a partir del estado actual de
  20_Items/. Lee los frontmatter de todos los items, los agrupa por type/vendor/relevance
  y reescribe las secciones de links en MOC-Models-Providers.md, MOC-Agents-Harness.md
  y MOC-Research-Papers.md. También actualiza los stats en MOC-Home.md.
  Úsala después de cada pipeline diario o cuando añadas/borres items manualmente.
---

# moc-rebuild — Actualizar MOCs del vault

Eres el reconstructor de mapas del **AI Brain**. Tu trabajo es mantener los 4 MOCs
en `vault/30_MOC/` sincronizados con el estado real de `vault/20_Items/`.

## Objetivo

Los MOCs son documentos **estáticos con wikilinks manuales**. Se vuelven obsoletos cada
vez que el pipeline añade nuevos items. Esta skill los mantiene al día.

## Archivos que debes actualizar

| Archivo | Qué contiene |
|---|---|
| `vault/30_MOC/MOC-Home.md` | Hub central — actualizar tabla de stats |
| `vault/30_MOC/MOC-Models-Providers.md` | Items de type=model y type=service |
| `vault/30_MOC/MOC-Agents-Harness.md` | Items de type=harness/framework/agent/tool/mcp/plugin/technique |
| `vault/30_MOC/MOC-Research-Papers.md` | Items de type=paper/benchmark |

## Proceso paso a paso

### Paso 1 — Inventariar los items

Lee el frontmatter de TODOS los archivos en `vault/20_Items/*.md`. Para cada uno extrae:
- `title` (para mostrar en la tabla)
- `type` (para clasificar en el MOC correcto)
- `vendor` (para agrupar dentro del MOC)
- `relevance` (core/watch/experimental — para mostrar el emoji)
- El **slug** del archivo (nombre sin `.md`, para el wikilink `[[slug]]`)

Mapeo de relevance a emoji:
- `core` → ⭐ core
- `watch` → 👀 watch
- `experimental` → 🔬 experimental

### Paso 2 — Clasificar por MOC

Asigna cada item al MOC correcto según su `type`:

| type | MOC destino |
|---|---|
| model, service | MOC-Models-Providers |
| harness, framework, agent, tool, mcp, plugin, technique | MOC-Agents-Harness |
| paper, benchmark | MOC-Research-Papers |

Dentro de `MOC-Models-Providers`, agrupa por `vendor`:
- anthropic, openai, google, meta, mistral, xai, deepseek, qwen, microsoft → sección propia
- community, unknown → sección "Community / Otros"

Dentro de `MOC-Agents-Harness`, agrupa por `type` (Harness, Frameworks, Agentes, Tools, MCP, Plugins, Técnicas).

Dentro de `MOC-Research-Papers`, agrupa por dominio temático:
- domain contiene `agents` y type=paper → "Papers — Agentes y Harness"
- domain contiene `rag` y type=paper → "Papers — RAG y Memoria"
- domain contiene `multimodal` y type=paper → "Papers — Multimodal y Visión"
- domain contiene `coding` y type=paper → "Papers — Coding e Ingeniería"
- type=benchmark → "Benchmarks y Evaluación"
(un paper puede aparecer en múltiples secciones si tiene varios dominios)

### Paso 3 — Actualizar cada MOC

Para cada MOC, reemplaza SOLO las secciones de tablas de items (entre los encabezados `##`).
**NO toques**: el frontmatter YAML, el párrafo introductorio, la sección "Relacionado",
ni la sección "Temas emergentes" (solo actualiza si hay patrones nuevos evidentes).

Formato de cada fila en las tablas:
```
| [[slug-del-archivo]] | descripción corta del tipo/tema | emoji relevancia |
```

### Paso 4 — Actualizar stats en MOC-Home.md

Cuenta los items por type y actualiza la tabla `## 📊 Stats del vault` con:
- El count total de `20_Items/`
- El count por type
- La fecha de hoy en el encabezado de la tabla

### Paso 5 — Reportar

Después de actualizar, reporta:
- Cuántos items nuevos encontraste respecto al MOC anterior
- Qué secciones cambiaron
- Si hay items sin clasificar (type no reconocido → añadir a "Sin clasificar" en el MOC correspondiente)

## Reglas

- **No inventes links** — solo usa slugs de archivos que existan en `vault/20_Items/`.
- **No borres secciones** — si una sección queda vacía, ponla con `(sin items aún)`.
- **Mantén el orden** dentro de cada sección: primero por relevance (core → watch → experimental), luego alfabético.
- **No modifiques** `MOC-Frameworks-Techniques.md` — es el MOC legacy con Dataview, no lo toques.
- Lee `pipeline/taxonomy.yaml` si necesitas verificar valores válidos de `type` o `vendor`.

## Cuándo usarla

- Después de cada ejecución del pipeline diario (`/ai-news-pipeline`).
- Después de editar o borrar items manualmente.
- Para verificar que los MOCs están en sync: `bd show ab-MOC` o simplemente `/moc-rebuild`.
