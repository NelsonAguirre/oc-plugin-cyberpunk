# Cyberpunk Plugin for OpenCode

A Cyberpunk personality matrix that transforms your coding terminal into a NEXUS neural interface — holographic scanlines, neon color overlays, neural effects with `/neural` command, and a multi-agent dashboard that monitors your context, generation, and costs in real time.

**Note:** This plugin is now theme-agnostic. Install it with the companion theme for the full cyberpunk experience.

## Installation

### With Theme (Recommended)

For the complete cyberpunk-rose experience:

```json
{
  "plugin": ["oc-theme-cyberpunk-rose", "oc-plugin-cyberpunk"]
}
```

### Plugin Only

The plugin works with any dark theme:

```json
{
  "plugin": ["oc-plugin-cyberpunk"]
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

You can customize the brand name and ASCII art by creating files in `.opencode/oc-plugin-cyberpunk/`:

### Brand Name

Create `brand.json`:
```json
{ "name": "CYBER-1" }
```

### ASCII Art

Create text files with your custom ASCII art:
- `home-small.txt` - Small logo (~28 chars wide, 5 lines)
- `home-medium.txt` - Medium logo (~104 chars wide, 31 lines)
- `home-large.txt` - Large logo (~152 chars wide, 29 lines)
- `side.txt` - Sidebar icon (~11 lines)

Each file should contain one line of the ASCII art per line in the file.

### Example

```
.opencode/oc-plugin-cyberpunk/
├── brand.json
├── home-small.txt
├── home-medium.txt
├── home-large.txt
└── side.txt
```

If these files don't exist, the plugin uses the default NEXUS branding.

## Themes

This plugin is theme-agnostic and works with any OpenCode theme. For the designed cyberpunk-rose experience, install the companion theme:

- `oc-theme-cyberpunk-rose` - Dark theme with rose/magenta accents

Future themes will be compatible with this plugin:
- `oc-theme-cyberpunk-cyan` (planned)
- `oc-theme-cyberpunk-amber` (planned)
