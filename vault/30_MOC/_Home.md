---
type: moc
tags: [moc, home]
cssclasses:
  - ai-home
---

# 🧠 AI Brain

> Tu mapa vivo de inteligencia artificial: fundamentos que perduran, señales que cambian
> y conexiones que convierten información en criterio.

## Explorar

> [!foundation] Fundamentos
> Los conceptos evergreen: IA, LLMs, agentes, RAG, MCP y entornos de desarrollo.
>
> **[[_Home-Foundations|Entrar en fundamentos →]]**

> [!models] Modelos
> El panorama de modelos, proveedores, capacidades y cambios que vale la pena seguir.
>
> **[[MOC-Models|Explorar modelos →]]**

> [!tools] Herramientas y agentes
> Harnesses, plugins, skills, MCP y formas prácticas de construir con IA.
>
> **[[MOC-Tools-Harness|Ver herramientas →]]** · **[[MOC-Plugins-Skills-MCP|Ver integraciones →]]**

> [!research] Investigación
> Papers, benchmarks, datasets y técnicas que pueden cambiar la práctica.
>
> **[[MOC-Papers|Abrir investigación →]]** · **[[MOC-Frameworks-Techniques|Ver técnicas →]]**

## En el radar

Las señales `core` y `watch` más recientes, ordenadas automáticamente.

```dataview
TABLE WITHOUT ID
  file.link AS "Nota",
  type AS "Tipo",
  vendor AS "Vendor",
  relevance AS "Foco",
  date AS "Fecha"
FROM "20_Items"
WHERE relevance = "core" OR relevance = "watch"
SORT date DESC
LIMIT 10
```

## Últimos barridos

```dataview
TABLE WITHOUT ID
  file.link AS "Resumen diario",
  items_new AS "Nuevas",
  items_updated AS "Actualizadas"
FROM "10_Daily"
SORT date DESC
LIMIT 7
```

## Cómo fluye el conocimiento

1. **Captura** en `00_Inbox` para no perder señales.
2. **Sintetiza** en `10_Daily` para entender qué cambió.
3. **Desarrolla** en `20_Items` para conservar lo importante.
4. **Conecta** con `30_MOC` y `40_Foundations` para construir criterio.

> [!tip] Atajos
> `Ctrl + O` abre cualquier nota rápidamente. Usa el grafo para descubrir conexiones y
> los mapas de contenido para navegar con intención.
