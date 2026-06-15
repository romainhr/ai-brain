---
title: "Kimi Work — agente de escritorio con enjambre de 300 sub-agentes"
date: 2026-06-15
type: agent
vendor: community
domain: [agents, coding, productivity]
ecosystem: [standalone]
maturity: preview
source_type: community
relevance: watch
url: "https://www.marktechpost.com/2026/06/12/moonshot-ai-launches-kimi-work-a-local-desktop-agent-reportedly-running-on-kimi-k2-6-with-a-300-sub-agent-agent-swarm/"
tags: [type/agent, vendor/community, domain/agents, domain/coding, domain/productivity, ecosystem/standalone, maturity/preview, source_type/community, relevance/watch]
status: triaged
use_case: >
  Evaluar Kimi Work para tareas de automatización de escritorio que requieran coordinación
  masiva de sub-agentes: procesamiento en paralelo de archivos, automatización de browser
  multi-tab y scripts de sistema. Especialmente interesante si se busca una alternativa
  open-weight a Operator/Claude Computer Use con capacidad de enjambre local. Seguir su
  evolución: si la arquitectura de 300 sub-agentes se estabiliza, puede ser referencia para
  diseñar harness de enjambre propios.
related: ["[[kimi-k2-7-code]]", "[[claude-code-agent-sdk-credits]]", "[[microsoft-agent-framework]]", "[[local-coding-agent-macos]]"]
---

## Qué es
**Kimi Work** es una aplicación de escritorio descargable (macOS y Windows) lanzada por
Moonshot AI el 12 de junio de 2026. Corre sobre el modelo Kimi K2.6 y coordina hasta
**300 sub-agentes** en paralelo para ejecutar tareas de escritorio complejas. Capacidades:
- Automatización de navegador (browser) multi-tab.
- Gestión de archivos y sistema de archivos.
- Ejecución de scripts y comandos de terminal.
- Decomposición automática de tareas en sub-tareas paralelas.

El modelo de enjambre (swarm) es la característica diferenciadora: mientras la mayoría de
agentes desktop ejecutan tareas secuencialmente, Kimi Work distribuye el trabajo entre
cientos de sub-agentes concurrentes.

## Por qué importa (para mis proyectos)
Es el primer producto de escritorio con arquitectura de enjambre masivo que llega como app
descargable, democratizando un patrón de orquestación que hasta ahora requería ingeniería
significativa. Para el AI Brain, es una referencia de diseño: cómo estructurar la
decomposición de tareas en sub-agentes cuando el volumen de paralelismo es muy alto.
La limitación: corre sobre K2.6 (no el más potente), y la estabilidad de 300 agentes
concurrentes en escritorio es aún incierta. Seguir en modo watch.

## Cómo se usa / requisitos
Descargable desde la web de Kimi (kimi.ai). Disponible para macOS y Windows. Requiere
cuenta Kimi. No hay API pública documentada aún; el acceso es solo via app.

## Enlaces
- [Cobertura MarkTechPost](https://www.marktechpost.com/2026/06/12/moonshot-ai-launches-kimi-work-a-local-desktop-agent-reportedly-running-on-kimi-k2-6-with-a-300-sub-agent-agent-swarm/)
