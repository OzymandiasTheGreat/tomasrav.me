import { ThemeProvider } from "@react-navigation/native"
import { type NativeStackHeaderItemProps } from "@react-navigation/native-stack"
import { Stack } from "expo-router"
import { useCallback } from "react"
import { StyleSheet, View } from "react-native"

import HeaderButton from "@/components/header-button"
import { DarkTheme, LightTheme } from "@/constants/blog.theme"
import { useColorScheme, useSetColorScheme } from "@/hooks/use-color-scheme"
import { useSystemStrings } from "@/hooks/use-content"
import { useBlogFonts } from "@/hooks/use-fonts"
import { createThemedStylesheet } from "@/hooks/use-theme"

export const unstable_settings = {
  initialRouteName: "index",
}

export default function BlogLayout() {
  const strings = useSystemStrings()
  const styles = useStyles()
  const theme = useColorScheme()
  const setTheme = useSetColorScheme()
  const headerRight = useCallback(
    ({ tintColor }: NativeStackHeaderItemProps) => (
      <View style={styles.headerRight}>
        <HeaderButton
          icon="home"
          size={24}
          color={tintColor!}
          href="/"
          tooltip={strings.goHome}
        />
        <HeaderButton
          icon={theme === "dark" ? "weather-sunny" : "weather-night"}
          size={32}
          color={tintColor!}
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          tooltip={strings.tooltips.theme}
        />
      </View>
    ),
    [styles, theme],
  )

  useBlogFonts()

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
