import { useLocalSearchParams } from "expo-router"
import matter from "gray-matter"
import { useMemo } from "react"

import { useLocale } from "./use-locale"

export interface SystemStrings {
  goHome: string
  tooltips: {
    blog: string
    language: string
    theme: string
  }
  notFound: {
    attribution: string
    quote: string
  }
}

export interface HomeStrings {
  quote: string
  intro: string
  location: string
  showcase: string
  stars: string
  downloads: string
  support: string
}

export interface KitchenStrings {
  intro: string
}

export interface BlogPost {
  title: string
  slug: string
  author: string
  excerpt: string
  content: string
  published: string
  edited?: string
  medium?: string
  devto?: string
}

export interface BlogPostList {
  page: number
  total: number
  posts: BlogPost[]
}

export function useSystemStrings(): SystemStrings {
  const [locale] = useLocale()
  const strings = useMemo(() => {
    const context = require.context("../../assets/content", true, /^\.\/\w{2}\/system.json$/)
    const strings: Record<string, Record<string, string>> = {}

    for (const path of context.keys()) {
      if (path.startsWith(`./${locale}`)) {
        Object.assign(strings, context(path))
      }
    }

    return strings as unknown as SystemStrings
  }, [locale])

  return strings
}

export function useHomeStrings(): HomeStrings {
  const [locale] = useLocale()
  const strings = useMemo(() => {
    const context = require.context(
      "../../assets/content",
      true,
      /^\.\/\w{2}\/home(?:\.json$|\/[\w\._-]+\.md$)/,
    )
    const strings: Record<string, string> = {}

    for (const path of context.keys()) {
      if (path.startsWith(`./${locale}`)) {
        if (path.endsWith(".json")) {
          Object.assign(strings, context(path))
        } else {
          const components = path.split("/")
          const filename = components[components.length - 1]
          const key = camelize(filename.slice(0, filename.lastIndexOf(".")))

          strings[key] = context(path)
        }
      }
    }

    return strings as unknown as HomeStrings
  }, [locale])

  return strings
}

export function useBlogPosts() {
  const PER_PAGE = 10
  const context = require.context("../../assets/content/blog/posts", false, /\.md$/)
  const posts: BlogPost[] = context
    .keys()
    .map((key) => {
      const data = matter(context(key), {
        excerpt: true,
        excerpt_separator: "<!--more-->",
      })

      return {
        excerpt: data.excerpt!,
        content: data.content,
        ...data.data,
      } as BlogPost
    })
    .sort((a, b) => {
      const atime = a.edited ? new Date(a.edited).getTime() : new Date(a.published).getTime()
      const btime = b.edited ? new Date(b.edited).getTime() : new Date(b.published).getTime()

      return btime - atime
    })
    .map((post) => ({
      ...post,
      edited: post.edited && new Date(post.edited).toLocaleDateString(new Intl.Locale("lt")),
      published: new Date(post.published).toLocaleDateString(new Intl.Locale("lt")),
    }))
  const params = useLocalSearchParams()
  const page =
    "page" in params
      ? /^\d+$/.test(params.page as string)
        ? parseInt(params.page as string)
        : -1
      : 1
  const total = Math.ceil(posts.length / PER_PAGE)

  if (page <= 0 || page > total) {
    return null
  }

  const paged = posts.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE)

  return { page, total, posts: paged }
}

export function useBlogPost() {
  const params = useLocalSearchParams()
  const context = require.context("../../assets/content/blog/posts", false, /\.md$/)
  const key = context.keys().find((key) => key.endsWith(`${params.slug}.md`))

  if (!key) {
    return null
  }

  const data = matter(context(key), {
    excerpt: false,
  })

  return {
    content: data.content,
    ...data.data,
    published: new Date(data.data.published).toLocaleDateString(new Intl.Locale("lt")),
  } as BlogPost
}

function camelize(str: string): string {
  return str.replace(/[_-](\w)/g, (_, char) => char.toUpperCase())
}
