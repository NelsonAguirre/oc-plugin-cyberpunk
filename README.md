# Neo-Terminal for OpenCode

A Neo-terminal personality matrix for OpenCode — CRT scanlines, retro-futuristic themes, neural effects, and a multi-agent dashboard.

This is a **monorepo** containing both the plugin (functionality) and themes (visual styles).

## Structure

```
oc-neo-terminal/
├── packages/
│   ├── plugin/              # oc-plugin-neo-terminal - Visual effects & commands
│   └── themes/
│       ├── cyberpunk-rose/  # Pink/magenta theme
│       ├── cyberpunk-matrix/# Green Matrix theme
│       ├── cyberpunk-amber/ # Vintage amber phosphor
│       └── cyberpunk-cyan/  # Futuristic AI Shell cyan
```

## Installation

### Step 1: Clone the repository

```bash
cd ~/.config/opencode
git clone https://github.com/NelsonAguirre/oc-neo-terminal.git
```

Or clone anywhere and use the full path.

### Step 2: Install the themes

Symlink or copy the theme files to the OpenCode themes directory:

```bash
# Create symlinks (recommended for development)
ln -s ~/Documents/repos/oc-neo-terminal/packages/themes/*/themes/*.json ~/.config/opencode/themes/

# Or copy them
cp packages/themes/*/themes/*.json ~/.config/opencode/themes/
```

### Step 3: Configure OpenCode

Edit your `~/.config/opencode/tui.json`:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "cyberpunk-rose",
  "plugin": ["~/.config/opencode/oc-neo-terminal/packages/plugin"]
}
```

### Quick Start (Recommended)

Both theme and plugin together:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "cyberpunk-rose",
  "plugin": ["~/.config/opencode/oc-neo-terminal/packages/plugin"]
}
```

### Plugin Only

If you want the neo-terminal effects with a different theme:

```json
{
  "plugin": ["~/.config/opencode/oc-neo-terminal/packages/plugin"]
}
```

### Theme Only

If you just want the themes without effects:

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

### Themes (`packages/themes/`)

#### Available Themes

- **`cyberpunk-rose`** (default) - Neon pink/magenta accents on dark void
- **`cyberpunk-matrix`** - Green code rain Matrix style
- **`cyberpunk-amber`** - Vintage amber phosphor terminal
- **`cyberpunk-cyan`** - Futuristic AI Shell cyan/blue style

See individual theme READMEs for details.

## Customization

You can customize the brand name and ASCII art by creating files in `.opencode/oc-neo-terminal/` within your project:

- `brand.json` - `{ "name": "CYBER-1" }`
- `home-small.txt` - Logo for terminals smaller than ~15 rows (default: 5 rows)
- `home-medium.txt` - Logo for medium terminals ~15-30 rows (default: 31 rows)  
- `home-large.txt` - Logo for large terminals >30 rows (default: 29 rows)
- `side.txt` - Sidebar icon that appears on the left panel (default: 11 rows)

The plugin automatically selects the appropriate logo size based on terminal height. If a size file doesn't exist, it falls back to the next smaller size. If none exist, uses built-in defaults.

If files don't exist, the plugin uses the default NEXUS branding.

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

## Development Workflow with Symlinks

For development, create symlinks so changes are reflected instantly:

```bash
# Symlink the repo
cd ~/.config/opencode
ln -s ~/Documents/repos/oc-neo-terminal oc-neo-terminal-dev

# Symlink themes
ln -s ~/Documents/repos/oc-neo-terminal/packages/themes/*/themes/*.json themes/
```

Then in `tui.json`:

```json
{
  "theme": "cyberpunk-rose",
  "plugin": ["~/.config/opencode/oc-neo-terminal-dev/packages/plugin"]
}
```

## License

MIT
