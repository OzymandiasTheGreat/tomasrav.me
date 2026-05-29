import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import { Link } from "expo-router"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"

import Footer from "./footer"
import Markdown from "./markdown"
import { createThemedStylesheet } from "@/hooks/use-theme"

export interface PostListStrings {
  by: string
  edited: string
  more: string
  published: string
}

export interface PostPreview {
  title: string
  slug: string
  author: string
  published: string
  excerpt?: string
  edited?: string
}

export interface PostListing {
  page: number
  total: number
  posts: PostPreview[]
}

export interface PostPreviewProps extends PostPreview {
  base: string
  strings: PostListStrings
}

export interface PostListProps {
  base: string
  strings: PostListStrings
  listing: PostListing
}

export const PostPreview: React.FC<PostPreviewProps> = ({
  base,
  strings,
  title,
  slug,
  author,
  published,
  edited,
  excerpt,
}) => {
  const styles = useStyles()

  return (
    <View style={styles.post}>
      <Link href={`${base}/post/${slug}` as any} style={styles.title}>
        {title}
      </Link>

      <View style={styles.metadata}>
        <Text style={styles.author}>
          {strings.by} {author}
        </Text>

        <Text style={styles.date}>
          {edited ? strings.edited : strings.published} {edited ?? published}
        </Text>
      </View>

      {excerpt && <Markdown>{excerpt}</Markdown>}
    </View>
  )
}

const PostList: React.FC<PostListProps> = ({ base, strings, listing }) => {
  const styles = useStyles()

  return (
    <Animated.ScrollView contentContainerStyle={styles.content}>
      {listing.posts.map((post) => (
        <PostPreview {...post} key={post.slug} base={base} strings={strings} />
      ))}

      <View style={styles.pager}>
        {listing.page - 1 > 0 && (
          <Link href={`${base}/posts/${listing.page - 1}` as any} style={styles.pagerLink}>
            <MDI
              name="chevron-double-left"
              size={32}
              color={styles.pagerIcon.color}
              style={styles.pagerIcon}
            />
          </Link>
        )}

        {listing.page + 1 < listing.total && (
          <Link href={`${base}/posts/${listing.page + 1}` as any} style={styles.pagerLink}>
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

export default PostList

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
      backgroundColor: theme.colors.card + "66",
      width: portrait ? "98%" : "60%",
      padding: portrait ? 16 : 32,
      borderRadius: 16,
      marginBottom: 64,
    },
    title: {
      ...theme.fonts.ui.bold,
      fontSize: portrait ? 28 : 32,
      color: theme.colors.secondary,
      marginBottom: 32,
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
