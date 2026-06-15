---
title: "LiteLLM v1.89.0 — MCP OAuth passthrough + Gemini 3.1 + routing Claude"
date: 2026-06-15
type: framework
vendor: community
domain: [agents, infra, coding]
ecosystem: [claude-code, standalone, langchain]
maturity: ga
source_type: github
relevance: experimental
url: "https://github.com/BerriAI/litellm/releases/tag/v1.89.0"
tags: [type/framework, vendor/community, domain/agents, domain/infra, domain/coding, ecosystem/claude-code, ecosystem/standalone, ecosystem/langchain, maturity/ga, source_type/github, relevance/experimental]
status: triaged
use_case: >
  Usar LiteLLM v1.89 como proxy unificado para integrar MCP servers con autenticación OAuth
  (sin exponer tokens al modelo): configura el passthrough en el proxy y tus agentes obtienen
  herramientas MCP autenticadas automáticamente. El routing adaptativo a Claude Opus 4.8
  permite enrutar automáticamente peticiones complejas al modelo más capaz sin cambiar el
  código del cliente. El rate limiting por MCP server ayuda a controlar costes de herramientas
  externas.
related: ["[[mcp-python-sdk-v2]]", "[[claude-code-agent-sdk-credits]]", "[[openai-responses-api]]", "[[nvidia-skillspector]]"]
---

## Qué es
LiteLLM v1.89.0 añade:
- **MCP OAuth passthrough**: el proxy LiteLLM gestiona el flujo OAuth para conectar a MCP
  servers que requieren autenticación (ej: GitHub, Notion, Slack MCP servers), sin que el
  modelo vea los tokens.
- **JWT con scope por issuer**: control fino de qué tokens de qué proveedores de identidad
  pueden invocar qué herramientas.
- **Soporte Gemini 3.1**: nuevos identificadores de modelo Gemini 3.1 Pro y Flash.
- **Routing adaptativo a Claude Opus 4.8**: política de routing que escala automáticamente
  a Opus 4.8 cuando la solicitud supera umbrales de complejidad configurables.
- **Rate limiting por MCP server**: cuotas independientes por servidor MCP en el proxy,
  evitando que un servidor externoabrume el sistema.

## Por qué importa (para mis proyectos)
LiteLLM es la capa de abstracción central para multi-proveedor en muchos harness. El MCP OAuth
passthrough resuelve uno de los problemas más engorrosos de integrar MCP servers empresariales:
gestionar el ciclo de vida de tokens OAuth sin exponerlos. Para el AI Brain, donde se pueden
integrar MCP servers de terceros, esto simplifica enormemente la arquitectura de autenticación.

## Cómo se usa / requisitos
```bash
pip install litellm==1.89.0
```
Configuración de MCP OAuth passthrough en `litellm_config.yaml`:
```yaml
mcp_servers:
  - name: "github"
    url: "https://mcp.github.com"
    oauth:
      client_id: "${GITHUB_CLIENT_ID}"
      client_secret: "${GITHUB_CLIENT_SECRET}"
```
Licencia: MIT. Compatible con Python 3.8+.

## Enlaces
- [Release v1.89.0](https://github.com/BerriAI/litellm/releases/tag/v1.89.0)
- [LiteLLM docs](https://docs.litellm.ai)
