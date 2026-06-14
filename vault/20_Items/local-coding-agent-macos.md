---
title: "Montar un agente de codificación local en macOS"
date: 2026-06-13
type: technique
vendor: community
domain: [coding, agents, infra]
ecosystem: [ollama, vscode]
maturity: ga
source_type: community
relevance: experimental
url: https://news.ycombinator.com/item?id=48507020
tags: [type/technique, vendor/community, domain/coding, domain/agents, domain/infra, ecosystem/ollama, ecosystem/vscode]
status: triaged
use_case: >
  Úsala cuando necesites un agente de codificación 100% local y privado en un Mac con Apple Silicon, sin enviar
  código a la nube ni pagar tokens. Ideal para experimentar con modelos Qwen Coder en proyectos sensibles,
  prototipar offline o tener un fallback gratuito a tus agentes de pago.
related: ["[[openai-codex-plugins]]", "[[claude-code-june-2026-update]]", "[[gemma-4]]", "[[kimi-k2-7-code]]", "[[diffusiongemma]]"]
---

## Qué es
Guía popular de la comunidad (467 puntos en Hacker News) que explica cómo montar un agente de codificación
totalmente local y privado en macOS. La receta base combina un servidor de inferencia local (Ollama o, según los
benchmarks del autor, llama.cpp para mayor velocidad) con la extensión open source Continue.dev en VS Code, usando
modelos Qwen Coder. El autor mide rendimiento entre motores y modelos, llegando hasta ~72 tokens/s con la
configuración adecuada de llama.cpp, y documenta la descarga de modelos, la configuración del servidor y la
integración con el editor.

## Por qué importa (para mis proyectos)
Ofrece una ruta práctica y reproducible para tener inferencia agéntica sin depender de APIs en la nube: privacidad
total del código, coste cero por token y operación offline. Para IA agéntica es un buen banco de pruebas para
entender el trade-off velocidad/calidad de modelos locales, un fallback gratuito cuando se agota presupuesto de
Claude/Codex, y una base para flujos sensibles donde el código no puede salir de la máquina.

## Cómo se usa / requisitos
Requiere un Mac con Apple Silicon (M1 o posterior); los Intel quedan fuera por falta de aceleración Metal en
llama.cpp. Pasos: instalar Ollama o compilar llama.cpp, descargar un modelo Qwen Coder dimensionado a tu RAM (7B
para 16 GB, 32B para 32 GB), levantar el servidor local y conectar Continue.dev (Apache 2.0) en VS Code apuntando
al endpoint local para autocompletado, completado inline y chat. Limitaciones: la calidad y la latencia siguen por
debajo de los modelos frontier en la nube, el rendimiento depende mucho de RAM/modelo, y es una guía de comunidad
(no oficial) cuyos benchmarks pueden variar según hardware y versiones.

## Enlaces
- [Discusión en Hacker News](https://news.ycombinator.com/item?id=48507020)
