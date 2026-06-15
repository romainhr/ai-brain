---
title: "GitHub Copilot SDK GA — runtime agéntico de Copilot embebible en 6 lenguajes"
date: 2026-06-15
type: harness
vendor: microsoft
domain: [coding, agents]
ecosystem: [copilot, vscode, standalone]
maturity: ga
source_type: official
relevance: experimental
url: "https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/"
tags: [type/harness, vendor/microsoft, domain/coding, domain/agents, ecosystem/copilot, ecosystem/vscode, ecosystem/standalone, maturity/ga, source_type/official, relevance/experimental]
status: triaged
use_case: >
  Usar el Copilot SDK para embeber el motor de planificación y tool-calling de GitHub Copilot
  en apps propias (Node.js, Python, Go, .NET, Rust, Java): el mismo runtime que usa Copilot
  internamente, disponible como biblioteca. Útil para construir asistentes de coding
  customizados con acceso al contexto de repositorio de GitHub y a las herramientas de
  edición de archivos de Copilot, sin construir el motor desde cero.
related: ["[[github-agentic-workflows]]", "[[copilot-code-review-new-configurations-and-controls]]", "[[microsoft-agent-framework]]", "[[claude-code-june-2026-update]]"]
---

## Qué es
El **GitHub Copilot SDK** llegó a disponibilidad general el 2 de junio de 2026 en seis
lenguajes: Node.js, Python, Go, .NET, Rust y Java. Expone el mismo runtime de planificación,
llamadas a herramientas, edición de archivos y sesiones multi-turno que usa GitHub Copilot
internamente, como biblioteca integrable en aplicaciones propias.

Capacidades del SDK:
- **Planificación**: decomposición de tareas de código en pasos accionables.
- **Tool calling**: invocación de herramientas de edición de archivos, búsqueda en repo, etc.
- **Sesiones multi-turno**: contexto persistente entre múltiples mensajes.
- **Acceso al contexto de repositorio**: embeddings y búsqueda semántica sobre el código.

## Por qué importa (para mis proyectos)
Posiciona a GitHub como plataforma agéntica, no solo como hosting de código. Para equipos
ya en el ecosistema GitHub, el SDK permite construir pipelines de coding agéntico con
acceso nativo al contexto del repo sin reinventar la rueda. La disponibilidad en Rust y Go
(además de Python/Node) es señal de madurez. Competidor directo del Agent SDK de Anthropic
en el nicho de agentes de coding sobre bases de código existentes.

## Cómo se usa / requisitos
```python
from github_copilot_sdk import CopilotAgent

agent = CopilotAgent(repo="owner/repo", token=GH_TOKEN)
result = await agent.run("Refactoriza el módulo de autenticación para usar OAuth2")
```
Requiere: cuenta GitHub con plan Copilot Business o Enterprise. Licencia: términos de uso
de GitHub Copilot.

## Enlaces
- [Changelog GitHub GA](https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/)
