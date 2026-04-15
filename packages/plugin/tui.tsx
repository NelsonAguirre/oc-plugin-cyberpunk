// @ts-nocheck
/** @jsxImportSource @opentui/solid */
import { TargetChannel, VignetteEffect } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import type { TuiPlugin, TuiPluginModule, TuiSlotPlugin, TuiThemeCurrent } from "@opencode-ai/plugin/tui"
import { Show, createMemo, createSignal } from "solid-js"
import {
  SettingsDialog,
  createSettingKey,
  settingByField,
  type Field,
  type NumberField,
  type SettingsState,
  type ToggleField,
} from "./settings-dialog"
import { NexusContext } from "./context"
import { createNeuralCommand } from "./neural-command"
import { Side } from "./side"
import { loadBrandConfig, DEFAULT_BRAND, type BrandConfig } from "./brand-config"

const id = "cyberpunk"

// Brand configuration loaded from external files or defaults
let brandConfig: BrandConfig = DEFAULT_BRAND

// Access brand config art arrays (either external or default)
// Fallback to default if brandConfig is not yet initialized
const getHome = () => brandConfig?.art?.small || DEFAULT_BRAND.art.small
const getHome1 = () => brandConfig?.art?.medium || DEFAULT_BRAND.art.medium
const getHome2 = () => brandConfig?.art?.large || DEFAULT_BRAND.art.large

const width = (list: string[]) => {
  return Math.max(...list.map((line) => line.length))
}

type Cfg = {
  enabled: boolean
} & SettingsState

type Api = Parameters<TuiPlugin>[0]

const settingKey = createSettingKey(id)

const rec = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return
  return Object.fromEntries(Object.entries(value))
}

const pick = (value: unknown, fallback: string) => {
  if (typeof value !== "string") return fallback
  if (!value.trim()) return fallback
  return value
}

const bool = (value: unknown, fallback: boolean) => {
  if (typeof value !== "boolean") return fallback
  return value
}

const num = (value: unknown, fallback: number) => {
  if (typeof value !== "number") return fallback
  return value
}

const cfg = (opts: Record<string, unknown> | undefined): Cfg => {
  return {
    enabled: bool(opts?.enabled, true),
    scan: bool(opts?.scanlines, true),
    scanSpeed: Math.max(0, num(opts?.scanline_speed, 0.008)),
    vignette: Math.max(0, num(opts?.vignette, 0.65)),
    sidebar: bool(opts?.sidebar, true),
  }
}

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

const withKV = (api: Api, value: Cfg): Cfg => {
  return {
    ...value,
    scan: bool(api.kv.get(settingKey.scan, value.scan), value.scan),
    scanSpeed: Math.max(0, num(api.kv.get(settingKey.scanSpeed, value.scanSpeed), value.scanSpeed)),
    vignette: clamp(num(api.kv.get(settingKey.vignette, value.vignette), value.vignette), 0, 1),
    sidebar: bool(api.kv.get(settingKey.sidebar, value.sidebar), value.sidebar),
  }
}

const Home = (props: { theme: TuiThemeCurrent }) => {
  const dim = useTerminalDimensions()
  const [gap, setGap] = createSignal({
    width: 0,
    height: 0,
  })
  const logo = createMemo(() => {
    const term = dim()
    const chrome = gap()
    const h = Math.max(0, term.height - chrome.height)
    const w = Math.max(0, term.width - chrome.width)
    const home2Art = getHome2()
    const home1Art = getHome1()
    const homeArt = getHome()
    if (h >= home2Art.length && w >= width(home2Art)) return home2Art
    if (h >= home1Art.length && w >= width(home1Art)) return home1Art
    return homeArt
  })

  return (
    <box
      onSizeChange={function () {
        const term = dim()
        const own = {
          width: this.width,
          height: this.height,
        }
        const next = {
          width: Math.max(0, term.width - own.width),
          height: Math.max(0, term.height - own.height),
        }
        const wide = own.width >= width(getHome1())
        setGap((prev) => {
          const width = wide ? (prev.width > 0 ? Math.min(prev.width, next.width) : next.width) : prev.width
          const height = prev.height > 0 ? Math.min(prev.height, next.height) : next.height
          if (prev.width === width && prev.height === height) return prev
          return {
            width,
            height,
          }
        })
      }}
      flexDirection="column"
      alignItems="center"
    >
      {(() => {
        const lines = logo()
        const big = lines.length > 5 // big if not the small 5-line logo
        return lines.map((line, i) => (
          <text fg={big ? props.theme.text : i < 2 ? props.theme.textMuted : props.theme.text}>{line}</text>
        ))
      })()}
    </box>
  )
}

