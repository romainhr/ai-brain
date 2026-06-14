---
title: "Codex (OpenAI): Library, Computer Use, admin y app 26.609 (junio 2026)"
date: 2026-06-13
type: tool
vendor: openai
domain: [coding, agents, productivity]
ecosystem: [standalone]
maturity: ga
source_type: official
relevance: core
url: https://releasebot.io/updates/openai
tags: [type/tool, vendor/openai, domain/coding, domain/agents, domain/productivity, ecosystem/standalone]
status: triaged
use_case: >
  Usa Codex con Computer Use (incluido Windows) y debugging de navegador vía Chrome DevTools Protocol cuando
  necesites que el agente vea, haga clic y verifique sus propios cambios sobre apps reales o dev servers locales,
  cerrando el ciclo test/debug sin salir del agente. Aprovecha el banking de resets de rate-limit (Plus/Pro) para
  no quedarte bloqueado a mitad de una sesión intensiva, `/init` para generar instrucciones de proyecto desde el
  composer, y los controles de admin de Cloud Console para desplegar Codex de forma gobernada en equipos.
related: ["[[openai-codex-plugins]]", "[[claude-code-june-2026-update]]", "[[openai-gpt-5-5]]", "[[openai-responses-api]]", "[[claude-code-agent-sdk-credits]]"]
---

## Qué es
Tanda de actualizaciones de Codex de OpenAI de junio de 2026. Por un lado, la "Library" para workspaces
Enterprise, Edu y Healthcare —un espacio para encontrar y reutilizar los archivos que se suben o se crean en
ChatGPT—. Por otro, mejoras de Codex: **Computer Use** (el agente ve, hace clic y escribe en aplicaciones, ahora
también en Windows), **debugging de navegador** con acceso controlado al Chrome DevTools Protocol (CDP) para
inspeccionar consola, red, estado de la página y rendimiento JS, nuevos *access controls*, y controles de
administración en la Cloud Console (admins/owners pueden gestionar y desactivar el acceso a CDP por workspace).
La app de Codex **26.609** añade además *banking* de resets de rate-limit para Plus/Pro (guardar resets para
gastarlos cuando convenga; promoción de referidos del 11 al 24 de junio de 2026), un *Developer mode* para
Browser use, el comando `/init` en el composer y controles de Computer Use por aplicación en Windows.

## Por qué importa (para mis proyectos)
Convierte a Codex en un agente que cierra su propio bucle de verificación: en lugar de solo escribir código,
ejecuta la app, manipula el navegador, inspecciona DOM y red y confirma que un fix funciona. Eso reduce la
fricción del ciclo test/debug y acerca el patrón "agente que actúa y valida". El *banking* de resets ataca el
cuello de botella práctico de los límites de uso que cortan sesiones largas, y los controles de admin en Cloud
Console importan para escalar el uso del agente en un equipo con gobernanza (quién puede usar CDP, límites,
políticas), clave para pasar de experimentos a despliegues reales. `/init` estandariza las instrucciones de
proyecto, igual que harías con `CLAUDE.md` en otros harness.

## Cómo se usa / requisitos
Computer Use está en la app de Codex (con soporte Windows para usuarios elegibles) y para Enterprise fuera del
EEE/UK y otras regiones; el debugging de navegador funciona con Chrome y el navegador integrado vía CDP activando
el plugin Browser. La gobernanza se gestiona desde la Cloud Console (Policies & Configurations). El *banking* de
resets requiere app 26.609 y plan Plus/Pro (cada reset banqueado caduca a los 30 días). Limitaciones: varias
funciones dependen del tipo de workspace y de elegibilidad regional; el acceso a CDP puede estar restringido por
el administrador; la promo de referidos es temporal y la Library se limita a planes Enterprise/Edu/Healthcare.

## Enlaces
- [OpenAI release notes (Releasebot)](https://releasebot.io/updates/openai)
- [VentureBeat — Codex Sites y plugins](https://venturebeat.com/orchestration/openais-codex-update-lets-agents-build-interactive-enterprise-workspaces-via-sites-and-role-specific-plugins)
