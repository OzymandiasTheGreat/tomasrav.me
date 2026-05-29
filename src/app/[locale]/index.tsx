import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { Link, Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import NotFound from "../+not-found"
import SharedInfo from "@/assets/content/shared-info.json"
import Carousel from "@/components/carousel"
import Footer from "@/components/footer"
import Markdown from "@/components/markdown"
import { useLocale } from "@/hooks/use-locale"
import { useHomeStrings } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

export async function generateStaticParams() {
  const context = require.context("../../../assets/content", true, /^\.\/\w{2}\/locale\.js$/)
  return context.keys().map((key) => ({ locale: context(key) }))
}

export default function LocalizedHome() {
  const strings = useHomeStrings()
  const styles = useStyles()
  const quoteStyles = useQuoteStyles()
  const introStyles = useIntroStyles()
  const { locale: route } = useLocalSearchParams<Record<string, string>>()
  const [, locales] = useLocale()

  if (!locales.includes(route)) {
    return <NotFound />
  }

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ headerLeft: noop }} />

      <View style={styles.section}>
        <Animated.View entering={FadeIn.duration(3_500).delay(250)} style={styles.quote}>
          <View style={styles.quoteContent}>
            <Text style={[styles.decoration, styles.decorationStart]}>“</Text>
            <Markdown style={quoteStyles}>{strings.quote}</Markdown>
            <Text style={[styles.decoration, styles.decorationEnd]}>”</Text>
          </View>
          <Text style={styles.quoteAttribution}>— {SharedInfo.me}</Text>
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
                href={`https://www.google.com/maps/${SharedInfo.location}`}
                target="_blank"
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
              <Link href={`mailto:${SharedInfo.email}`} target="_blank" style={styles.infoLink}>
                {SharedInfo.email}
              </Link>
            </View>

            <View style={styles.infoLine}>
              <MDI
                name="github"
                size={24}
                color={styles.infoIcon.color}
                style={styles.infoIcon}
              />
              <Link
                href={`https://github.com/${SharedInfo.github}`}
                target="_blank"
                style={styles.infoLink}
              >
                {SharedInfo.github}
              </Link>
            </View>
          </View>

          <Markdown style={introStyles}>{strings.intro}</Markdown>
        </View>
      </View>

      <View style={styles.carousel}>
        <Carousel />
      </View>

      <View style={styles.sponsor}>
        <Text style={styles.sponsorText}>{strings.support}</Text>
        <Link
          href={SharedInfo.sponsor.github.link as any}
          target="_blank"
          style={styles.sponsorLink}
        >
          <MDI
            name="github"
            size={48}
            color={styles.sponsorIcon.color}
            style={styles.sponsorIcon}
          />
          <Text>{SharedInfo.sponsor.github.name}</Text>
        </Link>
      </View>

      <Footer />
    </Animated.ScrollView>
  )
}

function noop() {
  return <></>
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    content: {
      flexGrow: 1,
    },
    section: {
      height: portrait ? null : "65%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: portrait ? 128 : null,
    },
    carousel: {
      height: portrait ? "25%" : "50%",
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
      bottom: -80,
      right: -24,
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
      height: portrait ? 768 : "55%",
      alignItems: "center",
      justifyContent: "center",
    },
    sponsorText: {
      ...theme.fonts.ui.regular,
      fontSize: 24,
      color: theme.colors.text,
      lineHeight: 32,
      textAlign: "center",
      width: portrait ? "70%" : "35%",
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
    text: {
      ...theme.fonts.prose.italic,
      fontSize: portrait ? 32 : 36,
      lineHeight: portrait ? 48 : 64,
      textAlign: "center",
    },
  }),
)

const useIntroStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    root: {
      width: "100%",
    },
  }),
)