const slot = (api: Api, value: () => Cfg): TuiSlotPlugin[] => {
  return [
    {
      slots: {
        home_logo(ctx) {
          return <Home theme={ctx.theme.current} />
        },
        home_prompt(ctx, value) {
          type Prompt = (props: {
            workspaceID?: string
            hint?: JSX.Element
            right?: JSX.Element
            placeholders?: {
              normal?: string[]
              shell?: string[]
            }
          }) => JSX.Element
          type Slot = (props: { name: string } & Record<string, unknown>) => JSX.Element | null
          if (!("Prompt" in api.ui)) return null
          if (!("Slot" in api.ui)) return null
          const Prompt = api.ui.Prompt as Prompt
          const Slot = api.ui.Slot as Slot
          const theme = ctx.theme.current
          const Hint = (
            <box flexShrink={0} flexDirection="row" gap={1}>
              <text fg={theme.textMuted}>
                <span style={{ fg: theme.primary }}>{brandConfig.name}</span> Terminal
              </text>
            </box>
          )
          return (
            <Prompt
              workspaceID={value.workspace_id}
              hint={Hint}
              right={
                <box flexDirection="row" gap={1}>
                  <Slot name="home_prompt_right" workspace_id={value.workspace_id} />
                </box>
              }
              placeholders={undefined}
            />
          )
        },
        home_prompt_right(ctx) {
          return (
            <text fg={ctx.theme.current.textMuted}>
              <span style={{ fg: ctx.theme.current.primary }}>{brandConfig.name}</span> ready
            </text>
          )
        },
        session_prompt_right(ctx, value) {
          return (
            <text fg={ctx.theme.current.textMuted}>
              {value.session_id.slice(0, 8)}
            </text>
          )
        },
      },
    },
    {
      order: 50,
      slots: {
        sidebar_content(ctx) {
          return (
            <Show when={value().sidebar}>
              <Side theme={ctx.theme.current} sideArt={brandConfig.art.side} />
            </Show>
          )
        },
      },
    },
    {
      order: 51,
      slots: {
        sidebar_content(ctx, input) {
          return (
            <Show when={value().sidebar}>
              <NexusContext theme={ctx.theme.current} api={api} sessionId={input.session_id} brandName={brandConfig.name} />
            </Show>
          )
        },
      },
    },
  ]
}

// Cyberpunk holographic scan effect — multi-band scanlines with CRT depth
const SCAN_BOOST = new Float32Array([1.8, 0, 0, 0, 0, 2.0, 0, 0, 0, 0, 1.9, 0, 0, 0, 0, 1])

const BAND_SIZES = new Int32Array([5, 8, 6, 4])
const BAND_BOOSTS = new Float32Array([0.38, 0.27, 0.32, 0.2])
const BAND_PHASES = new Float32Array([0, 0.25, 0.55, 0.8])
const MAX_ACTIVE_ROWS = 28

const createBandWeights = () => {
  const count = BAND_SIZES.length
  const weights = new Array<Float32Array>(count)
  for (let band = 0; band < count; band++) {
    const size = BAND_SIZES[band]
    const half = size * 0.5
    const boost = BAND_BOOSTS[band]
    const rowWeights = new Float32Array(size)
    for (let i = 0; i < size; i++) {
      const dist = Math.abs(i - half) / half
      rowWeights[i] = (1 - dist * dist) * boost
    }
    weights[band] = rowWeights
  }
  return weights
}

