---
title: "Anthropic MCP Connector Observability Beta + directorio in-app"
date: 2026-06-15
type: mcp
vendor: anthropic
domain: [agents, infra]
ecosystem: [claude-code, standalone]
maturity: preview
source_type: community
relevance: experimental
url: "https://thenewstack.io/anthropic-mcp-tunnels-sandboxes/"
tags: [type/mcp, vendor/anthropic, domain/agents, domain/infra, ecosystem/claude-code, ecosystem/standalone, maturity/preview, source_type/community, relevance/experimental]
status: triaged
use_case: >
  Cuando estés desarrollando o publicando un MCP server: usar la beta de observabilidad para
  ver métricas de adopción, tasa de error y latencia de tu conector antes de publicarlo en
  el directorio oficial de Anthropic. La submission directa desde Claude reduce la fricción
  de publicación. Si consumes MCP servers de terceros del directorio, las métricas de
  observabilidad públicas ayudarán a evaluar fiabilidad antes de adoptar.
related: ["[[mcp-python-sdk-v2]]", "[[nvidia-skillspector]]", "[[litellm-v1-89]]", "[[claude-code-june-2026-update]]"]
---

## Qué es
Anthropic lanzó una **beta de observabilidad para conectores MCP** que expone métricas
públicas de cada conector en el directorio oficial:
- Tasa de adopción (usuarios activos).
- Tasa de error por operación.
- Latencia por tipo de tool call.

Además, introdujo **submission directa al directorio desde Claude**: los desarrolladores
pueden enviar un MCP server para revisión sin salir de la interfaz. El ecosistema MCP de
Anthropic supera ya los **300 conectores de terceros** verificados.

Los "tunnels" mencionados en el artículo fuente permiten exponer MCP servers locales
(localhost) a Claude sin despliegue en cloud, facilitando el desarrollo y prueba.

## Por qué importa (para mis proyectos)
La observabilidad convierte el directorio MCP en un recurso evaluable, no solo un catálogo.
Antes de integrar un MCP server de terceros en el AI Brain, poder ver su tasa de error y
latencia real es información decisiva. Los tunnels de desarrollo simplifican enormemente el
ciclo de prueba de nuevos MCP servers: se pueden probar contra Claude real sin necesidad de
despliegue.

## Cómo se usa / requisitos
Beta accesible desde la configuración de MCP en Claude (claude.ai). Para exponer un servidor
local, seguir la guía de tunnels de Anthropic. La submission al directorio requiere cuenta
de desarrollador verificada.

## Enlaces
- [The New Stack — MCP tunnels y sandboxes](https://thenewstack.io/anthropic-mcp-tunnels-sandboxes/)
