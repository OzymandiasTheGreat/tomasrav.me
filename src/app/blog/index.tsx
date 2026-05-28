import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import Strings from "@/assets/content/blog/blog.json"
import Footer from "@/components/footer"
import Markdown from "@/components/markdown"
import { useBlogPosts } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

export default function BlogHome() {
  const styles = useStyles()
  const posts = useBlogPosts()

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>{Strings.intro}</Text>
        </View>

        {posts
          && posts.posts.map((post) => (
            <View key={post.slug} style={styles.post}>
              <Link href={`/blog/post/${post.slug}`} style={styles.postTitle}>
                {post.title}
              </Link>
              <View style={styles.postMeta}>
                <Text style={styles.postAuthor}>
                  {Strings.by} {post.author}
                </Text>
                <Text style={styles.postPublished}>
                  {post.edited ? Strings.edited : Strings.published}{" "}
                  {post.edited ?? post.published}
                </Text>
              </View>
              <Markdown>{post.excerpt}</Markdown>
            </View>
          ))}
        {posts?.page! < posts?.total! && (
          <Link href={`/blog/posts/2`} style={styles.viewMore}>
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