const scan = (v: number, speed: number, enabled: boolean) => {
  const vignette = v > 0 ? new VignetteEffect(v) : undefined
  const bandWeights = createBandWeights()

  let time = 0
  let cachedWidth = -1
  let cachedHeight = -1
  let disposed = false

  let rowBoost = new Float32Array(0)
  const activeRows = new Int32Array(MAX_ACTIVE_ROWS)
  const rowBaseOffset = new Int32Array(MAX_ACTIVE_ROWS)
  let cellMask = new Float32Array(0)

  const ensureCache = (width: number, height: number) => {
    if (width === cachedWidth && height === cachedHeight) return

    cachedWidth = width
    cachedHeight = height
    rowBoost = new Float32Array(height)
    cellMask = new Float32Array(width * MAX_ACTIVE_ROWS * 3)

    for (let row = 0; row < MAX_ACTIVE_ROWS; row++) {
      const base = row * width * 3
      rowBaseOffset[row] = base
      let idx = base
      for (let x = 0; x < width; x++) {
        cellMask[idx] = x
        idx += 3
      }
    }
  }

  const dispose = () => {
    disposed = true
  }

  return Object.assign((buf: Parameters<VignetteEffect["apply"]>[0], dt: number) => {
    if (disposed) return
    if (enabled) {
      const width = buf.width
      const height = buf.height

      if (width > 0 && height > 0) {
        ensureCache(width, height)
        rowBoost.fill(0)

        time += dt
        const basePhase = (time * speed) / height

        // Multi-band scanline sweep
        for (let band = 0; band < BAND_SIZES.length; band++) {
          const size = BAND_SIZES[band]
          const weights = bandWeights[band]

          let phase = basePhase + BAND_PHASES[band]
          phase -= Math.floor(phase)
          const start = Math.floor((1 - phase) * height)

          for (let i = 0; i < size; i++) {
            let y = start + i
            if (y >= height) y %= height
            rowBoost[y] += weights[i]
          }
        }

        let rowCount = 0
        for (let y = 0; y < height; y++) {
          if (rowBoost[y] <= 0) continue
          activeRows[rowCount++] = y
        }

        for (let row = 0; row < MAX_ACTIVE_ROWS; row++) {
          const y = row < rowCount ? activeRows[row] : 0
          const strength = row < rowCount ? rowBoost[y] : 0
          let idx = rowBaseOffset[row] + 1
          for (let x = 0; x < width; x++) {
            cellMask[idx] = y
            cellMask[idx + 1] = strength
            idx += 3
          }
        }

        buf.colorMatrix(SCAN_BOOST, cellMask, 1.0, TargetChannel.Both)

        // Horizontal glitch — more frequent and visible
        const glitchRoll = (time * 0.008) % 1
        if (glitchRoll > 0.993) {
          const chars = buf.buffers.char
          const fg = buf.buffers.fg
          const glitchY = Math.floor(Math.random() * height)
          const glitchShift = Math.floor(Math.random() * 4) + 1
          const rowStart = glitchY * width

          for (let x = width - 1; x >= glitchShift; x--) {
            const di = rowStart + x
            const si = di - glitchShift
            chars[di] = chars[si]
            const dc = di * 4
            const sc = si * 4
            fg[dc] = fg[sc]
            fg[dc + 1] = fg[sc + 1]
            fg[dc + 2] = fg[sc + 2]
            fg[dc + 3] = fg[sc + 3]
          }
        }
      }
    }

    if (vignette) {
      vignette.apply(buf)
    }
  }
}

const tui: TuiPlugin = async (api, options) => {
  // Load brand configuration from external files or use defaults
  try {
    const workspaceRoot = process.cwd()
    brandConfig = loadBrandConfig(workspaceRoot)
  } catch {
    // Keep default brand config if loading fails
  }

  const boot = cfg(rec(options))
  if (!boot.enabled) return

  const [value, setValue] = createSignal(withKV(api, boot))

  const write = (key: Field, next: unknown) => {
    api.kv.set(settingKey[key], next)
  }

  let post: ReturnType<typeof scan> | undefined
  let live = false
  const applyScan = () => {
    if (post) {
      api.renderer.removePostProcessFn(post)
      post = undefined
    }

    const state = value()
    const hasVignette = state.vignette > 0
    if (!state.scan && !hasVignette) {
      if (live) {
        api.renderer.dropLive()
        api.renderer.targetFps = 0
        api.renderer.maxFps = 0
        live = false
      }
      return
    }

    post = scan(state.vignette, state.scanSpeed, state.scan)
    api.renderer.addPostProcessFn(post)

    if (state.scan && !live) {
      api.renderer.requestLive()
      api.renderer.targetFps = 30
      api.renderer.maxFps = 30
      live = true
    }

    if (!state.scan && live) {
      api.renderer.dropLive()
      api.renderer.targetFps = 0
      api.renderer.maxFps = 0
      live = false
    }
  }

  const update = (key: Field, next: unknown) => {
    const prev = value()
    if (prev[key] === next) return
    const state = {
      ...prev,
      [key]: next,
    }
    setValue(state)
    write(key, state[key])

    if (key === "scan" || key === "scanSpeed" || key === "vignette") {
applyScan()
    }
  }

  const flip = (key: ToggleField) => {
    update(key, !value()[key])
  }

  const tune = (key: NumberField, dir: -1 | 1) => {
    const item = settingByField[key]
    if (!item || item.kind !== "number") return
    let next = value()[key] + (item.step ?? 1) * dir
    if (typeof item.min === "number") next = Math.max(item.min, next)
    if (typeof item.max === "number") next = Math.min(item.max, next)
    next = Number(next.toFixed(item.digits ?? 3))
    update(key, next)
  }

  const showSettings = () => {
    api.ui.dialog.replace(() => <SettingsDialog api={api} value={value} flip={flip} tune={tune} />)
  }

  applyScan()

  const neural = createNeuralCommand(api)

  // Register commands and slots, store disposables for cleanup
  const commandDisposable = api.command.register(() => [
    {
      title: "Cyberpunk settings",
      value: "cyberpunk.settings",
      category: "System",
      onSelect() {
        showSettings()
      },
    },
    neural.command,
  ])

  const slotDisposables: (() => void)[] = []
  for (const item of slot(api, value)) {
    const disposable = api.slots.register(item)
    if (disposable) {
      slotDisposables.push(disposable)
    }
  }

  api.lifecycle.onDispose(async () => {
    neural.dispose()
    if (post) {
      api.renderer.removePostProcessFn(post)
    }
    if (live) {
      api.renderer.dropLive()
    }
    // Cleanup slots
    for (const dispose of slotDisposables) {
      dispose()
    }
    // Cleanup commands
    if (commandDisposable) {
      commandDisposable()
    }
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
