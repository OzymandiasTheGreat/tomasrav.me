import { Link } from "expo-router"
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
  size: number
  color: string
  icon?: ComponentProps<typeof MDI>["name"]
  text?: string
  href?: string
  onPress?: PressableProps["onPress"]
  tooltip?: string
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const HeaderButton: React.FC<HeaderButtonProps> = ({
  size,
  color,
  icon,
  text,
  href,
  onPress,
  tooltip,
}) => {
  const theme = useTheme()
  const styles = useStyles()
  const hovered = useSharedValue(0)
  const pressed = useSharedValue(0)
  const buttonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      hovered.value,
      [0, 1],
      [theme.colors.primary + "00", theme.colors.primary + "33"],
    ),
    opacity: interpolate(pressed.value, [0, 1], [1, 0.3]),
  }))
  const opacity = useSharedValue(0)
  const tooltipStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0, 0.66]),
  }))
  const onHoveredIn = useCallback(() => {
    opacity.value = withTiming(1, { duration: 250 })
    hovered.value = withTiming(1, { duration: 250 })
  }, [])
  const onHoveredOut = useCallback(() => {
    opacity.value = withTiming(0, { duration: 250 })
    hovered.value = withTiming(0, { duration: 250 })
  }, [])
  const onPressedIn = useCallback(() => {
    opacity.value = withTiming(1, { duration: 250 })
    pressed.value = withTiming(1, { duration: 250 })
  }, [])
  const onPressedOut = useCallback(() => {
    opacity.value = withTiming(0, { duration: 250 })
    pressed.value = withTiming(0, { duration: 250 })
  }, [])

  return (
    <AnimatedPressable
      onPress={onPress}
      onHoverIn={onHoveredIn}
      onHoverOut={onHoveredOut}
      onPressIn={onPressedIn}
      onPressOut={onPressedOut}
      style={[styles.pressable, buttonStyle]}
    >
      {!href ? (
        <>
          {!!icon && <MDI name={icon} size={size} color={color} />}
          {!!text && <Text style={[styles.text, { color, fontSize: size }]}>{text}</Text>}
        </>
      ) : (
        <Link href={href as any} replace>
          {!!icon && <MDI name={icon} size={size} color={color} />}
          {!!text && <Text style={[styles.text, { color, fontSize: size }]}>{text}</Text>}
        </Link>
      )}
      <Animated.View style={[styles.tooltip, tooltipStyle]}>
        <Text numberOfLines={1} style={styles.tooltipText}>
          {tooltip}
        </Text>
      </Animated.View>
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
      fontVariant: ["small-caps"],
    },
    tooltip: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      position: "absolute",
      bottom: -36,
      right: -8,
      opacity: 0,
    },
    tooltipText: {
      ...theme.fonts.ui.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
  }),
)
