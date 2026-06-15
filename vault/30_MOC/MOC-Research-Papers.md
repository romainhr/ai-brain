---
title: "MOC — Research, Papers y Benchmarks"
type: moc
status: evergreen
updated: 2026-06-15
tags: [moc, type/paper, type/benchmark, type/technique]
related: ["[[MOC-Home]]", "[[evaluacion-de-modelos]]", "[[patrones-de-agentes]]", "[[que-es-rag]]"]
---

# 📄 MOC — Research, Papers y Benchmarks

> Publicaciones de investigación, benchmarks y técnicas emergentes capturadas en el vault.
> Ver evaluación en [[evaluacion-de-modelos]] y técnicas en [[patrones-de-agentes]].

---

## Papers — Agentes y Harness

| Nota | Tema | Relevancia |
|---|---|---|
| [[llm-agent-externalization-survey]] | Taxonomía: externalización de memoria, skills, protocolos | 🔬 experimental |
| [[harnessx-adaptive-agent-harness]] | Harness composable y adaptable (foundry) | 🔬 experimental |
| [[eurekagent-agent-environment-engineering]] | Ingeniería del entorno para descubrimiento científico | 🔬 experimental |
| [[cacherl-multi-turn-tool-calling]] | Entrenamiento eficiente multi-turno con tool-calling | 👀 watch |
| [[gitofthoughts-version-controlled-reasoning]] | Razonamiento de agentes con control de versiones | 🔬 experimental |
| [[evoarena-evomem]] | Memoria robusta para agentes en entornos dinámicos | 👀 watch |
| [[parallel-synthesis-kv-cache]] | Síntesis directa en espacio latente para workflows | 👀 watch |
| [[mragent-graph-memory]] | Memoria como reconstrucción, no recuperación (ICML 2026) | 🔬 experimental |
| [[kimi-work-desktop-agent]] | Enjambre de 300 sub-agentes (caso práctico) | 👀 watch |

## Papers — RAG y Memoria

| Nota | Tema | Relevancia |
|---|---|---|
| [[agentic-rag-sok]] | SoK: taxonomía y arquitecturas de Agentic RAG | 🔬 experimental |
| [[learning-to-reason-by-analogy-ra-rft]] | RA-RFT: retrieval + RL fine-tuning para razonamiento | 👀 watch |
| [[mragent-graph-memory]] | Memoria reconstruida vs. recuperada | 🔬 experimental |

## Papers — Multimodal y Visión

| Nota | Tema | Relevancia |
|---|---|---|
| [[interleave-thinker]] | Generación intercalada texto-imagen agéntica | 👀 watch |

## Papers — Coding e Ingeniería de Software

| Nota | Tema | Relevancia |
|---|---|---|
| [[rise-of-ai-native-software-engineering]] | Revisión sistemática del nuevo paradigma de desarrollo | 👀 watch |
| [[cacherl-multi-turn-tool-calling]] | Tool-calling eficiente en coding | 👀 watch |

## Benchmarks y Evaluación

| Nota | Qué mide | Relevancia |
|---|---|---|
| [[claude-fable-5-coding-eval]] | Fable 5 en coding — eval comunitaria | 👀 watch |
| [[every-eval-ever]] | Schema unificado y repo comunitario de evals | 👀 watch |
| [[evoarena-evomem]] | Memoria robusta en entornos dinámicos | 👀 watch |
| [[olmo-eval]] | Workbench de evaluación continua (AllenAI) | ⭐ core |

---

## Temas emergentes detectados
- **Externalización de agentes**: memoria, skills y protocolos como ciudadanos de primera clase → [[llm-agent-externalization-survey]]
- **Razonamiento controlado por versiones**: agentes con git como memoria operativa → [[gitofthoughts-version-controlled-reasoning]]
- **Eficiencia en training de agentes**: CacheRL como alternativa a RLHF estándar → [[cacherl-multi-turn-tool-calling]]
- **Memoria reconstructiva**: MRAgent desafía el paradigma retrieval → [[mragent-graph-memory]]

---

## Relacionado
- Cómo leer benchmarks → [[evaluacion-de-modelos]]
- Patrones que emerge de estos papers → [[patrones-de-agentes]]
- RAG en profundidad → [[que-es-rag]]
