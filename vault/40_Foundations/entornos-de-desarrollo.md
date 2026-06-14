---
title: "Entornos de desarrollo con IA (IDEs, CLIs, cowork)"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/harness, domain/coding, ecosystem/claude-code, ecosystem/cursor, ecosystem/vscode]
related: ["[[que-es-un-harness]]", "[[que-es-un-agente]]", "[[que-es-mcp]]", "[[panorama-de-modelos]]", "[[claude-code-june-2026-update]]"]
---

# Entornos de desarrollo con IA (junio 2026)

> Dónde *vive* el trabajo: el harness con el que codeas a diario. Cuatro familias. Caduca rápido;
> revisar con el barrido. Ver el concepto en [[que-es-un-harness]].

## 1) IDEs dedicados (editor + agente integrados)
| Herramienta | Rasgo | Nota 2026 |
|---|---|---|
| **Cursor** | Mejor **UX**; editor tipo VSCode con agente | El más pulido para edición asistida |
| **Windsurf → Devin Desktop** | Renombrado (2 jun 2026) | Soporta **Agent Client Protocol (ACP)**: corre Codex, Claude Agent, etc. dentro |
| **Google Antigravity** | Apuesta **multi-agente** | v2.0 (19 may): CLI en Go, SDK público, subagentes dinámicos, tareas en background, **Gemini 3.5 Flash** por defecto |
| **Zed** | Editor rápido en Rust con cliente MCP nativo | Ligero, colaborativo |
| **Kiro** | IDE/CLI orientado a skills | Emergente |

## 2) Extensiones de IDE (sobre VSCode/JetBrains)
- **GitHub Copilot** — el más extendido; en jun 2026 pasó a **facturación por uso** (AI Credits).
- **Cline**, **Continue** — open-source, configurables, multi-modelo.

## 3) CLIs (agente en la terminal)
| CLI | Rasgo | Coste |
|---|---|---|
| **Claude Code** (Anthropic) | **Mejor capacidad**: ~1M contexto, top en SWE-bench; **5.5× menos tokens que Cursor** | Plan / API |
| **Codex CLI** (OpenAI) | Apuesta por **cloud sandboxing** | Plan / API |
| **Gemini CLI** (Google) | **1.000 requests/día gratis** (casi ilimitado para muchos) | Free generoso |
| **Aider** | Open-source, agnóstico de modelo, git-first | Free (pagas el modelo) |
| **Goose**, **OpenCode** | Open-source, multi-harness | Free |

## 4) Plataformas cloud / "cowork" (agentes autónomos remotos)
Agentes que trabajan **solos durante horas** sobre una tarea/PR, como un compañero remoto:
- **Devin** — el "ingeniero IA" autónomo de referencia.
- **OpenHands** (open), **Jules** (Google), **Genie**, **Manus**.
- Coste: desde free open-source hasta **~$500/mes** en las plataformas cloud.
- Nota de coste oculto: la **eficiencia de tokens** importa más que el precio de la suscripción.

## Protocolos que los unifican
- **MCP** ([[que-es-mcp]]): conecta tools/datos a cualquiera de estos.
- **ACP (Agent Client Protocol):** permite que un IDE (Devin Desktop) hospede agentes de distintos
  vendors.

## Cómo elegir
- **Control y coste por token:** Claude Code (CLI) — mi entorno principal.
- **UX visual:** Cursor.
- **Gratis/alto volumen:** Gemini CLI, Aider.
- **Delegar tareas largas:** plataforma cloud (Devin/OpenHands).
- **Multi-agente paralelo:** Antigravity / Windsurf-Devin.

## Por qué importa (para mis proyectos)
El AI Brain se opera desde **Claude Code** (coste por token bajo, MCP nativo, sesión interactiva
para ahorrar Agent SDK credit). Esta nota sitúa las alternativas por si conviene delegar tareas
largas a un agente cloud o usar Gemini CLI free para barridos auxiliares.

## Enlaces
- [Best AI IDEs 2026 (DEV)](https://dev.to/chandrakantabehera/best-ai-ides-in-2026-cursor-vs-windsurf-vs-copilot-vs-zed-vs-claude-code-vs-codex-1gk7)
- [Every AI Coding CLI in 2026 (DEV)](https://dev.to/soulentheo/every-ai-coding-cli-in-2026-the-complete-map-30-tools-compared-4gob)
- [Coding agents comparison (Artificial Analysis)](https://artificialanalysis.ai/agents/coding)
