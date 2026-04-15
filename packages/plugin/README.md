# Neo-Terminal Plugin for OpenCode

A neo-terminal personality matrix that transforms your coding terminal into a NEXUS neural interface — holographic scanlines, neon color overlays, neural effects with `/neural` command, and a multi-agent dashboard that monitors your context, generation, and costs in real time.

**Note:** This plugin is theme-agnostic. Install it with a companion theme for the full experience.

## Installation

### With Theme (Recommended)

For the complete neo-terminal experience:

```json
{
  "plugin": ["oc-theme-neo-rose", "oc-neo-terminal"]
}
```

### Plugin Only

The plugin works with any dark theme:

```json
{
  "plugin": ["oc-neo-terminal"]
}
```

## Features

- **NEXUS Dashboard**: Real-time monitoring of MEM, GEN, HIT, and COST metrics
- **Holographic Scanlines**: Retro-futuristic CRT effect with configurable speed
- **Neural Command**: Type `/neural` to trigger a pulsating brain animation
- **Vignette Effect**: Subtle dark corners for immersive focus
- **Side Panel**: Collapsible sidebar with system status

## TUI Options

Configure via `tui.json`:

- `enabled` (`boolean`, default `true`) - Enable the plugin
- `scanlines` (`boolean`, default `true`) - Holographic scanline effect
- `scanline_speed` (`number`, default `0.008`) - Animation speed
- `vignette` (`number`, default `0.65`) - Corner darkness (0-1)
- `sidebar` (`boolean`, default `true`) - Show side panel

## Commands

- `/neural` - Trigger the neural brain animation with glitch effects

## Customization

You can customize the brand name and ASCII art by creating files in `~/.config/opencode/oc-neo-terminal/`:

### `brand.json`

```json
{
  "name": "CYBER-1",
  "home": "home.txt"
}
```

- **`name`** — Brand name displayed in the UI (max 20 chars). Defaults to `NEXUS`.
- **`home`** — Fallback ASCII art file used for all home sizes when a specific size file doesn't exist.

### ASCII Art Files

Place `.txt` files in `~/.config/opencode/oc-neo-terminal/`:

| File              | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| `home-small.txt`  | Logo for terminals smaller than ~15 rows (default: 5 rows)     |
| `home-medium.txt` | Logo for medium terminals ~15-30 rows (default: 31 rows)       |
| `home-large.txt`  | Logo for large terminals >30 rows (default: 29 rows)           |
| `side.txt`        | Sidebar icon that appears on the left panel (default: 11 rows) |

### Resolution Priority

For each home size, the plugin resolves the ASCII art in this order:

1. **Specific file** — e.g. `home-medium.txt` if it exists
2. **`home` fallback** — the file specified in `brand.json` `"home"` field
3. **Built-in default** — the NEXUS ASCII art hardcoded in the plugin

### Example Directory

```
~/.config/opencode/oc-neo-terminal/
├── brand.json
├── home.txt         ← fallback used for all sizes
├── home-small.txt   ← overrides fallback for small terminals
├── home-medium.txt  ← overrides fallback for medium terminals
├── home-large.txt   ← overrides fallback for large terminals
└── side.txt
```

If files don't exist, the plugin uses the default NEXUS branding.

## Themes

This plugin is theme-agnostic and works with any OpenCode theme. Companion themes:

- `neo-rose` - Neon pink, cyan, and violet accents on dark void
- `neo-matrix` - Green with teal, lime neon, and violet accents
- `neo-amber` - Vintage amber phosphor with gold, coral, and olive accents
- `neo-cyan` - Futuristic cyan with electric blue and magenta accents