import { Link, useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import Footer from "@/components/footer"
import { EmbeddedPostList } from "@/components/post-list"
import { useKitchenPosts, useKitchenStrings } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

export default function KitchenHome() {
  const styles = useStyles()
  const strings = useKitchenStrings()
  const listing = useKitchenPosts()
  const { locale } = useLocalSearchParams()

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>{strings.intro}</Text>
        </View>

        {listing && (
          <EmbeddedPostList base={`/${locale}/kitchen`} strings={strings} listing={listing} />
        )}

        {listing?.page! < listing?.total! && (
          <Link href={`/${locale}/kitchen/posts/2`} style={styles.more}>
            {strings.more}
          </Link>
        )}
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
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    intro: {
      width: portrait ? "90%" : "60%",
      marginVertical: 256,
    },
    introText: {
      ...theme.fonts.ui.regular,
      fontSize: portrait ? 28 : 32,
      color: theme.colors.text,
      textAlign: "center",
    },
    more: {
      ...theme.fonts.ui.regular,
      fontSize: 20,
      color: theme.colors.secondary,
    },
  }),
)
