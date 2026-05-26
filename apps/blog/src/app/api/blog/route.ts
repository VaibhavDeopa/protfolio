import type { ApiListResponse, BlogPostSummary } from "@portfolio/types";
import { NextResponse } from "next/server";
import { getAllMdx } from "@/lib/mdx";

interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
}

export async function GET() {
  const files = getAllMdx<BlogFrontmatter>();
  const data: BlogPostSummary[] = files
    .map(({ slug, frontmatter }) => ({
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const body: ApiListResponse<BlogPostSummary> = { data };
  return NextResponse.json(body);
}
