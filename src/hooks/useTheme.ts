import { createContext, useContext, useMemo } from "react"
import { Appearance, type ColorSchemeName, type ImageStyle, type TextStyle, type ViewStyle } from "react-native"
import { useMediaQuery } from "react-responsive"
import { Colors } from "@/constants/colors"
import { ColorScheme } from "@/lib/storage"

interface Theme {
  dark: boolean
  small: boolean
  colors: Colors
  fonts: {
    regular: string
    italic: string
    bold: string
    boldItalic: string
  }
  direction: "column" | "row"
  spacing: {
    small: number
    medium: number
    large: number
  }
  size: {
    text: number
    card: {
      width: number
      height: number
    }
  }
}

export const ColorSchemeContext = createContext<ColorSchemeName>("light")
export const UpdateColorSchemeContext = createContext<(colorScheme: ColorSchemeName) => void>(() => {})

export const getColorScheme = (user?: ColorSchemeName | null, system?: ColorSchemeName | null): ColorSchemeName => {
  if (!user) {
    user = ColorScheme.get()
  }
  if (!system) {
    system = Appearance.getColorScheme()
  }
  return user ?? system ?? "light"
}

export const useColorScheme = (): [ColorSchemeName, (colorScheme: ColorSchemeName) => void] => {
  const scheme = useContext(ColorSchemeContext)
  const update = useContext(UpdateColorSchemeContext)
  return [scheme, update]
}

const generateTheme = (options: {
  scheme: ColorSchemeName
  portrait: boolean
  phone: boolean
  tablet: boolean
  desktop: boolean
}): Theme => {
  const colors = Colors[options.scheme!]
  const pick = (landscape: number, portrait: number) => (options.portrait ? portrait : landscape)
  const theme: Theme = {
    dark: options.scheme === "dark",
    small: options.phone,
    colors,
    fonts: {
      regular: "FiraSans_400Regular",
      italic: "FiraSans_400Regular_Italic",
      bold: "FiraSans_700Bold",
      boldItalic: "FiraSans_700Bold_Italic",
    },
    direction: options.portrait ? "column" : "row",
    spacing: {
      small: options.phone ? 3 : options.tablet ? 5 : options.desktop ? 7 : 13,
      medium: options.phone ? 7 : options.tablet ? 13 : options.desktop ? 24 : 32,
      large: options.phone ? 28 : options.tablet ? 32 : options.desktop ? 64 : 96,
    },
    size: {
      text: options.phone ? 16 : options.tablet || options.desktop ? 18 : 20,
      card: {
        width: options.phone ? pick(448, 288) : options.tablet ? pick(512, 640) : options.desktop ? 512 : 720,
        height: options.phone ? pick(352, 480) : options.tablet ? 320 : 416,
      },
    },
  }
  return theme
}

export const getTheme = () => {
  const scheme = getColorScheme()
  const portrait = globalThis.matchMedia("(orientation: portrait)").matches
  const phonePortrait = globalThis.matchMedia("(max-width: 420px)").matches
  const phoneLandscape = globalThis.matchMedia("(max-width: 854px)").matches
  const tabletPortrait = globalThis.matchMedia("(max-width: 810px)").matches
  const tabletLandscape = globalThis.matchMedia("(max-width: 1080px)").matches
  const desktop = globalThis.matchMedia("(max-width: 1920px)").matches
  return generateTheme({
    scheme,
    portrait,
    phone: portrait ? phonePortrait : phoneLandscape,
    tablet: portrait ? tabletPortrait : tabletLandscape,
    desktop,
  })
}

export const useTheme = () => {
  const [scheme] = useColorScheme()
  const portrait = useMediaQuery({ orientation: "portrait" })
  const phonePortrait = useMediaQuery({ maxWidth: 420 })
  const phoneLandscape = useMediaQuery({ maxWidth: 854 })
  const tabletPortrait = useMediaQuery({ maxWidth: 810 })
  const tabletLandscape = useMediaQuery({ maxWidth: 1080 })
  const desktop = useMediaQuery({ maxWidth: 1920 })
  const theme: Theme = useMemo(
    () =>
      generateTheme({
        scheme,
        portrait,
        phone: portrait ? phonePortrait : phoneLandscape,
        tablet: portrait ? tabletPortrait : tabletLandscape,
        desktop,
      }),
    [scheme, portrait, phonePortrait, phoneLandscape, tabletPortrait, tabletLandscape, desktop],
  )
  return theme
}

export const createThemedStylesheet = <T extends Record<string, ImageStyle | TextStyle | ViewStyle>>(builder: (theme: Theme) => T) => {
  return () => {
    const theme = useTheme()
    const stylesheet = useMemo(() => builder(theme), [theme])
    return stylesheet
  }
}
