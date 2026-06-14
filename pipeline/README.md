# Pipeline

Esta carpeta contiene los contratos compartidos por todos los adaptadores del AI Brain.

| Archivo | Responsabilidad |
|---|---|
| `sources.yaml` | Fuentes, scouts y ventana temporal |
| `taxonomy.yaml` | Vocabulario controlado |
| `schema.md` | Frontmatter y estructura de notas |
| `model-routing.yaml` | Motores, comandos y reglas de routing |

## Regla de cambio

Modifica primero el archivo canónico y después adapta prompts, workflows o documentación. No copies
listas de facetas, fuentes o modelos a otra capa salvo que sea imprescindible para validación.

Después de cambiar el contrato:

1. comprueba que las plantillas sigan siendo válidas;
2. ejecuta un caso representativo;
3. revisa el item y la nota diaria generados;
4. ejecuta `../scripts/check-repo.ps1`.

Consulta [Arquitectura](../docs/ARCHITECTURE.md) y
[Routing de modelos](../docs/MODEL-ROUTING.md).
