import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import Strings from "@/assets/content/blog/blog.json"
import Footer from "@/components/footer"
import { EmbeddedPostList } from "@/components/post-list"
import { useBlogPosts } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

export default function BlogHome() {
  const styles = useStyles()
  const listing = useBlogPosts()

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>{Strings.intro}</Text>
        </View>

        {listing && <EmbeddedPostList base="/blog" strings={Strings} listing={listing} />}

        {listing?.page! < listing?.total! && (
          <Link href={`/blog/posts/2`} style={styles.more}>
            {Strings.more}
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
