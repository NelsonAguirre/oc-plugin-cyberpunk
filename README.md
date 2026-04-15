# Cyberpunk for OpenCode

A Cyberpunk personality matrix for OpenCode — holographic scanlines, neon themes, neural effects, and a multi-agent dashboard.

This is a **monorepo** containing both the plugin (functionality) and themes (visual styles).

## Structure

```
oc-cyberpunk/
├── packages/
│   ├── plugin/              # oc-plugin-cyberpunk - Visual effects & commands
│   └── themes/
│       └── cyberpunk-rose/  # oc-theme-cyberpunk-rose - Color theme
```

## Installation

### Quick Start (Recommended)

Install both the theme and plugin:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "cyberpunk-rose",
  "plugin": ["oc-plugin-cyberpunk"]
}
```

### Plugin Only

If you want the cyberpunk effects with a different theme:

```json
{
  "plugin": ["oc-plugin-cyberpunk"]
}
```

### Theme Only

If you just want the cyberpunk-rose colors without effects:

```json
{
  "theme": "cyberpunk-rose"
}
```

## Packages

### Plugin (`packages/plugin/`)

The plugin provides:
- **Holographic Scanlines**: Retro-futuristic CRT effect
- **Neural Command**: `/neural` triggers a pulsating brain animation
- **Vignette Effect**: Dark corners for immersive focus
- **Side Panel**: NEXUS-style monitoring dashboard
- **Customizable Brand**: Configure your own ASCII art and brand name

See [packages/plugin/README.md](packages/plugin/README.md) for plugin-specific docs.

### Theme (`packages/themes/cyberpunk-rose/`)

The theme provides:
- **Cyberpunk Rose**: Neon pink/magenta accents on dark void background
- **Syntax Highlighting**: Custom colors for code
- **UI Tokens**: Consistent color scheme across the interface

See [packages/themes/cyberpunk-rose/README.md](packages/themes/cyberpunk-rose/README.md) for theme details.

## Future Themes

Additional themes planned:
- `cyberpunk-cyan` - Electric blue accents
- `cyberpunk-amber` - Vintage amber phosphor
- `cyberpunk-matrix` - Green code rain style

## Development

This repo uses npm workspaces. To install dependencies:

```bash
npm install
```

To work on a specific package:

```bash
cd packages/plugin
# or
cd packages/themes/cyberpunk-rose
```

## License

MIT
