import { type Theme as NativeTheme } from "expo-router"

type FontStyle = {
  fontFamily: string
  fontStyle?: "italic" | "normal"
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
}

export interface Theme extends NativeTheme {
  dark: boolean
  colors: NativeTheme["colors"] & {
    secondary: string
  }
  fonts: NativeTheme["fonts"] & {
    ui: {
      regular: FontStyle
      bold: FontStyle
    }
    prose: {
      italic: FontStyle
      regular: FontStyle
      bold: FontStyle
    }
    monospace: string
  }
}
