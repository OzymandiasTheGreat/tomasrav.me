import { type Theme } from "./theme"

const ui: Theme["fonts"]["ui"] = {
  regular: {
    fontFamily: "Poppins_400Regular, sans-serif",
    fontWeight: "400",
  },
  bold: {
    fontFamily: "Poppins_700Bold, sans-serif",
    fontWeight: "700",
  },
}

const prose: Theme["fonts"]["prose"] = {
  italic: {
    fontFamily: "Merriweather_300Light_Italic, serif",
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

export const DarkTheme: Theme = {
  dark: true,
  fonts,
  colors: {
    background: "#121212",
    border: "#212121", // grey darken-4
    card: "#424242", // grey darken-3
    notification: "#40c4ff", // light-blue accent-2
    primary: "#f8bbd0", // pink lighten-4
    secondary: "#40c4ff", // light-blue accent-2
    text: "#fafafa", // grey lighten-5
  },
}

export const LightTheme: Theme = {
  dark: false,
  fonts,
  colors: {
    background: "#fafafa", // grey lighten-5
    border: "#f5f5f5", // grey lighten-4
    card: "#bdbdbd", // grey lighten-1
    notification: "#01579b", // light-blue darken-4
    primary: "#ad1457", // pink darken-3
    secondary: "#01579b", // light-blue darken-4
    text: "#121212",
  },
}
