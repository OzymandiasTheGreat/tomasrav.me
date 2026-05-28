declare module "react-native-syntax-highlighter" {
  import React from "react"
  import { SyntaxHighlighterProps } from "react-syntax-highlighter"

  const SyntaxHighlighter: React.FC<
    SyntaxHighlighterProps & {
      fontFamily?: string
      fontSize?: number
    }
  >

  export default SyntaxHighlighter
}

declare module "react-syntax-highlighter/styles/hljs" {
  import { SyntaxHighlighterProps } from "react-syntax-highlighter"

  type StyleProp = SyntaxHighlighterProps["style"]

  export const atomOneDark: StyleProp
  export const atomOneLight: StyleProp
}
