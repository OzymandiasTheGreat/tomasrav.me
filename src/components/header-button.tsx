import React, { type ComponentProps, useCallback } from "react"
import { Pressable, type PressableProps, StyleSheet, Text } from "react-native"
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import MDI from "@expo/vector-icons/MaterialCommunityIcons"

import { createThemedStylesheet, useTheme } from "@/hooks/use-theme"

interface HeaderButtonProps {
  color: string
  icon?: ComponentProps<typeof MDI>["name"]
  text?: string
  onPress: PressableProps["onPress"]
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const HeaderButton: React.FC<HeaderButtonProps> = ({ color, icon, text, onPress }) => {
  const theme = useTheme()
  const styles = useStyles()
  const hovered = useSharedValue(0)
  const pressed = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      hovered.value,
      [0, 1],
      [theme.colors.primary + "00", theme.colors.primary + "33"],
    ),
    opacity: interpolate(pressed.value, [0, 1], [1, 0.3]),
  }))
  const onHoveredIn = useCallback(() => {
    hovered.value = withTiming(1, { duration: 250 })
  }, [])
  const onHoveredOut = useCallback(() => {
    hovered.value = withTiming(0, { duration: 250 })
  }, [])
  const onPressedIn = useCallback(() => {
    pressed.value = withTiming(1, { duration: 250 })
  }, [])
  const onPressedOut = useCallback(() => {
    pressed.value = withTiming(0, { duration: 250 })
  }, [])

  return (
    <AnimatedPressable
      onPress={onPress}
      onHoverIn={onHoveredIn}
      onHoverOut={onHoveredOut}
      onPressIn={onPressedIn}
      onPressOut={onPressedOut}
      style={[styles.pressable, animatedStyle]}
    >
      {!!icon && <MDI name={icon} size={32} color={color} />}
      {!!text && <Text style={[styles.text, { color }]}>{text}</Text>}
    </AnimatedPressable>
  )
}

export default HeaderButton

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    pressable: {
      alignItems: "center",
      justifyContent: "center",
      height: 48,
      width: 48,
      borderRadius: 21,
    },
    text: {
      ...theme.fonts.ui.bold,
      fontSize: 24,
      fontVariant: ["small-caps"],
    },
  }),
)
