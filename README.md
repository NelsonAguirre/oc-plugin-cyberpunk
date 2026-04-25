# Neo-Terminal for OpenCode

A Neo-terminal personality matrix for OpenCode — CRT scanlines, retro-futuristic themes, neural effects, and a multi-agent dashboard.

<img src="assets/demo-home.gif" alt="Neo-Terminal home screen" width="800">

## Features

### Neural Command

Type `/neural` to trigger a pulsating brain animation with glitch effects:

<img src="assets/demo-neural.gif" alt="Neural command" width="800">

### Sidebar Dashboard

NEXUS-style monitoring dashboard with custom ASCII art sidebar:

<img src="assets/demo-session-side.gif" alt="Sidebar dashboard" width="800">

_Sidebar ASCII based on [plugin-gentleman](https://github.com/IrrealV/plugin-gentleman) by IrrealV._

## Themes

Four themes with distinct multi-color palettes — each syntax role (keywords, functions, strings, etc.) has its own color for instant visual parsing.

### neo-rose (default)

Neon pink + cyan + violet accents on dark void.

![#ff4da6](https://img.shields.io/badge/-ff4da6-ff4da6?style=flat-square) ![#00f0ff](https://img.shields.io/badge/-00f0ff-00f0ff?style=flat-square) ![#bd34fe](https://img.shields.io/badge/-bd34fe-bd34fe?style=flat-square) ![#fcee0a](https://img.shields.io/badge/-fcee0a-fcee0a?style=flat-square) ![#39ff14](https://img.shields.io/badge/-39ff14-39ff14?style=flat-square)

<img src="assets/demo-session-rose.gif" alt="neo-rose theme" width="800">

### neo-matrix

Classic green with teal, lime neon, and violet accents.

![#20C20E](https://img.shields.io/badge/-20C20E-20C20E?style=flat-square) ![#00D4AA](https://img.shields.io/badge/-00D4AA-00D4AA?style=flat-square) ![#AAFF00](https://img.shields.io/badge/-AAFF00-AAFF00?style=flat-square) ![#7C3AED](https://img.shields.io/badge/-7C3AED-7C3AED?style=flat-square)

<img src="assets/demo-session-matrix.gif" alt="neo-matrix theme" width="800">

### neo-amber

Vintage amber phosphor with gold, coral, and olive accents.

![#FFB000](https://img.shields.io/badge/-FFB000-FFB000?style=flat-square) ![#FFD700](https://img.shields.io/badge/-FFD700-FFD700?style=flat-square) ![#FF6B35](https://img.shields.io/badge/-FF6B35-FF6B35?style=flat-square) ![#BADA55](https://img.shields.io/badge/-BADA55-BADA55?style=flat-square)

<img src="assets/demo-session-amber.gif" alt="neo-amber theme" width="800">

### neo-cyan

Futuristic cyan with electric blue and magenta accents.

![#00F0FF](https://img.shields.io/badge/-00F0FF-00F0FF?style=flat-square) ![#3B82F6](https://img.shields.io/badge/-3B82F6-3B82F6?style=flat-square) ![#2DD4BF](https://img.shields.io/badge/-2DD4BF-2DD4BF?style=flat-square) ![#D946EF](https://img.shields.io/badge/-D946EF-D946EF?style=flat-square)

<img src="assets/demo-session-cyan.gif" alt="neo-cyan theme" width="800">

## Installation

### Quick Start

The fastest way to get the full experience — plugin + theme together:

1. Install the plugin via OpenCode CLI:

```bash
opencode plugin @nelsonaguirre/oc-plugin-neo-terminal -g
```

2. Install a theme by copying or symlinking the JSON file:

```bash
cp /path/to/oc-neo-terminal/packages/themes/neo-rose.json ~/.config/opencode/themes/
```

3. Configure the theme in your `tui.json`:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "neo-rose",                                <- Set Theme
  "plugin": ["@nelsonaguirre/oc-plugin-neo-terminal"]
}
```

### Plugin Only

If you want the neo-terminal effects with a different theme:

```bash
opencode plugin @nelsonaguirre/oc-plugin-neo-terminal -g
```

```json
{
  "plugin": ["@nelsonaguirre/oc-plugin-neo-terminal"]
}
```

### Local Installation (per-project)

To install the plugin only for the current project:

```bash
opencode plugin @nelsonaguirre/oc-plugin-neo-terminal
```

### Themes Only

If you only want the themes without plugin effects, copy or symlink the theme JSONs to your OpenCode themes directory:

```bash
# Copy
cp /path/to/oc-neo-terminal/packages/themes/neo-rose.json ~/.config/opencode/themes/
```

Then configure the theme in your `tui.json`:

```json
{
  "theme": "neo-rose"
}
```

## Configuration

The plugin supports the following options in `tui.json`:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "neo-rose",
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

| Option           | Type      | Default | Description                                              |
| ---------------- | --------- | ------- | -------------------------------------------------------- |
| `enabled`        | `boolean` | `true`  | Enable/disable the plugin entirely                       |
| `scanlines`      | `boolean` | `true`  | Show holographic CRT scanline effect                     |
| `scanline_speed` | `number`  | `0.008` | Animation speed of scanlines (0-1, higher = faster)      |
| `vignette`       | `number`  | `0.65`  | Corner darkness intensity (0-1, higher = darker corners) |
| `sidebar`        | `boolean` | `true`  | Show the NEXUS-style side panel with system metrics      |

### Examples

**Disable scanlines but keep vignette and sidebar:**

```json
{
  "plugin": [
    [
      "@nelsonaguirre/oc-plugin-neo-terminal",
      {
        "scanlines": false,
        "vignette": 0.8
      }
    ]
  ]
}
```

**Minimal mode (no effects, no sidebar):**

```json
{
  "plugin": [
    [
      "@nelsonaguirre/oc-plugin-neo-terminal",
      {
        "scanlines": false,
        "vignette": 0,
        "sidebar": false
      }
    ]
  ]
}
```

**Fast scanlines with strong vignette:**

```json
{
  "plugin": [
    [
      "@nelsonaguirre/oc-plugin-neo-terminal",
      {
        "scanline_speed": 0.02,
        "vignette": 0.9
      }
    ]
  ]
}
```

## Customization

You can customize the brand name and ASCII art. Here's an example using **"TheGlentleman"** as the brand name with custom ASCII art:

<img src="assets/demo-home-custom.png" alt="Custom branding example showing TheGlentleman" width="800">

_Home ASCII based on [Gentleman.Dots](https://github.com/Gentleman-Programming/Gentleman.Dots) by Gentleman Programming._

> **Note:** This customization works regardless of how the plugin was installed — globally (`-g`), locally, or via direct path. The config is resolved at runtime by OpenCode based on where you opened it, not how the plugin was installed.

### Config Locations

The plugin supports two config levels — **local** (per-project) and **global** (user-wide):

| Level      | Path                                        | Scope                    |
| ---------- | ------------------------------------------- | ------------------------ |
| **Local**  | `<project-root>/.opencode/oc-neo-terminal/` | Only the current project |
| **Global** | `~/.config/opencode/oc-neo-terminal/`       | All projects             |

Local config always takes priority over global. Each asset (brand name, ASCII files) resolves independently.

### Resolution Hierarchy

For each asset, the plugin resolves in this order:

1. **Local specific file** — `<project>/.opencode/oc-neo-terminal/<file>`
2. **Local `home` fallback** — `<project>/.opencode/oc-neo-terminal/<brand.json:home>` (for home size variants)
3. **Global specific file** — `~/.config/opencode/oc-neo-terminal/<file>`
4. **Global `home` fallback** — `~/.config/opencode/oc-neo-terminal/<brand.json:home>`
5. **Built-in default** — the NEXUS ASCII art hardcoded in the plugin

This means you can define a global baseline and override only specific assets per project.

### `brand.json`

Create a `brand.json` in either config directory:

```json
{
  "name": "CYBER-1",
  "home": "home.txt"
}
```

- **`name`** — Brand name displayed in the UI (max 20 chars). Defaults to `NEXUS`.
- **`home`** — Fallback ASCII art file for all home sizes when a specific size file doesn't exist.

Local `brand.json` completely overrides global `brand.json` — no merging.

### ASCII Art Files

Place `.txt` files in either config directory. Local files override global files of the same name.

| File              | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| `home-small.txt`  | Logo for terminals smaller than ~15 rows (default: 5 rows)     |
| `home-medium.txt` | Logo for medium terminals ~15-30 rows (default: 31 rows)       |
| `home-large.txt`  | Logo for large terminals >30 rows (default: 29 rows)           |
| `side.txt`        | Sidebar icon that appears on the left panel (default: 11 rows) |

### Example: Global baseline + Project override

```
~/.config/opencode/oc-neo-terminal/   ← applies to all projects
├── brand.json                         ← global brand name
├── home.txt                           ← fallback for all sizes
└── side.txt                           ← global sidebar art

<project>/.opencode/oc-neo-terminal/  ← only this project
└── side.txt                           ← overrides global side.txt only
```

In this example, the project uses the global brand name and home art, but its own `side.txt`.

## Acknowledgments

This project builds upon the foundation of **[oc-plugin-vault-tec](https://github.com/kommander/oc-plugin-vault-tec)** by [kommander](https://github.com/kommander) — the base codebase, Fallout ASCII art, and green theme concept that made this possible.

### Custom ASCII Art Credits

- **Home screen example**: Adapted from [Gentleman.Dots](https://github.com/Gentleman-Programming/Gentleman.Dots) by [Gentleman Programming](https://github.com/Gentleman-Programming).
- **Sidebar example**: Adapted from [plugin-gentleman](https://github.com/IrrealV/plugin-gentleman) by [IrrealV](https://github.com/IrrealV).

## License

MIT
