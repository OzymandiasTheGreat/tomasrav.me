import { useMemo } from "react"

import { useLocale } from "./use-locale"

export interface MainStrings {
  home: {
    downloads: string
    intro: string
    location: string
    me: string
    quote: string
    showcase: string
    stars: string
    support: string
  }
  notFound: {
    attribution: string
    go_home: string
    quote: string
  }
}

export function useMainStrings(): MainStrings {
  const [locale] = useLocale()
  const strings = useMemo(() => {
    const context = require.context(
      "../../assets/content",
      true,
      /^\.\/\w{2}\/main\/.+\.(json|md)$/,
    )
    const strings: Record<string, Record<string, string>> = {}

    for (const path of context.keys()) {
      const jsonRegex = new RegExp(`^\./${locale}/main/([\\w-]+)\.json$`, "g")
      const markdownRegex = new RegExp(`^\./${locale}/main/([\\w-]+)/([\\w-]+)\.md$`, "g")

      const json = [...path.matchAll(jsonRegex)][0]
      const markdown = [...path.matchAll(markdownRegex)][0]

      if (json) {
        const key = camelize(json[1])
        strings[key] = Object.assign({}, strings[key], context(path))
      }

      if (markdown) {
        const parent = camelize(markdown[1])
        const key = camelize(markdown[2])
        strings[parent] = Object.assign({}, strings[parent], { [key]: context(path) })
      }
    }

    return strings as unknown as MainStrings
  }, [locale])

  return strings
}

function camelize(str: string): string {
  return str.replace(/[_-](\w)/g, (_, char) => char.toUpperCase())
}
