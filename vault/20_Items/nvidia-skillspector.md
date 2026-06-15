---
title: "NVIDIA SkillSpector — escáner de seguridad para skills de agentes IA"
date: 2026-06-15
type: tool
vendor: nvidia
domain: [security, agents, coding]
ecosystem: [claude-code, standalone]
maturity: preview
source_type: github
relevance: experimental
url: "https://github.com/NVIDIA/SkillSpector"
tags: [type/tool, vendor/nvidia, domain/security, domain/agents, domain/coding, ecosystem/claude-code, ecosystem/standalone, maturity/preview, source_type/github, relevance/experimental]
status: triaged
use_case: >
  Ejecutar SkillSpector sobre las skills propias (o de terceros que se van a consumir) antes
  de publicarlas o adoptarlas: detecta prompt injection, exfiltración de datos, escalada de
  privilegios y otros 61 patrones adicionales en dos etapas (análisis estático + validación
  semántica con LLM). Especialmente útil antes de publicar skills en directorios públicos o
  integrar MCP servers de terceros en el harness.
related: ["[[claude-code-june-2026-update]]", "[[mcp-python-sdk-v2]]", "[[anthropic-mcp-connector-observability]]"]
---

## Qué es
SkillSpector es una herramienta de seguridad open-source publicada por NVIDIA el 13 de junio
de 2026 para auditar skills de agentes IA (Claude Code skills, MCP servers, plugins de Codex,
etc.). Detecta 64 patrones de vulnerabilidad en dos etapas:
1. **Análisis estático**: reglas deterministas sobre el manifest y el código de la skill.
2. **Validación semántica con LLM**: analiza el comportamiento descrito en el prompt de la
   skill para detectar instrucciones maliciosas o ambiguas que podrían ser explotadas.

Llegó a 964 estrellas en GitHub el primer día de publicación, señal de alta demanda en la
comunidad.

## Por qué importa (para mis proyectos)
A medida que el ecosistema de skills (Claude Code), MCP servers y plugins de agentes crece,
el riesgo de inyección de prompts maliciosos o de exfiltración involuntaria de datos aumenta.
Si el AI Brain consume skills o MCP servers de terceros, SkillSpector proporciona una capa
de auditoría antes de integrar. También es útil para validar las skills propias antes de
compartirlas (evitar publicar accidentally skills con permisos excesivos o instrucciones
ambiguas que un usuario malicioso podría explotar).

## Cómo se usa / requisitos
```bash
pip install skillspector
skillspector audit ./my-skill/
skillspector audit https://github.com/user/mcp-server
```
Requiere Python ≥ 3.11 y una API key de modelo (por defecto usa un modelo Nvidia NIM, pero
configurable). Licencia: Apache 2.0. El análisis semántico consume tokens del modelo elegido.

## Enlaces
- [Repositorio GitHub](https://github.com/NVIDIA/SkillSpector)
