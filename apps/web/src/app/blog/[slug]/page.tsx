import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/MdxContent";
import { getBlogPost } from "@/lib/api";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type PageProps = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <p className="mb-6 text-sm">
        <Link href="/blog">← Blog</Link>
      </p>
      <p className="mb-2 text-sm text-muted">{formatDate(post.date)}</p>
      <h2 className="mb-8 text-2xl font-normal">{post.title}</h2>
      <MdxContent source={post.content} />
    </>
  );
}
