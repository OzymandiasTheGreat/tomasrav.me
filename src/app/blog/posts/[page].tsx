import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import NotFound from "@/app/+not-found"
import Strings from "@/assets/content/blog/blog.json"
import Footer from "@/components/footer"
import Markdown from "@/components/markdown"
import { useBlogPosts } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

export async function generateStaticParams() {
  const PER_PAGE = 10
  const context = require.context(
    "../../../../assets/content/blog/posts",
    false,
    /^\.\/[\w-]+\.md$/,
  )
  const pages = Math.ceil(context.keys().length / PER_PAGE)
  return new Array(pages).fill(0).map((_, i) => ({ page: `${i + 1}` }))
}

export default function BlogPostList() {
  const styles = useStyles()
  const posts = useBlogPosts()

  if (!posts) {
    return <NotFound />
  }

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      {posts.posts.map((post) => (
        <View key={post.slug} style={styles.post}>
          <Link href={`/blog/post/${post.slug}`} style={styles.postTitle}>
            {post.title}
          </Link>
          <View style={styles.postMeta}>
            <Text style={styles.postAuthor}>
              {Strings.by} {post.author}
            </Text>
            <Text style={styles.postPublished}>
              {post.edited ? Strings.edited : Strings.published} {post.edited ?? post.published}
            </Text>
          </View>
          <Markdown>{post.excerpt}</Markdown>
        </View>
      ))}

      <View style={styles.pager}>
        {posts.page - 1 > 0 && (
          <Link key="prev" href={`/blog/posts/${posts.page - 1}`} style={styles.pagerLink}>
            <MDI
              name="chevron-double-left"
              size={32}
              color={styles.pagerIcon.color}
              style={styles.pagerIcon}
            />
          </Link>
        )}
        {posts.page + 1 < posts.total && (
          <Link key="next" href={`/blog/posts/${posts.page + 1}`} style={styles.pagerLink}>
            <MDI
              name="chevron-double-right"
              size={32}
              color={styles.pagerIcon.color}
              style={styles.pagerIcon}
            />
          </Link>
        )}
      </View>

      <View style={styles.spacer} />

      <Footer />
    </Animated.ScrollView>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    content: {
      flexGrow: 1,
      alignItems: "center",
      paddingTop: 128,
    },
    spacer: {
      flex: 1,
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
    pager: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 64,
    },
    pagerIcon: {
      color: theme.colors.secondary,
      verticalAlign: "middle",
    },
    pagerLink: {
      color: theme.colors.secondary,
    },
  }),
)
