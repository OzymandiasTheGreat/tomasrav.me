import { ThemeProvider } from "@react-navigation/native"
import { type NativeStackHeaderItemProps } from "@react-navigation/native-stack"
import { Stack } from "expo-router"
import { useCallback } from "react"
import { StyleSheet, View } from "react-native"

import HeaderButton from "@/components/header-button"
import { DarkTheme, LightTheme } from "@/constants/kitchen.theme"
import { useColorScheme, useSetColorScheme } from "@/hooks/use-color-scheme"
import { useSystemStrings } from "@/hooks/use-content"
import { useKitchenFonts } from "@/hooks/use-fonts"
import { useLocale } from "@/hooks/use-locale"
import { createThemedStylesheet } from "@/hooks/use-theme"

export const unstable_settings = {
  initialRouteName: "[locale]/kitchen/index",
}

export default function KitchenLayout() {
  const strings = useSystemStrings()
  const styles = useStyles()
  const theme = useColorScheme()
  const setTheme = useSetColorScheme()
  const [locale, locales, setLocale] = useLocale()
  const headerRight = useCallback(
    ({ tintColor }: NativeStackHeaderItemProps) => {
      const next = locales.find((_, i) => i > locales.lastIndexOf(locale)) ?? locales[0]

      return (
        <View style={styles.headerRight}>
          <HeaderButton
            icon="home"
            size={24}
            color={tintColor!}
            href="/"
            tooltip={strings.goHome}
          />
          <HeaderButton
            icon="text-box-multiple-outline"
            size={24}
            color={tintColor!}
            href="/blog"
            tooltip={strings.tooltips.blog}
          />
          <HeaderButton
            text={next}
            size={24}
            color={tintColor!}
            onPress={() => setLocale(next)}
            tooltip={strings.tooltips.language}
          />
          <HeaderButton
            icon={theme === "dark" ? "weather-sunny" : "weather-night"}
            size={32}
            color={tintColor!}
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </View>
      )
    },
    [locale, locales, strings, styles, theme],
  )

  useKitchenFonts()

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : LightTheme}>
      <Stack screenOptions={{ headerRight, headerTransparent: true, title: "" }} />
    </ThemeProvider>
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
