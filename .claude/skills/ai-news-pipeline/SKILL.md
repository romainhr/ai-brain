---
name: ai-news-pipeline
description: >
  Barrido diario de novedades de IA para desarrolladores (modelos, herramientas, plugins,
  harness, skills, rules, MCP, frameworks, papers). Investiga las fuentes de las últimas
  ~48h, analiza y etiqueta con taxonomía controlada, y documenta en el vault de Obsidian.
  Úsala cada día en sesión interactiva (manual o vía /loop) para alimentar el "cerebro" de IA.
---

# AI News Pipeline

Eres el motor del **AI Brain**: un cerebro de novedades de IA construido sobre un vault de
Obsidian. Tu trabajo es ejecutar, en una sola corrida, las **3 fases** del pipeline diario.

## Rutas (relativas a la raíz del proyecto `ai-brain/`)
- Config: `pipeline/sources.yaml`, `pipeline/taxonomy.yaml`, `pipeline/schema.md`
- Vault: `vault/00_Inbox/`, `vault/10_Daily/`, `vault/20_Items/`, `vault/30_MOC/`
- Plantillas: `vault/_templates/item.md`, `vault/_templates/daily.md`

## Antes de empezar
1. Determina la **fecha de hoy** (`YYYY-MM-DD`). Úsala en todos los nombres de archivo.
2. Lee `pipeline/taxonomy.yaml` y `pipeline/schema.md` COMPLETOS. Son contratos estrictos:
   nunca inventes valores de faceta fuera de la taxonomía.
3. Lee `pipeline/sources.yaml` para saber qué barrer y la ventana temporal (`window_hours`).

---

## FASE 1 — Research (cobertura amplia)

Objetivo: **recall alto**. Capturar todo lo potencialmente relevante de las últimas ~48h.

1. Recorre las 4 categorías de `sources.yaml` (`official`, `github`, `community`, `paper`).
   Para cada una, usa `WebSearch` con sus `queries` y `WebFetch` sobre sus `feeds`. Acota
   mentalmente a lo publicado dentro de `window_hours`.
2. Si la skill `deep-research` está disponible y quieres mayor profundidad en un tema concreto,
   puedes invocarla — pero no es obligatoria; las búsquedas directas bastan para el barrido.
3. Vuelca TODOS los hallazgos crudos en `vault/00_Inbox/<fecha>-raw.md` como una lista. Por
   hallazgo, una línea con: título, URL, categoría/source_type, y 1 frase de qué es. No filtres
   por calidad todavía; sí descarta duplicados obvios y cosas claramente fuera de tema (IA no
   relevante para devs).

Cierra la fase con un conteo: "Fase 1: N hallazgos crudos en 00_Inbox".

---

## FASE 2 — Análisis + Etiquetado (precisión)

Objetivo: convertir hallazgos crudos en **notas item bien etiquetadas**, sin duplicar.

Para cada hallazgo del inbox:

1. **Dedup.** Busca en `vault/20_Items/` una nota existente del mismo asunto (por título/URL).
   - Si existe y NO hay novedad real → omitir.
   - Si existe y hay novedad (nueva versión, feature, cambio de madurez) → ACTUALIZAR esa nota
     (ajusta `maturity`/`use_case`/cuerpo, conserva `date` original y añade nota del cambio).
   - Si no existe → crear nota nueva.
2. **Clasifica** usando SOLO valores de `taxonomy.yaml`. Rellena el frontmatter completo según
   `pipeline/schema.md`: `type` (1), `vendor` (1), `domain` (≥1), `ecosystem` (≥0), `maturity`,
   `source_type`, `relevance`, `url`, y deriva `tags` como `faceta/valor`.
   - Si algún atributo no encaja en ningún término → usa el más cercano y **registra el término
     faltante** en `pipeline/taxonomy.yaml` bajo `candidates` (no inventes tags libres).
3. **`use_case`**: 1-3 frases accionables — cuándo/para qué usarlo pensando en mejorar proyectos.
4. **`related`**: enlaza 2-5 notas afines existentes como `["[[nombre-nota]]"]`. Estas aristas
   son lo que hace consultable el cerebro (grafo nativo + graphify). Prefiere relaciones fuertes.
5. **Guarda** en `vault/20_Items/<kebab-title>.md` (nombre sin fecha; parte de `vault/_templates/item.md`).
   Marca `status: triaged`.

Cierra la fase con: "Fase 2: X notas nuevas, Y actualizadas".

---

## FASE 3 — Documentación

Objetivo: dejar el día indexado y navegable.

1. Crea `vault/10_Daily/<fecha>.md` partiendo de `vault/_templates/daily.md`. Agrupa los items
   nuevos/actualizados del día por `type`, cada uno como `[[wikilink]]` + 1 línea de resumen.
   Rellena `items_new` e `items_updated` en el frontmatter.
2. Si aparecieron términos nuevos, lístalos en la sección "Candidatos a taxonomía" de la nota
   diaria (además de haberlos añadido a `taxonomy.yaml > candidates`).
3. Los MOC de `vault/30_MOC/` usan Dataview y se actualizan solos; NO los edites salvo que haya
   una categoría nueva que merezca su propio MOC.
4. **No** ejecutes graphify aquí — la reconstrucción del grafo es un paso aparte
   (`scripts/rebuild-graph.ps1`).

## Resumen final
Imprime: fecha, nº hallazgos crudos, notas nuevas/actualizadas, candidatos a taxonomía, y la
ruta de la nota diaria. Recuerda al usuario que puede correr `scripts/rebuild-graph.ps1` para
refrescar el grafo consultable.

## Principios
- **Etiquetado fuerte y consistente** por encima de prosa. La taxonomía es ley.
- **No duplicar.** Actualizar > recrear.
- **Accionable.** Cada nota responde "¿cuándo me sirve esto para un proyecto?".
- Verifica URLs reales; no inventes enlaces ni features.
