# Routing de modelos

El pipeline puede repartir research y triage entre Claude, Codex, Gemini y OpenRouter. La fuente
de verdad es `pipeline/model-routing.yaml`; los workflows solo implementan el despacho.

## Flujo

1. El router lee motores, fortalezas y reglas de `model-routing.yaml`.
2. Asigna un motor por scout o hallazgo.
3. Los motores nativos se ejecutan directamente.
4. Los motores externos pasan por el agente `engine-runner`.
5. Un fallo o timeout usa el fallback configurado.

## Motores

| Clave | Tipo | Uso habitual |
|---|---|---|
| `claude-opus` | nativo | clasificación ambigua y verificación crítica |
| `claude-sonnet` | nativo | trabajo general y fallback |
| `codex` | CLI | código, repositorios y ecosistema OpenAI |
| `gemini` | CLI | grounding amplio, Google/DeepMind y papers |
| `openrouter` | API | lotes auto-contenidos con modelos gratuitos |

Los nombres de modelos concretos pueden cambiar. Consúltalos siempre en
`pipeline/model-routing.yaml` en lugar de copiarlos a otros archivos.

## Gemini

La configuración actual usa `gemini --approval-mode yolo`. No uses `-o json`: en el entorno
actual puede bloquear el CLI. Captura `stderr` por separado y trata `stdout` como la respuesta del
modelo.

El acceso OAuth/Google One utilizado por este repo tiene una transición anunciada para el
18 de junio de 2026. Antes de depender de Gemini después de esa fecha, revisa la tarea `ab-96t` y
actualiza el adaptador o desactiva el motor.

## OpenRouter

El motor solo está disponible cuando existe `OPENROUTER_API_KEY`. Los modelos `:free` tienen
disponibilidad y rate limits variables, por lo que siempre deben conservar un fallback.

## Cambios seguros

- Cambiar modelo, comando o fortalezas: edita `pipeline/model-routing.yaml`.
- Cambiar lógica de ejecución: edita el puente y el workflow.
- Añadir un motor: actualiza config, dispatcher, validación y documentación.
- Desactivar temporalmente un motor: evita que el router lo asigne o fuerza otro motor.

Después de cambiar routing, prueba al menos un scout y un triage con fallback disponible.
