import { useTheme as useNativeTheme } from "@react-navigation/native"
import { useMemo } from "react"
import { StyleSheet, useWindowDimensions } from "react-native"

import { type Theme } from "@/constants/theme"

export function useTheme(): Theme {
  return useNativeTheme() as Theme
}

export function createThemedStylesheet<T extends StyleSheet.NamedStyles<any>>(
  builder: (theme: Theme, portrait: boolean) => T,
): () => T {
  return () => {
    const { width, height } = useWindowDimensions()
    const portrait = height > width
    const theme = useTheme()
    return useMemo(() => builder(theme as Theme, portrait), [theme])
  }
}
