import React, { useMemo } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import Markdown from "expo-markdown"
import { Link } from "expo-router"
import { URIs } from "@/constants/uris"
import { usePages } from "@/hooks/usePages"
import { useStars } from "@/hooks/useStars"
import { useStrings } from "@/hooks/useStrings"
import { useTheme, createThemedStylesheet } from "@/hooks/useTheme"

export default function ShowcasePage() {
  const styles = useStyle()
  const theme = useTheme()
  const strings = useStrings()
  const markdownStyle = useMemo(
    () => ({
      link: styles.markdown_link,
      blockquote: styles.markdown_blockquote,
    }),
    [styles],
  )

  const keetBlurb = usePages("keet")
  const voidBlurb = usePages("screamingvoid")
  const voidStars = useStars("screamingvoid")
  const emojiKeyboardBlurb = usePages("emojiKeyboard")
  const emojiKeyboardStars = useStars("emoji-keyboard")
  const mopidyYTMusicBlurb = usePages("mopidyYTMusic")
  const mopidyYTMusicStars = useStars("mopidy-ytmusic")
  const klembordBlurb = usePages("klembord")
  const klembordStars = useStars("klembord")

  const Wrapper = theme.small ? React.Fragment : ScrollView

  return (
    <View style={styles.root}>
      <Wrapper>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.image}>
              <Image source={{ uri: "/images/keet-logo.png", width: 92, height: 100 }} resizeMode="contain" style={styles.image_image} />
            </View>
            <View style={styles.blurb}>
              <Markdown text={keetBlurb} style={styles.markdown} elementStyles={markdownStyle} linkTarget="_blank" />
              <Link href={URIs.keet} target="_blank" style={styles.link}>
                {strings.getKeet}
              </Link>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.image}>
              <View style={styles.image_image} />
              <View style={styles.stars}>
                <Text style={styles.stars_stars}>
                  <MDI name="star" size={16} color={theme.colors.text} />
                  {voidStars}
                </Text>
              </View>
            </View>
            <View style={styles.blurb}>
              <Markdown text={voidBlurb} style={styles.markdown} elementStyles={markdownStyle} linkTarget="_blank" />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.image}>
              <MDI name="emoticon-poop" size={96} color={theme.colors.text} />
              <View style={styles.stars}>
                <Text style={styles.stars_stars}>
                  <MDI name="star" size={16} color={theme.colors.text} />
                  {emojiKeyboardStars}
                </Text>
              </View>
            </View>
            <View style={styles.blurb}>
              <Markdown text={emojiKeyboardBlurb} style={styles.markdown} elementStyles={markdownStyle} linkTarget="_blank" />
              <Link href={URIs.emojiKeyboard} target="_blank" style={styles.link}>
                {strings.goToGithub}
              </Link>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.image}>
              <MDI name="youtube" size={96} color={theme.colors.text} style={styles.image_icon} />
              <View style={styles.stars}>
                <Text style={styles.stars_stars}>
                  <MDI name="star" size={16} color={theme.colors.text} />
                  {mopidyYTMusicStars}
                </Text>
              </View>
            </View>
            <View style={styles.blurb}>
              <Markdown text={mopidyYTMusicBlurb} style={styles.markdown} elementStyles={markdownStyle} linkTarget="_blank" />
              <Link href={URIs.mopidyYTMusic} target="_blank" style={styles.link}>
                {strings.goToGithub}
              </Link>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.image}>
              <MDI name="clipboard" size={96} color={theme.colors.text} style={styles.image_icon} />
              <View style={styles.stars}>
                <Text style={styles.stars_stars}>
                  <MDI name="star" size={16} color={theme.colors.text} />
                  {klembordStars}
                </Text>
              </View>
            </View>
            <View style={styles.blurb}>
              <Markdown text={klembordBlurb} style={styles.markdown} elementStyles={markdownStyle} linkTarget="_blank" />
              <Link href={URIs.klembord} target="_blank" style={styles.link}>
                {strings.goToGithub}
              </Link>
            </View>
          </View>
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
      flex: 1,
    },
    close: {
      position: "absolute",
      top: theme.spacing.small,
      right: theme.spacing.small,
    },
    content: {
      flex: 1,
      alignItems: "center",
      gap: theme.spacing.medium,
      padding: theme.spacing.medium,
    },
    card: {
      flex: 1,
      backgroundColor: theme.colors.card,
      borderRadius: 13,
      width: theme.size.card.width,
      minHeight: theme.size.card.height,
      shadowColor: theme.colors.shadowInverted,
      shadowOffset: { width: 1.5, height: 1.5 },
      shadowRadius: 16,
    },
    image: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.inverted,
      padding: theme.spacing.medium,
      borderTopEndRadius: 13,
      borderTopStartRadius: 13,
    },
    image_image: {
      flex: 1,
    },
    image_icon: {},
    blurb: {
      flex: 1,
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small,
    },
    markdown: {
      flex: 1,
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      fontSize: 18,
    },
    markdown_link: {
      color: theme.colors.link,
    },
    markdown_blockquote: {
      borderStartWidth: 0,
      marginStart: theme.spacing.medium,
    },
    stars: {
      alignItems: "flex-end",
      justifyContent: "flex-end",
      width: "100%",
    },
    stars_stars: {
      color: theme.colors.text,
      fontSize: 16,
    },
    link: {
      color: theme.colors.link,
      fontFamily: theme.fonts.regular,
      fontSize: 18,
      alignSelf: "flex-end",
    },
  }),
)
