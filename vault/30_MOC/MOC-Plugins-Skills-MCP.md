---
type: moc
tags: [moc, type/plugin, type/skill, type/mcp, type/rule]
---

# 🔌 MOC — Plugins, Skills, MCP y Rules

```dataview
TABLE type, vendor, ecosystem, relevance, date
FROM "20_Items"
WHERE type = "plugin" OR type = "skill" OR type = "mcp" OR type = "rule"
SORT date DESC
```
