# AI Brain 🧠

Cerebro diario de novedades de IA para desarrolladores. Cada día rastrea modelos nuevos,
herramientas, plugins, harness, funcionalidades, skills, rules, MCP servers y papers; los
documenta en un **vault de Obsidian** con etiquetado fuerte; y los expone como un
**knowledge graph consultable** vía [graphify](https://github.com/safishamsi/graphify).

**Objetivo práctico:** cuando vayas a mejorar un proyecto, preguntarle al cerebro
*"¿cuál es la mejor opción para X hoy?"* y obtener una respuesta fundamentada en todo lo capturado.

## Arquitectura

```
Fuentes web ─► [Fase 1: Research] ─► [Fase 2: Análisis + Etiquetado] ─► [Fase 3: Documentación]
                                                                              │
                                                  scripts/rebuild-graph.ps1 ──┤
                                                                              ▼
                                          Obsidian (legible)  +  graphify MCP (consultable por IA)
```

El barrido se corre **local en sesión interactiva** (`/ai-news-pipeline`, manual o vía `/loop`),
para no consumir crédito de Agent SDK. Luego graphify reconstruye el grafo a partir del vault.

## Estructura

| Carpeta | Contenido |
|---|---|
| `vault/00_Inbox/` | Capturas crudas del día (cobertura amplia) |
| `vault/10_Daily/` | Nota índice diaria `YYYY-MM-DD.md` |
| `vault/20_Items/` | Una nota por novedad — el grueso del cerebro |
| `vault/30_MOC/` | Maps of Content (índices vivos por categoría) |
| `vault/_templates/` | Plantillas de nota |
| `pipeline/` | `taxonomy.yaml`, `sources.yaml`, `schema.md` (config del pipeline) |
| `scripts/` | `rebuild-graph.ps1` + `MCP-SETUP.md` (integración graphify) |
| `vault/graphify-out/` | Outputs de graphify (`graph.json`/`.html`, `GRAPH_REPORT.md`) — regenerable, gitignored |
| `.mcp.json` | Registra el server MCP `graphify` para consultar el cerebro |
| `.claude/skills/ai-news-pipeline/` | La skill del pipeline de 3 fases |

## Uso — operación local (sin Agent SDK)

El barrido corre en **sesión interactiva** de Claude Code, no headless. Así se cobra contra los
límites normales del plan y **no consume el crédito de Agent SDK** (a diferencia de `/schedule`
en la nube o de `claude -p` en una Tarea Programada, que sí lo consumen).

### Barrido diario (manual, recomendado)
En una sesión de Claude Code dentro de este directorio, una vez al día:
```
/ai-news-pipeline
```
y al terminar, reconstruye el grafo:
```powershell
./scripts/rebuild-graph.ps1
```

### Semi-automático con /loop (opcional)
Si dejas una sesión de Claude Code abierta, puedes dispararlo en intervalo:
```
/loop 24h /ai-news-pipeline
```
Requiere la terminal abierta; sigue usando límites interactivos (no Agent SDK).

### Consultar el cerebro
Tras reconstruir el grafo, pregunta en lenguaje natural en una sesión dentro de `ai-brain/`;
el modelo usará el MCP server de graphify (`query_graph`) sobre tus notas. Ver
[`scripts/MCP-SETUP.md`](scripts/MCP-SETUP.md).

## Prerequisito: graphify + backend (ya configurado)

```bash
uv tool install "graphifyy[openai]"   # el extra [openai] habilita backends OpenAI-compatibles
```

**Backend de construcción:** OpenRouter con **Gemma 4 31B (free)**, registrado como custom
provider en `~/.graphify/providers.json` (clave `openrouter`). Coste de construcción: $0.
Requiere `OPENROUTER_API_KEY`. Está **persistida como variable de entorno de usuario** en
Windows (`[Environment]::SetEnvironmentVariable('OPENROUTER_API_KEY', ..., 'User')`), así que
las sesiones nuevas ya la heredan sin definirla a mano; consíguela en
[openrouter.ai/keys](https://openrouter.ai/keys). Posible 429 rate-limit en el etiquetado
de comunidades con el modelo free — el grafo base se genera igual. Ver
[github.com/safishamsi/graphify](https://github.com/safishamsi/graphify).

## Etiquetado

Todo el etiquetado usa el **vocabulario controlado** de `pipeline/taxonomy.yaml`
(facetas: `type`, `vendor`, `domain`, `ecosystem`, `maturity`, `source_type`, `relevance`).
El pipeline no inventa tags: si algo no encaja, lo registra como candidato a nuevo término.
