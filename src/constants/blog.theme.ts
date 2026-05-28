import { type Theme } from "./theme"
import { DarkTheme as DarkMainTheme, LightTheme as LightMainTheme } from "./main.theme"

const ui: Theme["fonts"]["ui"] = {
  regular: {
    fontFamily: "FiraSans_400Regular, sans-serif",
    fontWeight: "400",
  },
  bold: {
    fontFamily: "FiraSans_700Bold, sans-serif",
    fontWeight: "700",
  },
}

const prose: Theme["fonts"]["prose"] = {
  italic: {
    fontFamily: "Merriweather_400Regular_Italic, serif",
    fontWeight: "300",
    fontStyle: "italic",
  },
  regular: {
    fontFamily: "Merriweather_400Regular, serif",
    fontWeight: "400",
  },
  bold: {
    fontFamily: "Merriweather_700Bold, serif",
    fontWeight: "700",
  },
}

const fonts: Theme["fonts"] = {
  ...ui,
  medium: ui.bold,
  heavy: ui.bold,
  monospace: "FiraCode_400Regular, monospace",
  ui,
  prose,
}

export const DarkTheme = { ...DarkMainTheme, fonts }

export const LightTheme = { ...LightMainTheme, fonts }
