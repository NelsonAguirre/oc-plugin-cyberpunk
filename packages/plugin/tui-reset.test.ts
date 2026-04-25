import { describe, it, expect, vi } from "vitest"
import { createReset } from "./tui-reset"
import type { Field, SettingsState } from "./settings-state"

describe("createReset", () => {
  it("writes default values to KV for all 4 settings (scan, scanSpeed, vignette, sidebar)", () => {
    const kvSet = vi.fn()
    const api = { kv: { set: kvSet } }
    const settingKey: Record<Field, string> = {
      scan: "test.setting.scanlines",
      scanSpeed: "test.setting.scanline_speed",
      vignette: "test.setting.vignette",
      sidebar: "test.setting.sidebar",
    }
    const boot: SettingsState = {
      scan: true,
      scanSpeed: 0.008,
      vignette: 0.65,
      sidebar: true,
    }
    const setValue = vi.fn()
    const applyScan = vi.fn()

    const reset = createReset(api, settingKey, boot, setValue, applyScan)
    reset()

    expect(kvSet).toHaveBeenCalledTimes(4)
    expect(kvSet).toHaveBeenCalledWith("test.setting.scanlines", true)
    expect(kvSet).toHaveBeenCalledWith("test.setting.scanline_speed", 0.008)
    expect(kvSet).toHaveBeenCalledWith("test.setting.vignette", 0.65)
    expect(kvSet).toHaveBeenCalledWith("test.setting.sidebar", true)
  })

  it("updates signal with boot values and calls applyScan()", () => {
    const kvSet = vi.fn()
    const api = { kv: { set: kvSet } }
    const settingKey: Record<Field, string> = {
      scan: "test.setting.scanlines",
      scanSpeed: "test.setting.scanline_speed",
      vignette: "test.setting.vignette",
      sidebar: "test.setting.sidebar",
    }
    const boot: SettingsState = {
      scan: false,
      scanSpeed: 0.004,
      vignette: 0.3,
      sidebar: false,
    }
    const setValue = vi.fn()
    const applyScan = vi.fn()

    const reset = createReset(api, settingKey, boot, setValue, applyScan)
    reset()

    expect(setValue).toHaveBeenCalledTimes(1)
    expect(setValue).toHaveBeenCalledWith({ scan: false, scanSpeed: 0.004, vignette: 0.3, sidebar: false })
    expect(applyScan).toHaveBeenCalledTimes(1)
  })

  it("overwrites KV values even when defaults differ from current state", () => {
    const kvSet = vi.fn()
    const api = { kv: { set: kvSet } }
    const settingKey: Record<Field, string> = {
      scan: "test.setting.scanlines",
      scanSpeed: "test.setting.scanline_speed",
      vignette: "test.setting.vignette",
      sidebar: "test.setting.sidebar",
    }
    const boot: SettingsState = {
      scan: true,
      scanSpeed: 0.016,
      vignette: 0.9,
      sidebar: false,
    }
    const setValue = vi.fn()
    const applyScan = vi.fn()

    const reset = createReset(api, settingKey, boot, setValue, applyScan)
    reset()

    expect(kvSet).toHaveBeenCalledWith("test.setting.scanlines", true)
    expect(kvSet).toHaveBeenCalledWith("test.setting.scanline_speed", 0.016)
    expect(kvSet).toHaveBeenCalledWith("test.setting.vignette", 0.9)
    expect(kvSet).toHaveBeenCalledWith("test.setting.sidebar", false)
  })

  it("throws before anyKV writes if second write fails (no partial state)", () => {
    const error = new Error("KV write failure")
    let callCount = 0
    const kvSet = vi.fn(() => {
      callCount++
      if (callCount === 2) throw error
    })
    const api = { kv: { set: kvSet } }
    const settingKey: Record<Field, string> = {
      scan: "test.setting.scanlines",
      scanSpeed: "test.setting.scanline_speed",
      vignette: "test.setting.vignette",
      sidebar: "test.setting.sidebar",
    }
    const boot: SettingsState = {
      scan: true,
      scanSpeed: 0.008,
      vignette: 0.65,
      sidebar: true,
    }
    const setValue = vi.fn()
    const applyScan = vi.fn()

    const reset = createReset(api, settingKey, boot, setValue, applyScan)
    expect(reset).toThrow(error)

    // setValue and applyScan should NOT be called on failure
    expect(setValue).not.toHaveBeenCalled()
    expect(applyScan).not.toHaveBeenCalled()
  })
})
