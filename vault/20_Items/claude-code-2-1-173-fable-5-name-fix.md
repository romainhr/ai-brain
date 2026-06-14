---
title: "Claude Code 2.1.173 (normalización de nombre de Fable 5)"
date: 2026-06-13
type: harness
vendor: anthropic
domain: [coding, agents]
ecosystem: [claude-code]
maturity: ga
source_type: official
relevance: watch
url: https://releasebot.io/updates/anthropic
tags: [type/harness, vendor/anthropic, domain/coding, domain/agents, ecosystem/claude-code]
status: triaged
use_case: >
  Actualiza a 2.1.173+ si usas Fable 5 en Claude Code y tu configuración añade el sufijo [1m] al nombre del
  modelo: ahora se normaliza solo y dejas de romper la selección de modelo. También resuelve un aviso falso de
  dependencias de sandbox al arrancar en Windows, útil si trabajas en ese SO con sandbox activado.
related: ["[[claude-fable-5]]", "[[claude-code-june-2026-update]]", "[[claude-code-agent-sdk-credits]]", "[[claude-mythos-5]]"]
---

## Qué es
Versión de mantenimiento 2.1.173 del harness Claude Code (publicada el 11 de junio de 2026). Corrige dos cosas:
la normalización del nombre del modelo Fable 5 cuando lleva el sufijo `[1m]` —dado que Fable 5 ya incluye 1M de
contexto por defecto, el sufijo ahora se elimina automáticamente— y un aviso espurio de "dependencias de sandbox
ausentes" que aparecía al iniciar en Windows con el sandbox habilitado.

## Por qué importa (para mis proyectos)
Si tu flujo agéntico depende de Claude Code con Fable 5, una mala normalización del nombre del modelo puede
provocar fallos silenciosos al seleccionar el modelo o configuraciones rotas en `settings.json`. Esta corrección
elimina esa fricción. Para quienes desarrollan en Windows, quitar el aviso falso de sandbox reduce ruido y dudas
sobre si el entorno está bien configurado.

## Cómo se usa / requisitos
Ejecuta `claude update` o instala 2.1.173 o superior. Tras actualizar, ya no necesitas evitar el sufijo `[1m]`
en el nombre de Fable 5: el harness lo recorta solo. El arranque en Windows con `sandbox.enabled=true` deja de
mostrar el aviso erróneo de dependencias. Es un parche menor sin cambios de API ni de comportamiento agéntico;
conviene encadenarlo con las versiones cercanas (2.1.170-2.1.175) que traen Fable 5 y otros arreglos.

## Enlaces
- [Anthropic release notes (Releasebot)](https://releasebot.io/updates/anthropic)
- [Claude Code changelog](https://code.claude.com/docs/en/changelog)
