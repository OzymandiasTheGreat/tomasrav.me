import { useLocalSearchParams } from "expo-router"

import NotFound from "@/app/+not-found"
import PostList from "@/components/post-list"
import { useKitchenPosts, useKitchenStrings } from "@/hooks/use-content"

export async function generateStaticParams(params: { locale: string }) {
  const PER_PAGE = 8
  const context = require.context(
    "../../../../../assets/content",
    true,
    /^\.\/\w{2}\/kitchen\/posts\/[\w-]+\.md$/,
  )
  const pages = Math.ceil(
    context.keys().filter((key) => key.startsWith(`./${params.locale}`)).length / PER_PAGE,
  )
  return new Array(pages).fill(0).map((_, i) => ({ ...params, page: `${i + 1}` }))
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
