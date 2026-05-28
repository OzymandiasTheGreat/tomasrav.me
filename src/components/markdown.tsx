import { Image } from "expo-image"
import { Link } from "expo-router"
import React, { useMemo } from "react"
import {
  type ImageStyle,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
  useWindowDimensions,
} from "react-native"
import MarkdownRenderer, {
  type RenderRules,
  type MarkdownStyles,
} from "react-native-markdown-renderer"
import SyntaxHighlighter from "react-native-syntax-highlighter"
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/styles/hljs"

import { createThemedStylesheet, useTheme } from "@/hooks/use-theme"

const Markdown: React.FC<{ children: string | string[]; style?: MarkdownStyles }> = ({
  children,
  style,
}) => {
  const theme = useTheme()
  const defaultStyles = useStyles()
  const styles = useMemo(() => {
    const styles: Record<string, StyleProp<ImageStyle | TextStyle | ViewStyle>> = {}

    for (const key of Object.keys(defaultStyles)) {
      styles[key] = StyleSheet.compose(
        defaultStyles[key as keyof typeof defaultStyles],
        style?.[key] as any,
      )
    }

    return styles
  }, [defaultStyles, style])
  const { width, height } = useWindowDimensions()
  const rules: RenderRules = useMemo(() => {
    const portrait = height > width

    return {
      image: ({ key, attributes: { src, alt }, content }, _children, _parent, styles) => (
        <>
          <Image
            key={key}
            source={{
              uri: src,
            }}
            alt={alt || content}
            contentFit="contain"
            style={[...(styles.image as any), { height: width * 0.5 }]}
          />
          {content && (
            <Text key={`${key}-title`} style={styles.title as any}>
              {content}
            </Text>
          )}
        </>
      ),
      fence: ({ key, content, sourceInfo }) => (
        <SyntaxHighlighter
          key={key}
          customStyle={{
            borderRadius: 16,
            padding: 16,
            scrollbarWidth: "none",
          }}
          fontFamily={theme.fonts.monospace}
          fontSize={portrait ? 18 : 22}
          language={sourceInfo}
          style={theme.dark ? atomOneDark : atomOneLight}
          wrapLines={false}
        >
          {content}
        </SyntaxHighlighter>
      ),
      text: ({ key, content }, _children, parent, styles) => {
        if (content === "<!--more-->" || content === "<!–more–>") {
          return null
        }
        if (parent[parent.length - 1].type.startsWith("heading")) {
          return (
            <Text key={key} style={[...(styles.text as any), theme.fonts.ui.bold]}>
              {content}
            </Text>
          )
        }
        return (
          <Text key={key} style={styles.text as any}>
            {content}
          </Text>
        )
      },
      link: ({ key, attributes }, children, _parent, styles) => (
        <Link
          key={key}
          href={attributes.href as any}
          target="_blank"
          style={styles.link as any}
        >
          {children}
        </Link>
      ),
    }
  }, [height, theme, width])

  return (
    <MarkdownRenderer mergeStyle={false} rules={rules} style={styles}>
      {children}
    </MarkdownRenderer>
  )
}

export default Markdown

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    root: {},
    view: {},
    text: {
      ...theme.fonts.prose.regular,
      fontSize: portrait ? 18 : 22,
      color: theme.colors.text,
      lineHeight: portrait ? 28 : 32,
    },
    heading: {
      ...theme.fonts.ui.bold,
    },
    heading1: {
      fontSize: portrait ? 28 : 32,
    },
    heading2: {
      fontSize: portrait ? 25 : 29,
    },
    heading3: {
      fontSize: portrait ? 22 : 26,
    },
    heading4: {
      fontSize: portrait ? 22 : 26,
      opacity: 0.9,
    },
    heading5: {
      fontSize: portrait ? 22 : 26,
      opacity: 0.8,
    },
    heading6: {
      fontSize: portrait ? 22 : 26,
      opacity: 0.7,
    },
    headingContainer: {
      flexDirection: "row",
      marginBottom: 32,
    },
    heading1Container: {},
    heading2Container: {},
    paragraph: {
      marginBottom: 16,
    },
    strong: {
      ...theme.fonts.prose.bold,
    },
    em: {
      ...theme.fonts.prose.italic,
    },
    strikethrough: {
      textDecorationLine: "line-through",
    },
    link: {
      color: theme.colors.secondary,
    },
    blocklink: {},
    blockquote: {
      paddingHorizontal: 8,
      borderLeftColor: theme.colors.primary,
      borderLeftWidth: 6,
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
      marginBottom: 16,
    },
    codeBlock: {
      fontFamily: theme.fonts.monospace,
      fontSize: portrait ? 18 : 22,
      color: theme.colors.text,
      lineHeight: portrait ? 24 : 28,
      backgroundColor: theme.colors.background + "66",
    },
    codeInline: {
      fontFamily: theme.fonts.monospace,
      fontSize: portrait ? 18 : 22,
      color: theme.colors.text,
      lineHeight: portrait ? 24 : 28,
      backgroundColor: theme.colors.background + "66",
      paddingHorizontal: 6,
      paddingVertical: 1,
      borderRadius: 6,
    },
    pre: {
      marginBottom: 16,
    },
    list: {
      marginBottom: 16,
    },
    listOrdered: {},
    listUnordered: {},
    listItem: {
      flex: 1,
    },
    listOrderedItem: {
      flexDirection: "row",
    },
    listOrderedItemIcon: {
      marginEnd: 8,
    },
    listOrderedItemText: {},
    listUnorderedItem: {
      flexDirection: "row",
    },
    listUnorderedItemIcon: {
      marginEnd: 8,
    },
    listUnorderedItemText: {},
    table: {
      borderWidth: 1,
      borderColor: theme.colors.text,
    },
    tableHeader: {},
    tableHeaderCell: {
      padding: 8,
      borderWidth: 1,
      borderColor: theme.colors.text,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableRowCell: {
      padding: 8,
      borderWidth: 1,
      borderColor: theme.colors.text,
    },
    hr: {
      backgroundColor: theme.colors.text,
      height: 1,
    },
    hardbreak: {
      width: "100%",
      height: 1,
    },
    softbreak: {},
    image: {
      width: "100%",
      marginBottom: 16,
    },
    title: {
      ...theme.fonts.ui.regular,
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.75,
      marginStart: 16,
    },
    htmlBlock: {},
    htmlInline: {},
    u: {
      textDecorationLine: "underline",
      textDecorationColor: theme.colors.text,
    },
  }),
)
