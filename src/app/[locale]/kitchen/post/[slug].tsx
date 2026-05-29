import NotFound from "@/app/+not-found"
import Post from "@/components/post"
import { useKitchenPost, useKitchenStrings } from "@/hooks/use-content"

export async function generateStaticParams() {
  const context = require.context(
    "../../../../../assets/content",
    true,
    /^\.\/\w{2}\/kitchen\/posts\/[\w-]+\.md$/,
  )
  return context.keys().map((key) => {
    const match = [...key.matchAll(/^\.\/(\w{2})\/kitchen\/posts\/([\w-]+)\.md$/g)][0]
    return { locale: match[1], slug: match[2] }
  })
}

export default function KitchenPost() {
  const strings = useKitchenStrings()
  const post = useKitchenPost()

  if (!post) {
    return <NotFound />
  }

  return <Post strings={strings} post={post} />
}
