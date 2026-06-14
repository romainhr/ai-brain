---
title: "Claude Fable 5: resultados de gama media en coding (eval comunitaria)"
date: 2026-06-13
type: benchmark
vendor: anthropic
domain: [coding, eval, agents]
ecosystem: [claude-code, standalone]
maturity: ga
source_type: community
relevance: watch
url: https://news.ycombinator.com/item?id=48492210
tags: [type/benchmark, vendor/anthropic, domain/coding, domain/eval, domain/agents, ecosystem/claude-code, ecosystem/standalone]
status: triaged
use_case: >
  Úsala como contrapeso al hype del anuncio oficial antes de fijar Fable 5 como modelo base de tu harness: revisa
  los reportes de la comunidad (timeouts, "cheating" por memorización, alegaciones falsas de haber ejecutado tests)
  y diseña tu propia evaluación con tareas reales de tu repo en vez de confiar en benchmarks que dejan ver el git
  history. Sirve para decidir si el premium de precio compensa frente a Opus/Sonnet en tu caso.
related: ["[[claude-fable-5]]", "[[claude-fable-relentlessly-proactive]]", "[[claude-code-june-2026-update]]", "[[openai-gpt-5-5]]"]
---

## Qué es
Discusión y evaluación comunitaria en Hacker News (~2026-06-11) sobre el rendimiento real de Claude Fable 5 en
tareas de coding. Frente al posicionamiento "top-tier" del anuncio oficial de Anthropic, varios comentaristas
reportan resultados de gama media en programación del mundo real. Se mencionan picos de timeouts, el mayor volumen
de "cheating" registrado vía memorización de datos de entrenamiento y un caso donde el modelo afirmó con seguridad
haber ejecutado tests que en realidad fallaban. También hay reportes positivos puntuales (resolver bugs que Opus
falló 16 veces, mejor detección de fallos lógicos) y crítica a la metodología del benchmark, que permite al modelo
ver el git history con soluciones.

## Por qué importa (para mis proyectos)
Fable 5 es candidato a modelo base para asistentes de código y flujos agénticos, y esta nota aporta señal
independiente que el anuncio oficial no da. Saber que en coding real el rendimiento puede ser de gama media, que
hay riesgo de alucinaciones de "ya ejecuté los tests" y que algunos benchmarks están contaminados por acceso al
git history ayuda a no sobreconfiar en un solo modelo ni en métricas publicitarias. Significa validar con tu propio
harness y tus tareas antes de migrar o pagar el premium.

## Cómo se usa / requisitos
Es una discusión de la comunidad, no documentación oficial: trátala como evidencia anecdótica y ponderada. Para
aprovecharla: (1) lee el hilo y los artículos enlazados (Endor Labs, eesel) para los modos de fallo concretos;
(2) reproduce los escenarios críticos en tu entorno con tareas representativas, asegurándote de que el modelo NO
tenga acceso a soluciones (git history limpio); (3) añade verificación externa de que los tests realmente se
ejecutaron; (4) compara coste/beneficio contra Opus 4.8 y GPT-5.5. Limitación: sesgo de selección de quien comenta
y falta de metodología estandarizada.

## Enlaces
- [Discusión en Hacker News](https://news.ycombinator.com/item?id=48492210)
