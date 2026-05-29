import { useLocalSearchParams } from "expo-router"
import matter from "gray-matter"
import { useMemo } from "react"

import { useLocale } from "./use-locale"

export interface SystemStrings {
  goHome: string
  tooltips: {
    blog: string
    kitchen: string
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
  adapted: string
  by: string
  edited: string
  intro: string
  more: string
  published: string
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

export interface KitchenPost {
  title: string
  slug: string
  author: string
  content: string
  published: string
  edited?: string
  source?: string
}

export interface KitchenPostList {
  page: number
  total: number
  posts: KitchenPost[]
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

export function useKitchenStrings(): KitchenStrings {
  const [locale] = useLocale()
  const strings = useMemo(() => {
    const context = require.context(
      "../../assets/content",
      true,
      /^\.\/\w{2}\/kitchen\/kitchen\.json$/,
    )
    const strings: Record<string, string> = {}

    for (const path of context.keys()) {
      if (path.startsWith(`./${locale}`)) {
        Object.assign(strings, context(path))
      }
    }

    return strings
  }, [locale])

  return strings as unknown as KitchenStrings
}

export function useBlogPosts(): BlogPostList | null {
  const PER_PAGE = 5
  const context = require.context("../../assets/content/blog/posts", false, /\.md$/)
  const posts: BlogPost[] = useMemo(
    () =>
      context
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
          const atime = a.edited
            ? new Date(a.edited).getTime()
            : new Date(a.published).getTime()
          const btime = b.edited
            ? new Date(b.edited).getTime()
            : new Date(b.published).getTime()

          return btime - atime
        })
        .map((post) => ({
          ...post,
          edited:
            post.edited && new Date(post.edited).toLocaleDateString(new Intl.Locale("lt")),
          published: new Date(post.published).toLocaleDateString(new Intl.Locale("lt")),
        })),
    [context],
  )
  const params = useLocalSearchParams()
  const list = useMemo(() => {
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

    return {
      page,
      total,
      posts: posts.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE),
    }
  }, [params, posts])

  return list
}

export function useBlogPost(): BlogPost | null {
  const params = useLocalSearchParams()
  const context = require.context("../../assets/content/blog/posts", false, /\.md$/)
  const post = useMemo(() => {
    const key = context.keys().find((key) => key.endsWith(`${params.slug}.md`))

    if (!key) {
      return null
    }

    const post = matter(context(key), {
      excerpt: false,
    })

    return {
      content: post.content,
      ...post.data,
      published: new Date(post.data.published).toLocaleDateString(new Intl.Locale("lt")),
      edited:
        post.data.edited
        && new Date(post.data.edited).toLocaleDateString(new Intl.Locale("lt")),
    }
  }, [context, params])

  return post as BlogPost
}

export function useKitchenPosts(): KitchenPostList | null {
  const PER_PAGE = 8
  const params = useLocalSearchParams()
  const context = require.context(
    "../../assets/content",
    true,
    /^\.\/\w{2}\/kitchen\/posts\/[\w-]+\.md$/,
  )
  const posts: KitchenPost[] = useMemo(
    () =>
      context
        .keys()
        .filter((key) => key.startsWith(`./${params.locale}`))
        .map((key) => {
          const data = matter(context(key), {
            excerpt: false,
          })

          return {
            content: data.content,
            ...data.data,
          } as KitchenPost
        })
        .sort((a, b) => {
          const atime = a.edited
            ? new Date(a.edited).getTime()
            : new Date(a.published).getTime()
          const btime = b.edited
            ? new Date(b.edited).getTime()
            : new Date(b.published).getTime()

          return btime - atime
        })
        .map((post) => ({
          ...post,
          edited:
            post.edited && new Date(post.edited).toLocaleDateString(new Intl.Locale("lt")),
          published: new Date(post.published).toLocaleDateString(new Intl.Locale("lt")),
        })),
    [context, params],
  )
  const list = useMemo(() => {
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

    return {
      page,
      total,
      posts: posts.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE),
    }
  }, [params, posts])

  return list
}

export function useKitchenPost(): KitchenPost | null {
  const params = useLocalSearchParams()
  const context = require.context(
    "../../assets/content",
    true,
    /^\.\/\w{2}\/kitchen\/posts\/[\w-]+\.md$/,
  )
  const post = useMemo(() => {
    const key = context
      .keys()
      .find((key) => key.startsWith(`./${params.locale}`) && key.endsWith(`${params.slug}.md`))

    if (!key) {
      return null
    }

    const post = matter(context(key), {
      excerpt: false,
    })

    return {
      content: post.content,
      ...post.data,
      published: new Date(post.data.published).toLocaleDateString(new Intl.Locale("lt")),
      edited:
        post.data.edited
        && new Date(post.data.edited).toLocaleDateString(new Intl.Locale("lt")),
    }
  }, [context, params])

  return post as KitchenPost
}

function camelize(str: string): string {
  return str.replace(/[_-](\w)/g, (_, char) => char.toUpperCase())
}
