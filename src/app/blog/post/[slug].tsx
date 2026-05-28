import FA from "@expo/vector-icons/FontAwesome6"
import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import NotFound from "@/app/+not-found"
import Strings from "@/assets/content/blog/blog.json"
import Footer from "@/components/footer"
import Markdown from "@/components/markdown"
import { useBlogPost } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

export async function generateStaticParams() {
  const context = require.context(
    "../../../../assets/content/blog/posts",
    false,
    /^\.\/[\w-]+\.md$/,
  )
  return context.keys().map((key) => {
    const match = [...key.matchAll(/^\.\/([\w-]+)\.md$/g)][0]
    return { slug: match[1] }
  })
}

export default function BlogPost() {
  const styles = useStyles()
  const post = useBlogPost()

  if (!post) {
    return <NotFound />
  }

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>{post.title}</Text>

        <View style={styles.postAlso}>
          <Text style={styles.postAlsoText}>{Strings.alsoPublished}</Text>
          {post.medium && (
            <Link href={post.medium as any} target="_blank" style={styles.postAlsoLink}>
              <FA
                name="medium"
                size={24}
                color={styles.postAlsoIcon.color}
                style={styles.postAlsoIcon}
              />
            </Link>
          )}
          {post.devto && (
            <Link href={post.devto as any} target="_blank" style={styles.postAlsoLink}>
              <FA
                name="dev"
                size={24}
                color={styles.postAlsoIcon.color}
                style={styles.postAlsoIcon}
              />
            </Link>
          )}
        </View>

        <View style={styles.postMeta}>
          <Text style={styles.postAuthor}>
            {Strings.by} {post.author}
          </Text>
          <Text style={styles.postPublished}>
            {post.edited ? Strings.edited : Strings.published} {post.edited ?? post.published}
          </Text>
        </View>

        <Markdown>{post.content}</Markdown>
      </View>

      <Footer />
    </Animated.ScrollView>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    content: {
      flexGrow: 1,
      alignItems: "center",
      marginTop: 128,
    },
    post: {
      backgroundColor: theme.colors.card,
      width: portrait ? "98%" : "75%",
      padding: portrait ? 16 : 48,
      borderRadius: 16,
      marginBottom: 64,
    },
    postTitle: {
      ...theme.fonts.ui.bold,
      fontSize: 28,
      color: theme.colors.text,
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
    postAlso: {
      flexDirection: "row",
      alignItems: "center",
      opacity: 0.75,
      marginBottom: 8,
      gap: 16,
    },
    postAlsoText: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.text,
    },
    postAlsoLink: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.secondary,
    },
    postAlsoIcon: {
      color: theme.colors.text,
      verticalAlign: "middle",
    },
  }),
)
