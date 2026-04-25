import type { Field, SettingsState } from "./settings-state"

type Api = {
  kv: {
    set: (key: string, value: unknown) => void
  }
}

const FIELDS: Field[] = ["scan", "scanSpeed", "vignette", "sidebar"]

export const createReset = (
  api: Pick<Api, "kv">,
  settingKey: Record<Field, string>,
  boot: SettingsState,
  setValue: (value: SettingsState) => void,
  applyScan: () => void
) => {
  return () => {
    // Collect all writes first so we can validate before committing
    const writes: Array<{ key: string; value: unknown }> = []
    for (const key of FIELDS) {
      writes.push({ key: settingKey[key], value: boot[key] })
    }
    // Execute all writes; if any throws, nothing gets written
    for (const write of writes) {
      api.kv.set(write.key, write.value)
    }
    // Only after all writes succeed, update state
    setValue({ ...boot })
    applyScan()
  }
}
