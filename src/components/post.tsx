import FA from "@expo/vector-icons/FontAwesome6"
import { Link } from "expo-router"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import Footer from "./footer"
import Markdown from "./markdown"
import { createThemedStylesheet } from "@/hooks/use-theme"

export interface PostStrings {
  by: string
  edited: string
  published: string
  adapted?: string
  alsoPublished?: string
}

export interface Post {
  title: string
  slug: string
  author: string
  published: string
  content: string
  edited?: string
  medium?: string
  devto?: string
  source?: string
}

export interface PostProps {
  post: Post
  strings: PostStrings
}

const Post: React.FC<PostProps> = ({ post, strings }) => {
  const styles = useStyles()
  const also = !!strings.alsoPublished && !!(post.medium || post.devto)
  const adapted = !!strings.adapted && !!post.source

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      <View style={styles.post}>
        <Text style={styles.title}>{post.title}</Text>

        {also && (
          <View style={styles.also}>
            <Text style={styles.alsoText}>{strings.alsoPublished}</Text>

            {post.medium && (
              <Link href={post.medium as any} target="_blank" style={styles.alsoLink}>
                <FA
                  name="medium"
                  size={24}
                  color={styles.alsoIcon.color}
                  style={styles.alsoIcon}
                />
              </Link>
            )}

            {post.devto && (
              <Link href={post.devto as any} target="_blank" style={styles.alsoLink}>
                <FA
                  name="dev"
                  size={24}
                  color={styles.alsoIcon.color}
                  style={styles.alsoIcon}
                />
              </Link>
            )}
          </View>
        )}

        <View style={styles.metadata}>
          <Text style={styles.author}>
            {strings.by} {post.author}
          </Text>

          <Text style={styles.date}>
            {post.edited ? strings.edited : strings.published} {post.edited ?? post.published}
          </Text>
        </View>

        <Markdown>{post.content}</Markdown>

        {adapted && (
          <Text style={styles.adapted}>
            {strings.adapted}:{" "}
            {URL.canParse(post.source!) ? (
              <Link href={post.source as any} target="_blank" style={styles.adaptedLink}>
                {post.source}
              </Link>
            ) : (
              post.source
            )}
          </Text>
        )}
      </View>

      <Footer />
    </Animated.ScrollView>
  )
}

export default Post

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    content: {
      flexGrow: 1,
      alignItems: "center",
      paddingTop: 128,
    },
    post: {
      backgroundColor: theme.colors.card + "66",
      width: portrait ? "98%" : "60%",
      padding: portrait ? 32 : 48,
      borderRadius: 16,
      marginBottom: 64,
    },
    title: {
      ...theme.fonts.ui.bold,
      fontSize: portrait ? 28 : 32,
      color: theme.colors.text,
      marginBottom: 32,
    },
    also: {
      flexDirection: "row",
      alignItems: "center",
      opacity: 0.75,
      marginBottom: 8,
      gap: 16,
    },
    alsoText: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.text,
    },
    alsoLink: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.secondary,
    },
    alsoIcon: {
      color: theme.colors.text,
      verticalAlign: "middle",
    },
    metadata: {
      flexDirection: "row",
      justifyContent: "space-between",
      opacity: 0.75,
      marginBottom: 32,
    },
    author: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.text,
    },
    date: {
      ...theme.fonts.ui.regular,
      fontSize: 18,
      color: theme.colors.text,
    },
    adapted: {
      ...theme.fonts.ui.regular,
      fontSize: 20,
      color: theme.colors.text,
      marginVertical: 32,
    },
    adaptedLink: {
      color: theme.colors.secondary,
    },
  }),
)
