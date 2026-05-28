import { ThemeProvider } from "@react-navigation/native"
import { type NativeStackHeaderItemProps } from "@react-navigation/native-stack"
import { Stack } from "expo-router"
import { useCallback } from "react"
import { StyleSheet, View } from "react-native"
import "react-native-reanimated"

import HeaderButton from "@/components/header-button"
import { DarkTheme, LightTheme } from "@/constants/main.theme"
import {
  ColorSchemeProvider,
  useColorScheme,
  useSetColorScheme,
} from "@/hooks/use-color-scheme"
import { useSystemStrings } from "@/hooks/use-content"
import { useMainFonts } from "@/hooks/use-fonts"
import { LocaleProvider, useLocale } from "@/hooks/use-locale"
import { createThemedStylesheet } from "@/hooks/use-theme"

import "./styles.css"

export const unstable_settings = {
  initialRouteName: "[locale]/index",
}

function RootLayout() {
  const strings = useSystemStrings()["tooltips"]
  const styles = useStyles()
  const [locale, locales, setLocale] = useLocale()
  const theme = useColorScheme()
  const setTheme = useSetColorScheme()
  const headerRight = useCallback(
    ({ tintColor }: NativeStackHeaderItemProps) => {
      const next = locales.find((_, i) => i > locales.lastIndexOf(locale)) ?? locales[0]

      return (
        <View style={styles.headerRight}>
          <HeaderButton
            icon="text-box-multiple-outline"
            size={24}
            color={tintColor!}
            href="/blog"
            tooltip={strings.blog}
          />
          <HeaderButton
            text={next}
            size={24}
            color={tintColor!}
            onPress={() => setLocale(next)}
            tooltip={strings.language}
          />
          <HeaderButton
            icon={theme === "dark" ? "weather-sunny" : "weather-night"}
            size={32}
            color={tintColor!}
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            tooltip={strings.theme}
          />
        </View>
      )
    },
    [locale, locales, styles, theme],
  )

  useMainFonts()

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : LightTheme}>
      <Stack
        screenOptions={{
          headerRight,
          headerTransparent: true,
          title: "",
        }}
      >
        <Stack.Screen name="blog" options={{ headerShown: false }} />
      </Stack>
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
