import { useCallback, useEffect, useState } from "react"
import { useColorScheme, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, ColorSchemeName } from "react-native"
import "react-native-reanimated"
import { DarkTheme as DefaultDarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import {
  useFonts,
  FiraSans_400Regular,
  FiraSans_400Regular_Italic,
  FiraSans_700Bold,
  FiraSans_700Bold_Italic,
} from "@expo-google-fonts/fira-sans"
import { useLocales } from "expo-localization"
import { Link, Slot } from "expo-router"
import { URIs } from "@/constants/uris"
import { createThemedStylesheet } from "@/hooks/useTheme"
import { getLocale, useLocale, LocaleContext, UpdateLocaleContext } from "@/hooks/useLocale"
import { useStrings } from "@/hooks/useStrings"
import { getColorScheme, ColorSchemeContext, UpdateColorSchemeContext, useTheme } from "@/hooks/useTheme"
import { type Lang, Locales } from "@/i18n"
import cheshire from "@/images/background.svg"
import { ColorScheme, Language } from "@/lib/storage"

const DarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: "transparent",
  },
}

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
}

function MainPage({
  colorScheme,
  updateColorScheme,
}: {
  colorScheme: ColorSchemeName
  updateColorScheme: (colorScheme: ColorSchemeName) => void
}) {
  const theme = useTheme()
  const styles = useStyle()
  const strings = useStrings()

  const [loaded, error] = useFonts({
    FiraSans_400Regular,
    FiraSans_400Regular_Italic,
    FiraSans_700Bold,
    FiraSans_700Bold_Italic,
  })

  const setDarkScheme = useCallback(() => updateColorScheme("dark"), [])
  const setLightScheme = useCallback(() => updateColorScheme("light"), [])

  const [locale, setLocale] = useLocale()
  const nextLocale = Locales.slice(Locales.indexOf(locale)).find((l) => l !== locale) ?? Locales[0]
  const switchLocale = useCallback(() => setLocale(nextLocale), [nextLocale])

  const Box = theme.small ? ScrollView : View

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground source={cheshire} imageStyle={styles.cheshire_image} style={styles.cheshire}>
        {!loaded && !error ? (
          <></>
        ) : (
          <>
            <View style={styles.prefsContainer}>
              <View style={styles.prefs}>
                <Link href={URIs.github} target="_blank" style={styles.text}>
                  <MDI name="github" size={24} color={styles.text.color} />
                </Link>
                {colorScheme === "dark" ? (
                  <Text style={styles.text}>
                    <MDI name="weather-sunny" size={24} color={styles.text.color} onPress={setLightScheme} />
                  </Text>
                ) : (
                  <Text style={styles.text}>
                    <MDI name="weather-night" size={24} color={styles.text.color} onPress={setDarkScheme} />
                  </Text>
                )}
                <Text style={styles.text} onPress={switchLocale}>
                  {nextLocale.toLocaleUpperCase()}
                </Text>
              </View>
            </View>{" "}
            <Box style={styles.box} contentContainerStyle={styles.box_content}>
              <View style={styles.left}>
                <View style={styles.blurb}>
                  <Text style={[styles.text, styles.blurb_text]}>
                    <Text style={[styles.greeting]}>{strings.hello_there}</Text>
                    {"\n"}
                    <Text>
                      {strings.my_name} <Text style={[styles.name]}>{strings.me}</Text> {strings.i_make}
                      {"\n"}
                      {strings.mostly_mobile}
                    </Text>
                  </Text>
                  <View style={[styles.infoBox]}>
                    <Link href={URIs.mymail} target="_blank" style={[styles.link, styles.info]}>
                      <MDI name="email-outline" size={16} color={styles.info.color} />
                      {URIs.mymail.split(":")[1]}
                    </Link>
                    <Link href={URIs.holepunch} target="_blank" style={[styles.link, styles.info]}>
                      <MDI name="office-building-outline" size={16} color={styles.info.color} />
                      Holepunch Inc.
                    </Link>
                    <Link href={URIs.kaunasMap} target="_blank" style={[styles.link, styles.info]}>
                      <MDI name="map-marker" size={16} color={styles.info.color} />
                      {strings.location}
                    </Link>
                  </View>
                </View>
                <View style={styles.content}>
                  <Link href="/about" style={[styles.text, styles.link]}>
                    {strings.about}
                  </Link>
                  <Link href="/showcase" style={[styles.text, styles.link]}>
                    {strings.showcase}
                  </Link>
                  <Link href={URIs.tech} target="_blank" style={[styles.text, styles.link]}>
                    {strings.tech} <MDI name="open-in-new" size={16} color={theme.colors.text} />
                  </Link>
                  <Link href={URIs.kitchen} target="_blank" style={[styles.text, styles.link]}>
                    {strings.kitchen} <MDI name="open-in-new" size={16} color={theme.colors.text} />
                  </Link>
                  <Link href="/support" style={[styles.text, styles.link]}>
                    {strings.support}
                  </Link>
                </View>
              </View>
              <View style={[styles.right]}>
                <Slot />
              </View>
            </Box>
            <View style={styles.copyrightContainer}>
              <Text style={styles.copyright}>
                <MDI name="copyleft" size={16} color={theme.colors.text} />{" "}
                <Link href={URIs.cc} target="_blank" style={styles.license}>
                  {strings.license}
                </Link>{" "}
                {strings.copyright}
              </Text>
            </View>
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  )
}

export default function HomeScreen() {
  const systemScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState(getColorScheme(null, systemScheme))
  const updateColorScheme = useCallback((colorScheme: ColorSchemeName) => {
    ColorScheme.set(colorScheme)
    setColorScheme(colorScheme)
  }, [])

  const [{ languageCode: systemLocale }] = useLocales()
  const [locale, setLocale] = useState<Lang>(getLocale(null, systemLocale as Lang))
  const updateLocale = useCallback((locale: Lang) => {
    Language.set(locale)
    setLocale(locale)
  }, [])

  useEffect(() => {
    if (Locales.includes(systemLocale as Lang)) {
      updateLocale(systemLocale as Lang)
    }
  }, [updateLocale, systemLocale])

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <ColorSchemeContext.Provider value={colorScheme}>
        <UpdateColorSchemeContext.Provider value={updateColorScheme}>
          <LocaleContext.Provider value={locale}>
            <UpdateLocaleContext.Provider value={updateLocale}>
              <MainPage colorScheme={colorScheme} updateColorScheme={updateColorScheme} />
            </UpdateLocaleContext.Provider>
          </LocaleContext.Provider>
        </UpdateColorSchemeContext.Provider>
      </ColorSchemeContext.Provider>
    </ThemeProvider>
  )
}

