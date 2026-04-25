export type SettingsState = {
  scan: boolean
  scanSpeed: number
  vignette: number
  sidebar: boolean
}

export type ToggleField = "scan" | "sidebar"
export type NumberField = "scanSpeed" | "vignette"
export type Field = ToggleField | NumberField
export type SelectableField = Field | "__reset"

type ToggleRow = {
  key: ToggleField
  title: string
  description: string
  category: string
  kind: "toggle"
}

type NumberRow = {
  key: NumberField
  title: string
  description: string
  category: string
  kind: "number"
  step: number
  min?: number
  max?: number
  digits: number
}

type SettingRow = ToggleRow | NumberRow

export const rows: SettingRow[] = [
  {
    key: "scan",
    title: "Holographic scan",
    description: "Multi-band holographic scanlines",
    category: "Visual",
    kind: "toggle",
  },
  {
    key: "scanSpeed",
    title: "Scan speed",
    description: "Animation speed for scanlines",
    category: "Visual",
    kind: "number",
    step: 0.002,
    min: 0,
    digits: 3,
  },
  {
    key: "vignette",
    title: "Vignette strength",
    description: "Screen edge darkening strength",
    category: "Visual",
    kind: "number",
    step: 0.05,
    min: 0,
    max: 1,
    digits: 2,
  },
  {
    key: "sidebar",
    title: "NEXUS side panel",
    description: "Companion art and monitor card",
    category: "Layout",
    kind: "toggle",
  },
]

export const settingByField = Object.fromEntries(rows.map((item) => [item.key, item])) as Record<Field, SettingRow>

export const createSettingKey = (id: string) => {
  return {
    scan: `${id}.setting.scanlines`,
    scanSpeed: `${id}.setting.scanline_speed`,
    vignette: `${id}.setting.vignette`,
    sidebar: `${id}.setting.sidebar`,
  } as const
}

const status = (value: boolean) => {
  return value ? "ON" : "OFF"
}

const metric = (value: SettingsState, row: NumberRow) => {
  return value[row.key].toFixed(row.digits)
}

export const buildOptions = (value: SettingsState) => {
  const base = rows.map((item) => {
    const footer = item.kind === "toggle" ? status(value[item.key]) : metric(value, item as NumberRow)
    return {
      title: item.title,
      value: item.key,
      description: item.description,
      category: item.category,
      footer,
    }
  })
  return [
    ...base,
    {
      title: "Reset to defaults",
      value: "__reset" as const,
      description: "Restore all settings to their default values",
      category: "System",
      footer: "",
    },
  ]
}
