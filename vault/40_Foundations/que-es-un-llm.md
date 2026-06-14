---
title: "Qué es un LLM"
type: foundation
status: evergreen
updated: 2026-06-13
tags: [foundation, concept, type/model]
related: ["[[que-es-la-ia]]", "[[proveedores-de-modelos]]", "[[panorama-de-modelos]]", "[[tecnicas-clave]]", "[[glosario]]"]
---

# Qué es un LLM (Large Language Model)

## Definición
Un **LLM** es una red neuronal (casi siempre arquitectura **Transformer**) entrenada para predecir
el siguiente token dado un contexto. De esa simple tarea, a gran escala, emergen capacidades de
lenguaje, razonamiento, código y, con datos adecuados, visión y audio.

## Cómo funciona (mínimo imprescindible)
- **Tokenización:** el texto se parte en *tokens* (~¾ de palabra en inglés). El modelo razona y
  factura en tokens, no en palabras.
- **Predicción autoregresiva:** genera un token a la vez, realimentando lo ya escrito.
- **Pesos (parámetros):** los "conocimientos" aprendidos. Tamaños típicos 2026: de ~3B (móvil/edge)
  a cientos de miles de millones (frontera). Los MoE activan solo una fracción por token.
- **Temperatura:** controla aleatoriedad de la salida (0 = determinista, útil para extracción).

## Tipos de modelos que verás
- **Base vs. Instruct/Chat:** el base solo completa texto; el *instruct* está alineado para seguir
  instrucciones (lo que casi siempre usas).
- **Reasoning / thinking models:** dedican cómputo a "pensar" antes de responder (mejor en mates,
  código, lógica). En 2026 muchos modelos llevan el modo conmutable.
- **Multimodales:** aceptan imagen/audio/video además de texto.
- **Cerrados (API) vs. open-weights:** API gestionada (Claude, GPT, Gemini) vs. pesos descargables
  (Llama, Qwen, DeepSeek, Gemma, Mistral) que puedes correr local (ver [[que-es-mcp]] no aplica;
  ver Ollama en [[glosario]]).

## Parámetros operativos clave
- **Ventana de contexto:** de 128K hasta ~2M tokens en 2026 (Grok 4 Fast lidera en práctica).
- **Coste:** se cobra por token de entrada y de salida, por separado (la salida suele costar más).
- **Latencia/throughput:** los modelos "flash/instant" priorizan velocidad; los "opus/pro/max",
  capacidad.

## Limitaciones que debes diseñar alrededor
- **Alucinación:** inventan hechos → mitigar con [[que-es-rag]] y verificación.
- **Corte de conocimiento:** no saben nada posterior a su entrenamiento → RAG / búsqueda / tools.
- **No-determinismo y sensibilidad al prompt** → ver [[tecnicas-clave]].
- **Ventana finita:** el contexto se llena; gestionar qué entra es *context engineering*.

## Por qué importa (para mis proyectos)
Elegir LLM es un trade-off de **capacidad × coste × latencia × contexto × privacidad**. Esta nota
da el vocabulario; la decisión concreta "¿cuál uso para X?" se resuelve con [[panorama-de-modelos]]
y [[proveedores-de-modelos]].

## Enlaces
- [LLM Leaderboard 2026 (Vellum)](https://www.vellum.ai/llm-leaderboard)
- [Artificial Analysis — modelos](https://artificialanalysis.ai/leaderboards/models)
