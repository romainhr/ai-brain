---
title: "Copilot code review: nuevas configuraciones y controles"
date: 2026-06-13
type: tool
vendor: microsoft
domain: [coding, security]
ecosystem: [copilot, vscode]
maturity: ga
source_type: official
relevance: watch
url: https://github.blog/changelog/2026-06-12-copilot-code-review-new-configurations-and-controls/
tags: [type/tool, vendor/microsoft, domain/coding, domain/security, ecosystem/copilot, ecosystem/vscode]
status: triaged
use_case: >
  Útil cuando gestionas revisiones de código automatizadas a escala de organización: configura y bloquea el
  runner por defecto de Copilot code review en todos los repos, excluye archivos/directorios sensibles de la
  revisión, y aprovecha instrucciones personalizadas sin límite de caracteres para guiar al revisor con tus
  convenciones de proyecto agéntico.
related: ["[[openai-codex-plugins]]", "[[microsoft-agent-framework]]", "[[claude-code-june-2026-update]]"]
---

## Qué es
Actualización de Copilot code review (la revisión automática de pull requests de GitHub Copilot) que añade tres
controles. Primero, **controles de runner a nivel de organización**: los administradores pueden definir el runner
por defecto para todos los repositorios y bloquear esa configuración. Segundo, **exclusión de contenido**
(content exclusion) a nivel de repositorio, organización y empresa, para que Copilot no use archivos o directorios
especificados durante la revisión. Tercero, la **eliminación del límite de 4000 caracteres** en los archivos de
instrucciones personalizadas (`copilot-instructions.md` y `*.instructions.md`).

## Por qué importa (para mis proyectos)
La calidad de una revisión automática depende del contexto que recibe el revisor. Quitar el tope de caracteres en
las instrucciones permite codificar convenciones extensas (patrones de prompts, reglas de seguridad, estilo de
herramientas/MCP) que el revisor aplicará de forma consistente. La exclusión de contenido reduce el riesgo de
exponer secretos o datos sensibles a la revisión, relevante en repos con claves de API o pipelines de agentes. Y
los controles a nivel de organización facilitan estandarizar la gobernanza de revisión en varios repos.

## Cómo se usa / requisitos
Se configura desde Copilot en GitHub. Un admin de organización define (y opcionalmente bloquea) el runner por
defecto. La exclusión de contenido se hereda de la configuración existente en repo/organización/empresa. Las
instrucciones se editan en `copilot-instructions.md` o `*.instructions.md`, ahora sin el límite de 4000
caracteres. Limitaciones: requiere GitHub Copilot con code review habilitado y permisos de administración para los
controles globales; es una característica del ecosistema Copilot/GitHub, no aplicable fuera de él.

## Enlaces
- [Changelog de GitHub](https://github.blog/changelog/2026-06-12-copilot-code-review-new-configurations-and-controls/)
