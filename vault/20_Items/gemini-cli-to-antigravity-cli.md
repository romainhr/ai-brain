---
title: "Gemini CLI → Antigravity CLI (migración deadline 18-jun-2026)"
date: 2026-06-15
type: tool
vendor: google
domain: [agents, coding, productivity]
ecosystem: [standalone]
maturity: ga
source_type: official
relevance: core
url: "https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/"
tags: [type/tool, vendor/google, domain/agents, domain/coding, domain/productivity, ecosystem/standalone, maturity/ga, source_type/official, relevance/core]
status: triaged
use_case: >
  Migrar antes del 18-jun-2026: desinstalar Gemini CLI e instalar Antigravity CLI.
  Si tienes scripts que llaman a `gemini -p "<prompt>"`, remap el binario a `antigravity`.
  El plan Google One/OAuth seguirá funcionando en Antigravity hasta que se deprece en
  2026-06-18; a partir de ahí solo el plan de API (Gemini API key) es soportado.
related: ["[[gemini-3-5-flash]]", "[[diffusiongemma]]"]
---

## Qué es
Google migra el Gemini CLI (herramienta de línea de comandos basada en Python que exponía
modelos Gemini con autenticación OAuth/Google One) a **Antigravity CLI**, una plataforma
multi-step reescrita en Go. El cambio implica:
- Nuevo binario: `antigravity` (instalable via `pip install antigravity-cli` o Homebrew).
- La arquitectura interna soporta agentes multi-step nativos, no solo completions simples.
- El plan de suscripción Google One/OAuth que permitía uso gratuito del CLI se depreca el
  18 de junio de 2026 simultáneamente. Después de esa fecha, se requiere Gemini API key.
- Deadline para Pro/Ultra y usuarios free: 18 de junio de 2026.

## Por qué importa (para mis proyectos)
El AI Brain usa Gemini CLI (`gemini -p`) en el motor `engine-runner` para tareas de research
y grounding con búsqueda web nativa. Esta migración rompe ese invocado. Hay que:
1. Instalar Antigravity CLI antes del 18-jun.
2. Actualizar el agente `engine-runner` y `pipeline/model-routing.yaml` con el nuevo invocado.
3. Verificar si la sintaxis de flags cambió (`-p` y `--model` pueden tener equivalentes distintos).
4. Obtener una Gemini API key si el plan OAuth/Google One ya no estará disponible.

Nota: El tier OAuth/Google One que se usaba en el CLI ya estaba marcado como deprecado
(`bd remember` registró este hecho en junio de 2026 — ver memoria `gemini-cli-nunca-usar-o-json-cuelga-el`).

## Cómo se usa / requisitos
```bash
# Desinstalar Gemini CLI
pip uninstall gemini-cli

# Instalar Antigravity CLI
pip install antigravity-cli
# o: brew install antigravity

# Uso básico (verificar flags exactos en docs)
antigravity -p "prompt aquí"
```
Requiere Gemini API key (configurar `GEMINI_API_KEY`). El acceso gratuito via OAuth Google One
termina el 18 de junio.

## Enlaces
- [Anuncio oficial de migración](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)
- [Guía de migración Gemini CLI → Antigravity](https://www.digitalapplied.com/blog/gemini-cli-to-antigravity-cli-migration-june-18-2026-guide)
