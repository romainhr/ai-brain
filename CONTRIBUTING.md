# Contribuir a AI Brain

## Antes de cambiar algo

1. Ejecuta `bd prime` para cargar el flujo de trabajo del proyecto.
2. Busca una tarea existente con `bd ready` o `bd search`.
3. Crea una tarea con `bd create` si el trabajo no está registrado.
4. Reclámala con `bd update <id> --claim`.

No uses archivos Markdown como lista de tareas. El estado de trabajo vive en `bd`.

## Dónde hacer cada cambio

- Contenido curado: `vault/20_Items/`.
- Índices diarios: `vault/10_Daily/`.
- Taxonomía, esquema, fuentes y routing: `pipeline/`.
- Automatización local: `scripts/`.
- Explicaciones y guías: `docs/`.
- Adaptadores de agentes: su carpeta específica, manteniendo `pipeline/` como fuente de verdad.

No edites `vault/graphify-out/`: se regenera. Evita incluir ajustes locales de Obsidian o
directorios de trabajo temporales en commits.

## Convenciones

- Notas de items: nombre `kebab-case`, sin fecha.
- Notas diarias: `YYYY-MM-DD.md`.
- Frontmatter: debe cumplir `pipeline/schema.md`.
- Facetas: solo valores presentes en `pipeline/taxonomy.yaml`.
- Enlaces internos del vault: wikilinks de Obsidian.
- Documentación del repo: enlaces Markdown relativos.
- Scripts: PowerShell 5.1 compatible salvo que se documente otra versión.

## Validación

Ejecuta antes de cerrar una tarea:

```powershell
./scripts/check-repo.ps1
```

Si cambias el pipeline o el contrato de notas, valida además una ejecución representativa y revisa
la nota diaria resultante. Si cambias graphify, prueba `rebuild-graph.ps1` con las credenciales
disponibles.

## Cierre de sesión

1. Registra trabajo pendiente en `bd`.
2. Cierra o actualiza la tarea activa.
3. Confirma únicamente los archivos que pertenecen al cambio.
4. Sincroniza issues con `bd dolt push`.
5. Ejecuta `git pull --rebase`, `git push` y comprueba que la rama está al día.
