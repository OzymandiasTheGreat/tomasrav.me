import { useMemo } from "react"
import { Page, Pages } from "@/content"
import { useLocale } from "./useLocale"

export const usePages = (page: Page): string => {
  const [locale] = useLocale()
  const content = useMemo(() => Pages[locale]?.[page], [locale])
  return content
}
