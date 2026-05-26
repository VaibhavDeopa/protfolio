import Link from "next/link";
import { getBlogPosts } from "@/lib/api";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <h2 className="mb-6 text-xl font-normal">Blog</h2>
      <table className="w-full border-collapse text-sm">
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug} className="align-top">
              <td className="w-28 shrink-0 whitespace-nowrap pr-4 text-muted">
                {formatDate(post.date)}
              </td>
              <td className="pb-4">
                <Link href={`/blog/${post.slug}`} className="block font-normal">
                  {post.title}
                </Link>
                {post.excerpt && (
                  <span className="text-muted"> — {post.excerpt}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
