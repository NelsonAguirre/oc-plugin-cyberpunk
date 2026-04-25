import { describe, it, expect } from "vitest"
import { buildOptions } from "./settings-state"
import type { SettingsState } from "./settings-state"

describe("buildOptions", () => {
  it("appends 'Reset to defaults' as the last option", () => {
    const value: SettingsState = {
      scan: true,
      scanSpeed: 0.008,
      vignette: 0.65,
      sidebar: true,
    }

    const options = buildOptions(value)

    expect(options).toHaveLength(5)
    const last = options[options.length - 1]
    expect(last.title).toBe("Reset to defaults")
    expect(last.value).toBe("__reset")
    expect(last.description).toBe("Restore all settings to their default values")
    expect(last.category).toBe("System")
  })

  it("includes correct footer for toggle and number settings", () => {
    const value: SettingsState = {
      scan: false,
      scanSpeed: 0.004,
      vignette: 0.3,
      sidebar: true,
    }

    const options = buildOptions(value)

    // First 4 are real settings
    expect(options[0].footer).toBe("OFF")
    expect(options[1].footer).toBe("0.004")
    expect(options[2].footer).toBe("0.30")
    expect(options[3].footer).toBe("ON")
    // Reset option has empty footer
    expect(options[4].footer).toBe("")
  })

  it("preserves setting metadata (title, description, category) for all settings", () => {
    const value: SettingsState = {
      scan: true,
      scanSpeed: 0.008,
      vignette: 0.65,
      sidebar: true,
    }

    const options = buildOptions(value)

    expect(options[0].title).toBe("Holographic scan")
    expect(options[0].description).toBe("Multi-band holographic scanlines")
    expect(options[0].category).toBe("Visual")

    expect(options[1].title).toBe("Scan speed")
    expect(options[2].title).toBe("Vignette strength")
    expect(options[3].title).toBe("NEXUS side panel")
  })
})
