/** @jsxImportSource @opentui/solid */
import { useKeyboard } from "@opentui/solid"
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import { createMemo, createSignal } from "solid-js"
import {
  buildOptions,
  rows,
  settingByField,
  type Field,
  type NumberField,
  type SelectableField,
  type SettingsState,
  type ToggleField,
} from "./settings-state"

type Api = Parameters<TuiPlugin>[0]

export type { Field, NumberField, SelectableField, SettingsState, ToggleField }
export { buildOptions, createSettingKey, rows, settingByField } from "./settings-state"

export const SettingsDialog = (props: {
  api: Api
  value: () => SettingsState
  flip: (key: ToggleField) => void
  tune: (key: NumberField, dir: -1 | 1) => void
  reset: () => void
}) => {
  const [cur, setCur] = createSignal<SelectableField>(rows[0]?.key ?? "scan")
  const theme = createMemo(() => props.api.theme.current)

  const current = createMemo(() => {
    const c = cur()
    if (c === "__reset") return undefined
    return settingByField[c] ?? rows[0]
  })
  const options = createMemo(() => buildOptions(props.value()))

  const showResetConfirm = () => {
    props.api.ui.dialog.replace(() => (
      <props.api.ui.DialogConfirm
        title="Reset to defaults"
        message="Restore all settings to their default values?"
        onConfirm={() => {
          try {
            props.reset()
          } catch (err) {
            // Log error but still replace dialog to avoid stranding user
            console.error("Reset failed:", err)
          }
          // Always replace dialog regardless of reset success/failure
          props.api.ui.dialog.replace(() => (
            <SettingsDialog
              api={props.api}
              value={props.value}
              flip={props.flip}
              tune={props.tune}
              reset={props.reset}
            />
          ))
        }}
        onCancel={() => {
          props.api.ui.dialog.replace(() => (
            <SettingsDialog
              api={props.api}
              value={props.value}
              flip={props.flip}
              tune={props.tune}
              reset={props.reset}
            />
          ))
        }}
      />
    ))
  }

  useKeyboard((evt) => {
    const item = current()
    if (!item) {
      if (evt.name === "space" || evt.name === "enter") {
        evt.preventDefault()
        evt.stopPropagation()
        showResetConfirm()
      }
      return
    }

    if (evt.name === "space" && item.kind === "toggle") {
      evt.preventDefault()
      evt.stopPropagation()
      props.flip(item.key)
      return
    }

    if (evt.name !== "left" && evt.name !== "right") return
    evt.preventDefault()
    evt.stopPropagation()
    if (item.kind === "toggle") {
      props.flip(item.key)
      return
    }
    props.tune(item.key, evt.name === "left" ? -1 : 1)
  })

  return (
    <box flexDirection="column">
      <props.api.ui.DialogSelect
        title="Neo settings"
        placeholder="Filter settings"
        options={options()}
        current={cur()}
        onMove={(item) => setCur(item.value as SelectableField)}
        onSelect={(item) => {
          if (item.value === "__reset") {
            showResetConfirm()
            return
          }
          setCur(item.value as SelectableField)
          const next = settingByField[item.value as Field]
          if (next?.kind === "toggle") {
            props.flip(next.key)
          }
        }}
      />
      <box paddingRight={2} paddingLeft={4} flexDirection="row" gap={2} paddingTop={1} paddingBottom={1} flexShrink={0}>
        <text>
          <span style={{ fg: theme().text }}>
            <b>toggle</b>{" "}
          </span>
          <span style={{ fg: theme().textMuted }}>space enter left/right</span>
        </text>
        <text>
          <span style={{ fg: theme().text }}>
            <b>adjust</b>{" "}
          </span>
          <span style={{ fg: theme().textMuted }}>left/right</span>
        </text>
      </box>
    </box>
  )
}
