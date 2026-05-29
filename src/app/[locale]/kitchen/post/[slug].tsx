import NotFound from "@/app/+not-found"
import Post from "@/components/post"
import { useKitchenPost, useKitchenStrings } from "@/hooks/use-content"

export async function generateStaticParams(params: { locale: string }) {
  const context = require.context(
    "../../../../../assets/content",
    true,
    /^\.\/\w{2}\/kitchen\/posts\/[\w-]+\.md$/,
  )
  return context
    .keys()
    .filter((key) => key.startsWith(`./${params.locale}`))
    .map((key) => {
      const match = [...key.matchAll(/^\.\/\w{2}\/kitchen\/posts\/([\w-]+)\.md$/g)][0]
      return { ...params, slug: match[1] }
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
