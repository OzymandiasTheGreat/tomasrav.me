import React, { useMemo } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import Markdown from "expo-markdown"
import { Link } from "expo-router"
import { usePages } from "@/hooks/usePages"
import { useTheme } from "@/hooks/useTheme"
import { createThemedStylesheet } from "@/hooks/useTheme"

export default function AboutPage() {
  const theme = useTheme()
  const styles = useStyle()
  const markdown = usePages("about")
  const markdownStyle = useMemo(
    () => ({
      link: styles.link,
    }),
    [styles],
  )

  const Wrapper = theme.small ? React.Fragment : ScrollView

  return (
    <View style={styles.root}>
      <Wrapper>
        <View style={styles.wrapper}>
          <Markdown text={markdown} style={styles.markdown} elementStyles={markdownStyle} linkTarget="_blank" />
        </View>
      </Wrapper>
      <Link href="/" style={styles.close}>
        <MDI name="close" size={32} color={theme.colors.text} />
      </Link>
    </View>
  )
}

const useStyle = createThemedStylesheet((theme) =>
  StyleSheet.create({
    root: {
      flexGrow: 1,
      flexShrink: theme.small ? 0 : 1,
      backgroundColor: theme.colors.shadowInverted,
    },
    close: {
      position: "absolute",
      top: theme.spacing.small,
      right: theme.spacing.small,
    },
    wrapper: {
      flexGrow: 1,
      flexShrink: 0,
      padding: theme.spacing.medium,
    },
    markdown: {
      flexGrow: 1,
      flexShrink: 0,
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      fontSize: 18,
    },
    link: {
      color: theme.colors.link,
      fontFamily: theme.fonts.regular,
    },
  }),
)
