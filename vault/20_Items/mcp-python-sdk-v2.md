---
title: "MCP Python SDK v2.0.0a1 — Dispatcher, MCPServer, middleware"
date: 2026-06-15
type: framework
vendor: community
domain: [agents, coding]
ecosystem: [claude-code, standalone]
maturity: preview
source_type: github
relevance: core
url: "https://github.com/modelcontextprotocol/python-sdk/releases/tag/v2.0.0a1"
tags: [type/framework, vendor/community, domain/agents, domain/coding, ecosystem/claude-code, ecosystem/standalone, maturity/preview, source_type/github, relevance/core]
status: triaged
use_case: >
  Si mantienes MCP servers en Python, planificar la migración a v2: ServerSession desaparece
  en favor de Dispatcher, FastMCP pasa a llamarse MCPServer, y los tipos se convierten a
  snake_case. Probar la alpha en entornos no productivos para detectar breaking changes antes
  de que v2 llegue a GA. Aprovechar el sistema de middleware de servidor para añadir
  logging/auth centralizado sin modificar los handlers individuales.
related: ["[[nvidia-skillspector]]", "[[anthropic-mcp-connector-observability]]", "[[litellm-v1-89]]"]
---

## Qué es
La primera alpha de MCP Python SDK v2.0.0 introduce cambios arquitectónicos breaking:
- `ServerSession` reemplazado por un pipeline `Dispatcher` más componible.
- `FastMCP` renombrado a `MCPServer` (alineado con la nomenclatura del spec MCP).
- Tipos y parámetros convertidos de camelCase a snake_case para seguir convenciones Python.
- Sistema de **middleware de servidor**: interceptores inyectables entre el protocolo y los
  handlers, análogo a middleware HTTP (logging, autenticación, rate limiting).

Esta es una **alpha** —API puede cambiar hasta la versión final de v2.

## Por qué importa (para mis proyectos)
El SDK es la librería de referencia para construir MCP servers en Python. Una versión v2 con
breaking changes obliga a auditar y migrar cualquier servidor MCP propio. La llegada del
sistema de middleware es especialmente útil: permite añadir autenticación y logging
centralizados sin tocar la lógica de negocio de cada herramienta. El cambio de nombre
`FastMCP → MCPServer` refleja que el concepto ha madurado; conviene actualizar documentación
y referencias internas.

## Cómo se usa / requisitos
```bash
pip install "mcp[server]==2.0.0a1"
```
Migración básica:
```python
# v1
from mcp.server.fastmcp import FastMCP
app = FastMCP("mi-servidor")

# v2
from mcp.server import MCPServer
app = MCPServer("mi-servidor")
```
Alpha: no usar en producción. Reportar issues en el repo oficial.

## Enlaces
- [Release v2.0.0a1](https://github.com/modelcontextprotocol/python-sdk/releases/tag/v2.0.0a1)
- [Repositorio MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
