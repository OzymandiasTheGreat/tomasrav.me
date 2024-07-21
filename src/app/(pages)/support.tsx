import React, { useMemo } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import Markdown from "exponent-markdown"
import { Link } from "expo-router"
import { URIs } from "@/constants/uris"
import { usePages } from "@/hooks/usePages"
import { useStrings } from "@/hooks/useStrings"
import { createThemedStylesheet, useTheme } from "@/hooks/useTheme"

export default function SupportPage() {
  const theme = useTheme()
  const styles = useStyle()
  const strings = useStrings()
  const content = usePages("support")
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
          <Markdown text={content} linkTarget="_blank" style={styles.markdown} elementStyles={markdownStyle} />
        </View>
        <View style={styles.cards}>
          <Link href={URIs.githubSponsors} target="_blank">
            <View style={styles.card}>
              <View style={styles.image}>
                <MDI name="github" size={128} color={theme.colors.text} />
              </View>
              <View style={styles.call}>
                <Text style={styles.text}>
                  {strings.donateOn} {strings.githubSponsors}
                </Text>
              </View>
            </View>
          </Link>
          <Link href={URIs.patreon} target="_blank">
            <View style={styles.card}>
              <View style={styles.image}>
                <MDI name="patreon" size={128} color={theme.colors.text} />
              </View>
              <View style={styles.call}>
                <Text style={styles.text}>
                  {strings.donateOn} {strings.patreon}
                </Text>
              </View>
            </View>
          </Link>
          <Link href={URIs.donorbox} target="_blank">
            <View style={styles.card}>
              <View style={styles.image}>
                <Image source={{ uri: "/images/donorbox-logo.svg", width: 128, height: 128 }} resizeMode="contain" />
              </View>
              <View style={styles.call}>
                <Text style={styles.text}>
                  {strings.donateOn} {strings.donorbox}
                </Text>
              </View>
            </View>
          </Link>
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
    cards: {
      flexGrow: 1,
      flexShrink: 0,
      flexDirection: theme.direction,
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.large,
      margin: theme.spacing.large,
    },
    card: {
      backgroundColor: theme.colors.card,
      width: 256,
      height: 256,
      borderRadius: 13,
    },
    image: {
      backgroundColor: theme.colors.inverted,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.medium,
      borderTopStartRadius: 13,
      borderTopEndRadius: 13,
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
    call: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      fontSize: 22,
      textAlign: "center",
    },
  }),
)
