import { type NativeStackHeaderItemProps } from "@react-navigation/native-stack"
import { Image } from "expo-image"
import { Link, Stack, useFocusEffect, usePathname } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, View, useWindowDimensions } from "react-native"
import Animated, {
  Easing,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

import HeaderButton from "@/components/header-button"
import { useColorScheme, useSetColorScheme } from "@/hooks/use-color-scheme"
import { useSystemStrings } from "@/hooks/use-content"
import { useLocale } from "@/hooks/use-locale"
import { createThemedStylesheet } from "@/hooks/use-theme"

const DROID_WIDTH = 256

const AnimatedImage = Animated.createAnimatedComponent(Image)

export default function NotFound() {
  const strings = useSystemStrings()
  const styles = useStyles()
  const [home, setHome] = useState("/")
  const pathname = usePathname()
  const [locale, locales, setLocale] = useLocale()
  const theme = useColorScheme()
  const setTheme = useSetColorScheme()
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
            icon="food-variant"
            size={24}
            color={tintColor!}
            href={`/${locale}/kitchen`}
            tooltip={strings.tooltips.kitchen}
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
            tooltip={strings.tooltips.theme}
          />
        </View>
      )
    },
    [locale, locales, styles, theme],
  )
  const { width } = useWindowDimensions()
  const bounce = useSharedValue(0)
  const position = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(position.value, [0, 1], [0 - DROID_WIDTH, width + DROID_WIDTH]),
      },
      {
        translateY: bounce.value,
      },
    ],
  }))

  useFocusEffect(() => {
    bounce.value = withRepeat(withTiming(3, { duration: 150, easing: Easing.bounce }), -1, true)
    position.value = withTiming(1, { duration: 7_000, easing: Easing.inOut(Easing.linear) })
  })

  useEffect(() => {
    if (pathname.startsWith("/blog/")) {
      setHome("/blog")
    }

    if (pathname.startsWith(`/${locale}/kitchen/`)) {
      setHome(`/${locale}/kitchen`)
    }
  }, [locale, pathname])

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerRight, headerTransparent: true, title: "" }} />

      <AnimatedImage
        source={require("@/assets/images/r2d2.svg")}
        style={[styles.droid, animatedStyle]}
      />

      <Animated.View entering={FadeInUp.duration(750).delay(2_750)} style={styles.quote}>
        <Text style={styles.quoteText}>“{strings.notFound.quote}”</Text>
        <Text style={styles.quoteAttribution}>— {strings.notFound.attribution}</Text>
        <Link href={home as any} replace style={styles.quoteLink}>
          {strings.goHome}
        </Link>
      </Animated.View>
    </View>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#b1875c",
      backgroundImage: "url(/images/dunes.svg)",
      backgroundSize: "512px 320px",
      backgroundPosition: "-128px",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    headerRight: {
      flexDirection: "row",
      gap: 8,
      marginEnd: 24,
    },
    droid: {
      alignSelf: "flex-start",
      width: DROID_WIDTH,
      height: DROID_WIDTH,
    },
    quote: {
      backgroundColor: theme.colors.card + "66",
      alignItems: "center",
      padding: 16,
      borderRadius: 16,
      marginTop: 32,
      marginHorizontal: 16,
      gap: 16,
    },
    quoteText: {
      ...theme.fonts.prose.italic,
      color: theme.colors.text,
      fontSize: portrait ? 28 : 32,
      fontStyle: "italic",
      textAlign: "center",
    },
    quoteAttribution: {
      ...theme.fonts.prose.regular,
      color: theme.colors.text,
      fontSize: 28,
      textAlign: "center",
      alignSelf: "flex-end",
    },
    quoteLink: {
      ...theme.fonts.ui.regular,
      color: theme.colors.secondary,
      fontSize: 24,
      fontWeight: "700",
      fontVariant: ["small-caps"],
      textAlign: "center",
    },
  }),
)
