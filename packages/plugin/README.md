# Neo-Terminal Plugin for OpenCode

A retro-futuristic, cyberpunk-styled plugin for OpenCode — featuring holographic CRT scanlines, neural animations, and a NEXUS-style monitoring dashboard.

<img src="https://raw.githubusercontent.com/nelsonaguirre/oc-neo-terminal/main/assets/demo-home.gif" alt="Neo-Terminal home screen" width="800">

## Installation

```bash
opencode plugin @nelsonaguirre/oc-plugin-neo-terminal -g
```

## Configuration Options

| Option           | Type      | Default | Description                          |
| ---------------- | --------- | ------- | ------------------------------------ |
| `enabled`        | `boolean` | `true`  | Enable/disable the plugin            |
| `scanlines`      | `boolean` | `true`  | Show holographic CRT scanline effect |
| `scanline_speed` | `number`  | `0.008` | Animation speed of scanlines (0-1)   |
| `vignette`       | `number`  | `0.65`  | Corner darkness intensity (0-1)      |
| `sidebar`        | `boolean` | `true`  | Show NEXUS-style side panel          |

Default config in `tui.json`:

```json
{
  "plugin": [
    [
      "@nelsonaguirre/oc-plugin-neo-terminal",
      {
        "enabled": true,
        "scanlines": true,
        "scanline_speed": 0.008,
        "vignette": 0.65,
        "sidebar": true
      }
    ]
  ]
}
```

## Features

### Neural Command

Type `/neural` to trigger a pulsating brain animation with glitch effects:

<img src="https://raw.githubusercontent.com/nelsonaguirre/oc-neo-terminal/main/assets/demo-neural.gif" alt="Neural command" width="800">

### Sidebar Dashboard

NEXUS-style monitoring dashboard with system metrics and custom ASCII art sidebar:

<img src="https://raw.githubusercontent.com/nelsonaguirre/oc-neo-terminal/main/assets/demo-session-side.gif" alt="Sidebar dashboard" width="800">

### Holographic Scanlines

Retro-futuristic CRT effect that gives your editor a classic terminal feel.

### Vignette Effect

Dark corners for immersive focus and reduced eye strain.

## Customization

### Config Precedence

Neo-Terminal supports two config locations. **Local project config takes precedence over global config**, which takes precedence over the built-in defaults:

| Priority     | Location                                    | When to use                  |
| ------------ | ------------------------------------------- | ---------------------------- |
| 1 — Local    | `<project-root>/.opencode/oc-neo-terminal/` | Per-project branding         |
| 2 — Global   | `~/.config/opencode/oc-neo-terminal/`       | Personal global defaults     |
| 3 — Built-in | Bundled defaults                            | Fallback when no files exist |

Each asset resolves independently — you can override only `side.txt` locally while all other assets fall back to your global config or built-in defaults.

### Brand Name

**Global:** Create `~/.config/opencode/oc-neo-terminal/brand.json`:

```json
{
  "name": "CYBER-1",
  "home": "home.txt"
}
```

**Local (per-project):** Create `<project-root>/.opencode/oc-neo-terminal/brand.json`:

```json
{
  "name": "my-project"
}
```

- **`name`** — Brand name displayed in the UI (max 20 chars). Defaults to `NEXUS`. Local `brand.json` overrides global.
- **`home`** — Fallback ASCII art file for size variants (used when no specific size file exists).

### ASCII Art Files

Place `.txt` files in either config directory. Local files override global files of the same name.

**Global:** `~/.config/opencode/oc-neo-terminal/`

**Local (per-project):** `<project-root>/.opencode/oc-neo-terminal/`

| File              | Purpose                         |
| ----------------- | ------------------------------- |
| `home-small.txt`  | Logo for terminals <15 rows     |
| `home-medium.txt` | Logo for terminals ~15-30 rows  |
| `home-large.txt`  | Logo for terminals >30 rows     |
| `side.txt`        | Sidebar icon (default: 11 rows) |

## Requirements

- OpenCode >=1.3.14

## Related

- **[Themes](https://github.com/nelsonaguirre/oc-neo-terminal#themes)** — Color themes: neo-rose, neo-matrix, neo-amber, neo-cyan
- **[Main Repository](https://github.com/nelsonaguirre/oc-neo-terminal)** — Full project with themes + plugin

## License

MIT

