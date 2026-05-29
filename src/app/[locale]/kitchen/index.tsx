import { Link, useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import Footer from "@/components/footer"
import { useKitchenPosts, useKitchenStrings } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

export default function KitchenHome() {
  const styles = useStyles()
  const strings = useKitchenStrings()
  const posts = useKitchenPosts()
  const { locale } = useLocalSearchParams()

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>{strings.intro}</Text>
        </View>

        {posts
          && posts.posts.map((post) => (
            <View key={post.slug} style={styles.post}>
              <Link href={`/${locale}/kitchen/post/${post.slug}`} style={styles.postTitle}>
                {post.title}
              </Link>
              <View style={styles.postMeta}>
                <Text style={styles.postAuthor}>
                  {strings.by} {post.author}
                </Text>
                <Text style={styles.postPublished}>
                  {post.edited ? strings.edited : strings.published}{" "}
                  {post.edited ?? post.published}
                </Text>
              </View>
            </View>
          ))}

        {posts?.page! < posts?.total! && (
          <Link href={`/${locale}/kitchen/posts/2`} style={styles.viewMore}>
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
    post: {
      backgroundColor: theme.colors.card,
      width: portrait ? "98%" : "60%",
      padding: portrait ? 16 : 32,
      borderRadius: 16,
      marginBottom: 64,
    },
    postTitle: {
      ...theme.fonts.ui.bold,
      fontSize: 28,
      color: theme.colors.secondary,
      marginBottom: 32,
    },
    postMeta: {
      flexDirection: "row",
      justifyContent: "space-between",
      opacity: 0.75,
      marginBottom: 32,
    },
    postAuthor: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.text,
    },
    postPublished: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.text,
    },
    viewMore: {
      ...theme.fonts.ui.regular,
      fontSize: 20,
      color: theme.colors.secondary,
    },
  }),
)
