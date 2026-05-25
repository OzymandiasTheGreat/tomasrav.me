import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { Link, useLocalSearchParams } from "expo-router"
import { useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import Markdown, { type RenderRules } from "react-native-markdown-renderer"

import NotFound from "../+not-found"
import Info from "@/assets/content/info.json"
import Carousel from "@/components/carousel"
import Footer from "@/components/footer"
import { useLocale } from "@/hooks/use-locale"
import { useMainStrings } from "@/hooks/use-strings"
import { createThemedStylesheet } from "@/hooks/use-theme"

export default function LocalizedHome() {
  const strings = useMainStrings()["home"]
  const styles = useStyles()
  const quoteStyles = useQuoteStyles()
  const introStyles = useIntroStyles()
  const renderRules: RenderRules = useMemo(
    () => ({
      link: ({ key, attributes }, children, _parent, styles) => (
        <Link key={key} href={attributes.href as any} style={styles.link as any}>
          {children}
        </Link>
      ),
    }),
    [],
  )
  const { locale: route } = useLocalSearchParams<Record<string, string>>()
  const [, locales] = useLocale()

  if (!locales.includes(route)) {
    return <NotFound />
  }

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Animated.View entering={FadeIn.duration(3_500).delay(250)} style={styles.quote}>
          <View style={styles.quoteContent}>
            <Text style={[styles.decoration, styles.decorationStart]}>“</Text>
            <Markdown style={quoteStyles}>{strings.quote}</Markdown>
            <Text style={[styles.decoration, styles.decorationEnd]}>”</Text>
          </View>
          <Text style={styles.quoteAttribution}>— {strings.me}</Text>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <View style={styles.intro}>
          <View style={styles.info}>
            <Image source={require("@/assets/images/logo.svg")} style={styles.infoLogo} />

            <View style={styles.infoLine}>
              <MDI
                name="map-marker"
                size={24}
                color={styles.infoIcon.color}
                style={styles.infoIcon}
              />
              <Link
                href={`https://www.google.com/maps/${Info.location}`}
                style={styles.infoLink}
              >
                {strings.location}
              </Link>
            </View>

            <View style={styles.infoLine}>
              <MDI
                name="email"
                size={24}
                color={styles.infoIcon.color}
                style={styles.infoIcon}
              />
              <Link href={`mailto:${Info.email}`} style={styles.infoLink}>
                {Info.email}
              </Link>
            </View>

            <View style={styles.infoLine}>
              <MDI
                name="github"
                size={24}
                color={styles.infoIcon.color}
                style={styles.infoIcon}
              />
              <Link href={`https://github.com/${Info.github}`} style={styles.infoLink}>
                {Info.github}
              </Link>
            </View>
          </View>

          <Markdown rules={renderRules} style={introStyles}>
            {strings.intro}
          </Markdown>
        </View>
      </View>

      <View style={styles.carousel}>
        <Carousel />
      </View>

      <View style={styles.sponsor}>
        <Text style={styles.sponsorText}>{strings.support}</Text>
        <Link href={Info.sponsor.github.link as any} style={styles.sponsorLink}>
          <MDI
            name="github"
            size={48}
            color={styles.sponsorIcon.color}
            style={styles.sponsorIcon}
          />
          <Text>{Info.sponsor.github.name}</Text>
        </Link>
      </View>

      <Footer />
    </Animated.ScrollView>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    content: {
      flexGrow: 1,
    },
    section: {
      height: portrait ? null : "85%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: portrait ? 128 : null,
    },
    carousel: {
      height: portrait ? "35%" : "85%",
    },
    quote: {
      width: portrait ? "70%" : "60%",
      alignItems: "center",
      justifyContent: "center",
    },
    quoteContent: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 32,
    },
    quoteAttribution: {
      alignSelf: "flex-end",
      ...theme.fonts.prose.regular,
      color: theme.colors.text,
      fontSize: 28,
    },
    decoration: {
      ...theme.fonts.prose.italic,
      fontSize: 128,
      color: theme.colors.text,
      position: "absolute",
    },
    decorationStart: {
      top: -14,
      left: -68,
    },
    decorationEnd: {
      bottom: -88,
      right: -56,
    },
    intro: {
      width: portrait ? "90%" : "55%",
      flexDirection: portrait ? "column" : "row",
      alignItems: portrait ? "center" : "flex-start",
      justifyContent: "center",
    },
    info: {
      marginBottom: 64,
      marginEnd: portrait ? 0 : 64,
    },
    infoLine: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    infoLink: {
      ...theme.fonts.ui.bold,
      fontSize: 16,
      color: theme.colors.secondary,
    },
    infoLogo: {
      width: 256,
      height: 256,
      marginBottom: 32,
    },
    infoIcon: {
      color: theme.colors.text,
      marginHorizontal: 8,
    },
    sponsor: {
      height: portrait ? 512 : "45%",
      alignItems: "center",
      justifyContent: "center",
    },
    sponsorText: {
      ...theme.fonts.prose.italic,
      fontSize: 24,
      color: theme.colors.text,
      lineHeight: 32,
      textAlign: "center",
      width: portrait ? "60%" : "30%",
    },
    sponsorIcon: {
      color: theme.colors.primary,
      verticalAlign: "middle",
      marginHorizontal: 8,
    },
    sponsorLink: {
      ...theme.fonts.ui.regular,
      fontSize: 28,
      color: theme.colors.primary,
      marginTop: 32,
    },
  }),
)

const useQuoteStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    root: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    paragraph: {
      margin: 0,
    },
    text: {
      ...theme.fonts.prose.italic,
      fontSize: portrait ? 28 : 32,
      color: theme.colors.text,
      lineHeight: portrait ? 48 : 64,
      textAlign: "center",
    },
    strong: {
      ...theme.fonts.prose.bold,
      fontSize: 32,
      color: theme.colors.text,
    },
  }),
)

const useIntroStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    root: {
      width: "100%",
    },
    headingContainer: {
      marginTop: 0,
    },
    heading1Container: {
      borderBottomWidth: 0,
    },
    heading1: {
      ...theme.fonts.prose.bold,
      fontSize: 32,
      color: theme.colors.text,
      lineHeight: 32,
    },
    text: {
      ...theme.fonts.prose.regular,
      fontSize: 22,
      color: theme.colors.text,
      lineHeight: 32,
    },
    strong: {
      ...theme.fonts.prose.bold,
    },
    link: {
      color: theme.colors.secondary,
    },
  }),
)
