import NotFound from "@/app/+not-found"
import Strings from "@/assets/content/blog/blog.json"
import PostList from "@/components/post-list"
import { useBlogPosts } from "@/hooks/use-content"

export async function generateStaticParams() {
  const PER_PAGE = 5
  const context = require.context(
    "../../../../assets/content/blog/posts",
    false,
    /^\.\/[\w-]+\.md$/,
  )
  const pages = Math.ceil(context.keys().length / PER_PAGE)
  return new Array(pages).fill(0).map((_, i) => ({ page: `${i + 1}` }))
}

export default function BlogPostList() {
  const listing = useBlogPosts()

  if (!listing) {
    return <NotFound />
  }

  return <PostList base="/blog" strings={Strings} listing={listing} />
}
