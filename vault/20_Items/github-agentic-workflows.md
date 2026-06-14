---
title: "GitHub Agentic Workflows (public preview)"
date: 2026-06-13
type: framework
vendor: microsoft
domain: [coding, agents, infra]
ecosystem: [copilot, claude-code, standalone]
maturity: preview
source_type: official
relevance: core
url: https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/
tags: [type/framework, vendor/microsoft, domain/coding, domain/agents, domain/infra, ecosystem/copilot, ecosystem/claude-code, ecosystem/standalone]
status: triaged
use_case: >
  Úsalo para automatizar tareas de razonamiento en tus repos (triage de issues, análisis de fallos de CI,
  actualización de docs) escribiendo el flujo en Markdown en lenguaje natural en vez de YAML. Ideal cuando quieres
  incorporar agentes de IA a tu pipeline de GitHub Actions reutilizando runners y políticas existentes, eligiendo
  entre Copilot, Claude, Codex o Gemini según el coste o la capacidad que necesites.
related: ["[[openai-codex-plugins]]", "[[microsoft-agent-framework]]", "[[claude-code-june-2026-update]]", "[[gemini-3-5-flash]]"]
---

## Qué es
GitHub Agentic Workflows es una capacidad de GitHub (Microsoft) en public preview que permite definir
automatizaciones impulsadas por IA dentro de los repositorios mediante archivos Markdown escritos en lenguaje
natural. Esos archivos se compilan a YAML estándar de GitHub Actions, de forma que se ejecutan como cualquier
otro workflow, aprovechando los runner groups y las políticas existentes. Soporta múltiples motores: Copilot,
Claude, Codex y Gemini. Incluye salvaguardas de seguridad: permisos de solo lectura por defecto, ejecución en
contenedores aislados, filtros de integridad para el acceso a contenido de GitHub, validación de salidas
("safe outputs") y detección de amenazas que escanea los cambios antes de aplicarlos. El repo de respaldo es
github/gh-aw.

## Por qué importa (para mis proyectos)
Baja la barrera para meter agentes de IA directamente en el ciclo de vida del repo sin orquestar YAML complejo a
mano: describes la intención en Markdown y obtienes un workflow ejecutable y auditable. Para IA agéntica significa
estandarizar tareas repetitivas de razonamiento (triage, análisis de CI, mantenimiento de docs) sobre
infraestructura que ya controlas, con un modelo de seguridad pensado para agentes (sandbox, permisos mínimos,
validación de salidas). Al ser agnóstico de motor, te deja elegir y comparar Claude, Copilot, Codex o Gemini sin
cambiar la arquitectura.

## Cómo se usa / requisitos
Se crean archivos Markdown en lenguaje natural dentro del repositorio que describen la automatización deseada;
GitHub los compila a YAML estándar de Actions y se ejecutan como workflows normales, reutilizando runner groups y
restricciones de política. Puedes seleccionar el motor (Copilot, Claude, Codex o Gemini). Por defecto los permisos
son de solo lectura y la ejecución ocurre en contenedores aislados. Limitaciones: está en public preview (tratar
como sujeto a cambios y validar costes/permisos antes de usarlo en flujos críticos); depende del ecosistema de
GitHub Actions y de la disponibilidad de los motores soportados.

## Enlaces
- [Changelog de GitHub](https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/)
- [Repo github/gh-aw](https://github.com/github/gh-aw)
