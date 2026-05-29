import NotFound from "@/app/+not-found"
import Strings from "@/assets/content/blog/blog.json"
import Post from "@/components/post"
import { useBlogPost } from "@/hooks/use-content"

export async function generateStaticParams() {
  const context = require.context(
    "../../../../assets/content/blog/posts",
    false,
    /^\.\/[\w-]+\.md$/,
  )
  return context.keys().map((key) => {
    const match = [...key.matchAll(/^\.\/([\w-]+)\.md$/g)][0]
    return { slug: match[1] }
  })
}

export default function BlogPost() {
  const post = useBlogPost()

  if (!post) {
    return <NotFound />
  }

  return <Post strings={Strings} post={post} />
}