const useStyle = createThemedStylesheet((theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    cheshire: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    cheshire_image: {
      opacity: 0.3,
    },
    prefsContainer: {
      position: "absolute",
      top: 0,
      marginVertical: theme.spacing.small,
      width: "100%",
    },
    prefs: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginHorizontal: theme.spacing.large,
      gap: theme.spacing.small,
    },
    copyrightContainer: {
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      marginVertical: theme.spacing.small,
    },
    copyright: {
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      fontSize: 16,
    },
    license: {
      color: theme.colors.link,
    },
    box: {
      flex: 1,
      flexDirection: theme.direction,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderRadius: 0,
      marginHorizontal: theme.small ? theme.spacing.small : theme.spacing.large,
      marginVertical: theme.spacing.large,
    },
    box_content: {
      flex: 1,
      minHeight: "100%",
    },
    left: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: theme.spacing.medium,
    },
    right: {
      flexGrow: theme.small ? 0.75 : 1.5,
      flexShrink: 0,
      margin: theme.spacing.medium,
    },
    blurb: {
      flexGrow: 0,
      flexShrink: 1,
      marginHorizontal: theme.spacing.medium,
    },
    blurb_text: {
      fontFamily: theme.fonts.regular,
      marginBottom: theme.spacing.medium,
    },
    content: {
      flex: 1,
      flexShrink: 0,
      flexDirection: "column",
      alignSelf: "flex-start",
      maxHeight: "30%",
      paddingVertical: theme.spacing.medium,
      marginHorizontal: theme.spacing.medium,
      gap: theme.spacing.small,
    },
    text: {
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      fontSize: 18,
    },
    greeting: {
      fontFamily: theme.fonts.italic,
      fontStyle: "italic",
      fontWeight: "light",
    },
    name: {
      fontFamily: theme.fonts.bold,
      fontSize: 24,
      fontWeight: "bold",
    },
    infoBox: {
      flexDirection: theme.direction,
      flexWrap: "wrap",
      gap: 3,
    },
    info: {
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      marginBottom: theme.spacing.small,
    },
    link: {
      textDecorationLine: "underline",
    },
  }),
)
