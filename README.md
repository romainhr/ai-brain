# AI Brain

Base de conocimiento viva sobre IA para desarrollo de software. El proyecto captura novedades,
las normaliza con una taxonomía controlada, las publica en un vault de Obsidian y genera un grafo
consultable por agentes mediante graphify.

## Flujo principal

```text
Fuentes -> research -> triage y taxonomía -> vault de Obsidian -> grafo consultable
```

La captura diaria se ejecuta en una sesión interactiva. El contenido estable vive en `vault/`;
la configuración y los contratos del pipeline viven en `pipeline/`; los artefactos de graphify
son regenerables y no se versionan.

## Inicio rápido

1. Abre `vault/` como vault de Obsidian.
2. Ejecuta la skill `ai-news-pipeline` desde un cliente compatible para generar la captura diaria.
3. Revisa la nota de `vault/10_Daily/` y los items creados en `vault/20_Items/`.
4. Reconstruye el grafo cuando quieras actualizar la capa consultable:

```powershell
$env:OPENROUTER_API_KEY = '...'
./scripts/rebuild-graph.ps1
```

La variable solo necesita existir en la sesión que construye el grafo. No se guarda ninguna clave
en el repositorio.

## Estructura

| Ruta | Responsabilidad |
|---|---|
| `vault/` | Base de conocimiento legible en Obsidian |
| `pipeline/` | Fuentes de verdad para esquema, taxonomía, fuentes y routing |
| `scripts/` | Automatización local y comprobaciones del repositorio |
| `docs/` | Arquitectura, operación e integraciones |
| `.claude/` | Agentes, skills y workflows del adaptador de Claude Code |
| `.mcp.json` | Configuración del MCP de graphify para el proyecto |
| `.beads/` | Metadatos del issue tracker `bd`; no es contenido del cerebro |

Consulta los mapas específicos de [vault](vault/README.md), [pipeline](pipeline/README.md) y
[scripts](scripts/README.md).

## Fuentes de verdad

| Tema | Archivo canónico |
|---|---|
| Facetas y valores permitidos | `pipeline/taxonomy.yaml` |
| Frontmatter y forma de las notas | `pipeline/schema.md` |
| Fuentes y ventana de captura | `pipeline/sources.yaml` |
| Motores y reglas de routing | `pipeline/model-routing.yaml` |
| Contenido curado | `vault/20_Items/` |
| Salida diaria | `vault/10_Daily/` |

Evita duplicar estas reglas en prompts o documentación. Los adaptadores deben leer los archivos
canónicos en tiempo de ejecución.

## Operaciones comunes

```powershell
# Comprobar estructura y enlaces internos
./scripts/check-repo.ps1

# Reconstruir el knowledge graph
./scripts/rebuild-graph.ps1

# Consultar trabajo disponible
bd ready
```

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md)
- [Operación diaria](docs/OPERATIONS.md)
- [Graphify y MCP](docs/GRAPHIFY.md)
- [Routing de modelos](docs/MODEL-ROUTING.md)
- [Fuentes y scouts](docs/SOURCES.md)
- [Cómo contribuir](CONTRIBUTING.md)

## Principios

- La taxonomía es un contrato, no una sugerencia.
- Actualizar una nota existente es preferible a crear un duplicado.
- El vault es la fuente humana; el grafo es una proyección regenerable.
- Los secretos y el estado local nunca se versionan.
- Los cambios de trabajo se registran con `bd`.
