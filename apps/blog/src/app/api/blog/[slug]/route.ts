import type {
  ApiDetailResponse,
  ApiErrorResponse,
  BlogPostDetail,
} from "@portfolio/types";
import { NextResponse } from "next/server";
import { getMdxBySlug } from "@/lib/mdx";

interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
}

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const file = getMdxBySlug<BlogFrontmatter>(slug);

  if (!file) {
    const body: ApiErrorResponse = { error: "Post not found" };
    return NextResponse.json(body, { status: 404 });
  }

  const data: BlogPostDetail = {
    slug: file.slug,
    title: file.frontmatter.title,
    date: file.frontmatter.date,
    excerpt: file.frontmatter.excerpt,
    content: file.content,
  };

  const body: ApiDetailResponse<BlogPostDetail> = { data };
  return NextResponse.json(body);
}
