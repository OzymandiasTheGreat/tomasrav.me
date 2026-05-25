import { ThemeProvider } from "@react-navigation/native"
import { type NativeStackHeaderItemProps } from "@react-navigation/native-stack"
import { Stack } from "expo-router"
import { useCallback } from "react"
import { StyleSheet, View } from "react-native"
import "react-native-reanimated"

import HeaderButton from "@/components/header-button"
import { DarkTheme, LightTheme } from "@/constants/main.theme"
import { LocaleProvider, useLocale } from "@/hooks/use-locale"
import {
  ColorSchemeProvider,
  useColorScheme,
  useSetColorScheme,
} from "@/hooks/use-color-scheme"
import { createThemedStylesheet } from "@/hooks/use-theme"

import "./styles.css"

export const unstable_settings = {
  initialRouteName: "[locale]",
}

function RootLayout() {
  const styles = useStyles()
  const [locale, locales, setLocale] = useLocale()
  const theme = useColorScheme()
  const setTheme = useSetColorScheme()
  const headerRight = useCallback(
    ({ tintColor }: NativeStackHeaderItemProps) => {
      const next = locales.find((_, i) => i > locales.lastIndexOf(locale)) ?? locales[0]

      return (
        <View style={styles.headerRight}>
          <HeaderButton text={next} color={tintColor!} onPress={() => setLocale(next)} />
          <HeaderButton
            icon={theme === "dark" ? "weather-sunny" : "weather-night"}
            color={tintColor!}
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </View>
      )
    },
    [locale, locales, theme],
  )

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : LightTheme}>
      <Stack screenOptions={{ headerRight, headerTransparent: true, title: "" }} />
    </ThemeProvider>
  )
}

export default function RootContext() {
  return (
    <ColorSchemeProvider>
      <LocaleProvider>
        <RootLayout />
      </LocaleProvider>
    </ColorSchemeProvider>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    headerRight: {
      flexDirection: "row",
      gap: 8,
      marginEnd: 24,
    },
  }),
)
