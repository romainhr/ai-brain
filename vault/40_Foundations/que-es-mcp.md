---
title: "Qué es MCP (Model Context Protocol)"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/mcp, domain/agents, ecosystem/claude-code]
related: ["[[que-es-un-harness]]", "[[que-es-un-agente]]", "[[entornos-de-desarrollo]]", "[[openai-codex-plugins]]"]
---

# Qué es MCP (Model Context Protocol)

## Definición
**MCP** es un **estándar abierto** para conectar modelos/agentes con **herramientas y fuentes de
datos externas** mediante una interfaz común. Es el "USB-C de la IA": en vez de integrar cada tool
a mano para cada agente, expones un **MCP server** y cualquier **MCP client** (Claude Code, Cursor,
ChatGPT…) puede usarlo.

## Arquitectura
- **MCP server:** expone *tools* (acciones), *resources* (datos) y *prompts* a través del protocolo.
  Ej.: el server `graphify` de este proyecto expone `query`/`path`/`explain` sobre el grafo.
- **MCP client:** vive dentro del harness/IDE y descubre y llama esas capacidades.
- **Transportes:** **stdio** (local, un proceso) o **HTTP/SSE** (en red, con API key).

## Estado en 2026 (por qué se volvió el estándar)
- **~17.500 MCP servers** indexados (Q1 2026); >10.000 públicos ya en dic 2025.
- **~97M descargas/mes** de los SDKs (marzo 2026).
- **Donado a la Linux Foundation** (dic 2025); versión del protocolo ~v1.27.
- Soporte de **OpenAI, Google, Microsoft, Salesforce** en ~13 meses; IDEs (Cursor, Zed, Windsurf)
  con cliente MCP nativo. **41%** de organizaciones con MCP en producción (limitada o amplia).

## Cómo se usa (Claude Code)
```bash
claude mcp add <nombre> -- <comando-del-server>
claude mcp list
```
o declarándolo en `.mcp.json` del proyecto (como hace este repo con `graphify`).

## Riesgos a tener en cuenta
- **Superficie de seguridad:** un server malicioso puede exfiltrar datos o ejecutar acciones →
  confiar solo en servers conocidos; cuidado con configs project-local no auditadas.
- **Prompt injection** a través de resources/datos externos.

## Por qué importa (para mis proyectos)
MCP es lo que hace **consultable** el cerebro: graphify se expone como server y Claude lo usa para
responder con base en mis notas. Además, cada MCP nuevo (Notion, Stripe, etc.) es una capacidad
que mis agentes pueden adquirir sin escribir integración.

## Enlaces
- [El ecosistema MCP en 2026 (ChatForest)](https://chatforest.com/guides/mcp-ecosystem-2026-state-of-the-standard/)
- [Estadísticas de adopción MCP 2026](https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol)
