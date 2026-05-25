import { Image } from "expo-image"
import { Link, useFocusEffect } from "expo-router"
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

import { useMainStrings } from "@/hooks/use-strings"
import { createThemedStylesheet } from "@/hooks/use-theme"

const DROID_WIDTH = 256

const AnimatedImage = Animated.createAnimatedComponent(Image)

export default function NotFound({ home }: { home?: string } = {}) {
  const strings = useMainStrings()["notFound"]
  const styles = useStyles()
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

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={require("@/assets/images/r2d2.svg")}
        style={[styles.droid, animatedStyle]}
      />
      <Animated.View entering={FadeInUp.duration(750).delay(2_750)} style={styles.quote}>
        <Text style={styles.quoteText}>“{strings.quote}”</Text>
        <Text style={styles.quoteAttribution}>— {strings.attribution}</Text>
        <Link href={(home ?? "/") as any} replace style={styles.quoteLink}>
          {strings.go_home}
        </Link>
      </Animated.View>
    </View>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#b1875c",
      backgroundImage: "url(/dunes.svg)",
      backgroundSize: "512px 320px",
      backgroundPosition: "-128px",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
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
      textAlign: "center",
    },
  }),
)
