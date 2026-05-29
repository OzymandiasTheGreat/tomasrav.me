import { useLocalSearchParams } from "expo-router"

import NotFound from "@/app/+not-found"
import PostList from "@/components/post-list"
import { useKitchenPosts, useKitchenStrings } from "@/hooks/use-content"

export async function generateStaticParams(params: { locale: string }) {
  const PER_PAGE = 8
  const localeContext = require.context(
    "../../../../../assets/content",
    true,
    /^\.\/\w{2}\/locale\.js$/,
  )
  const locales = localeContext.keys().map((key) => localeContext(key))
  const postContext = require.context(
    "../../../../../assets/content",
    true,
    /^\.\/\w{2}\/kitchen\/posts\/[\w-]+\.md$/,
  )
  const pages = Math.ceil(postContext.keys().length / locales.length / PER_PAGE)
  return new Array(pages)
    .fill(0)
    .flatMap((_, i) => locales.map((locale) => ({ locale, page: `${i + 1}` })))
}

export default function KitchenPostList() {
  const { locale } = useLocalSearchParams()
  const strings = useKitchenStrings()
  const listing = useKitchenPosts()

  if (!listing) {
    return <NotFound />
  }

  return <PostList base={`${locale}/kitchen`} strings={strings} listing={listing} />
}
