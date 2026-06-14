---
type: moc
tags: [moc, home]
---

# 🧠 AI Brain — Home

Punto de entrada al cerebro. Las consultas Dataview de abajo se mantienen solas a medida
que el pipeline añade notas (requiere el plugin **Dataview** en Obsidian).

## 🧩 Fundamentos (empieza aquí)
Base conceptual evergreen — qué es la IA, LLMs, proveedores, harness, agentes, MCP, RAG e
IDEs/CLIs. Es el tronco al que se enganchan las novedades.
- **[[_Home-Foundations]]** — índice de fundamentos.

## Por relevancia: lo accionable ahora (`core`)
```dataview
TABLE type, vendor, domain, maturity, date
FROM "20_Items"
WHERE relevance = "core"
SORT date DESC
```

## Últimas novedades (30 días)
```dataview
TABLE type, vendor, relevance
FROM "20_Items"
WHERE date >= date(today) - dur(30 days)
SORT date DESC
```

## Mapas por categoría
- [[MOC-Models]]
- [[MOC-Tools-Harness]]
- [[MOC-Plugins-Skills-MCP]]
- [[MOC-Frameworks-Techniques]]
- [[MOC-Papers]]

## Notas diarias
```dataview
LIST
FROM "10_Daily"
SORT date DESC
LIMIT 14
```
