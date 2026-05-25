import { useMemo } from "react"
import { StyleSheet, useWindowDimensions } from "react-native"

import { DarkTheme, LightTheme } from "@/constants/main.theme"
import { type Theme } from "@/constants/theme"
import { useColorScheme } from "./use-color-scheme"

export function useTheme(): Theme {
  const theme = useColorScheme()
  return useMemo(() => (theme === "dark" ? DarkTheme : LightTheme), [theme])
}

export function createThemedStylesheet<T extends StyleSheet.NamedStyles<any>>(
  builder: (theme: Theme, portrait: boolean) => T,
): () => T {
  return () => {
    const { width, height } = useWindowDimensions()
    const portrait = height > width
    const theme = useTheme()
    return useMemo(() => builder(theme, portrait), [theme])
  }
}
