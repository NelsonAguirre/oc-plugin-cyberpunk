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

### Step 1: Clone the repository

```bash
cd ~/.config/opencode
git clone https://github.com/kommander/oc-cyberpunk.git
```

Or clone anywhere and use the full path.

### Step 2: Install the theme

Copy the theme file to the OpenCode themes directory:

```bash
cp packages/themes/cyberpunk-rose/themes/cyberpunk-rose.json ~/.config/opencode/themes/
```

### Step 3: Configure OpenCode

Edit your `~/.config/opencode/tui.json`:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "cyberpunk-rose",
  "plugin": ["~/.config/opencode/oc-cyberpunk/packages/plugin"]
}
```

### Quick Start (Recommended)

Both theme and plugin together:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "cyberpunk-rose",
  "plugin": ["~/.config/opencode/oc-cyberpunk/packages/plugin"]
}
```

### Plugin Only

If you want the cyberpunk effects with a different theme:

```json
{
  "plugin": ["~/.config/opencode/oc-cyberpunk/packages/plugin"]
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

## Customization

You can customize the brand name and ASCII art by creating files in `.opencode/oc-plugin-cyberpunk/` within your project:

- `brand.json` - `{ "name": "CYBER-1" }`
- `home-small.txt` - Small logo ASCII
- `home-medium.txt` - Medium logo ASCII
- `home-large.txt` - Large logo ASCII
- `side.txt` - Sidebar icon ASCII

If files don't exist, the plugin uses the default NEXUS branding.

## Future Themes

Additional themes planned:
- `cyberpunk-cyan` - Electric blue accents
- `cyberpunk-amber` - Vintage amber phosphor
- `cyberpunk-matrix` - Green code rain style

## Development

This is a local monorepo. No npm publish needed.

To work on a specific package:

```bash
cd packages/plugin
# or
cd packages/themes/cyberpunk-rose
```

To update after pulling changes:

```bash
git pull
```

## License

MIT
