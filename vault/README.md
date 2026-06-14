# Vault

Abre esta carpeta directamente como vault de Obsidian. El contenido sigue un flujo de maduración:

```text
00_Inbox -> 20_Items -> 10_Daily / 30_MOC -> graphify
                         40_Foundations
```

| Ruta | Contenido |
|---|---|
| `00_Inbox/` | Evidencia cruda de cada captura |
| `10_Daily/` | Resumen e índice por día |
| `20_Items/` | Una nota canónica por novedad |
| `30_MOC/` | Índices temáticos |
| `40_Foundations/` | Conocimiento conceptual estable |
| `_templates/` | Plantillas de items y notas diarias |
| `_taxonomy.md` | Vista navegable de la taxonomía |
| `graphify-out/` | Salida regenerable, no versionada |

## Contratos

- El esquema de frontmatter vive en `../pipeline/schema.md`.
- Los valores permitidos viven en `../pipeline/taxonomy.yaml`.
- Los nombres de items usan `kebab-case` sin fecha.
- `related` usa wikilinks a notas existentes.
- Las notas duplicadas se consolidan en una canónica.

Los archivos de workspace, caché y papelera de Obsidian son estado local. Los ajustes compartidos
que ya estén versionados deben tratarse como configuración de producto.
