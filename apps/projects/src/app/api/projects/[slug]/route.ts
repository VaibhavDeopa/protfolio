import type { ApiDetailResponse, ApiErrorResponse, ProjectDetail } from "@portfolio/types";
import { NextResponse } from "next/server";
import { getMdxBySlug } from "@/lib/mdx";

interface ProjectFrontmatter {
  title: string;
  description: string;
  date?: string;
  tags?: string[];
}

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const file = getMdxBySlug<ProjectFrontmatter>(slug);

  if (!file) {
    const body: ApiErrorResponse = { error: "Project not found" };
    return NextResponse.json(body, { status: 404 });
  }

  const data: ProjectDetail = {
    slug: file.slug,
    title: file.frontmatter.title,
    description: file.frontmatter.description,
    date: file.frontmatter.date,
    tags: file.frontmatter.tags,
    content: file.content,
  };

  const body: ApiDetailResponse<ProjectDetail> = { data };
  return NextResponse.json(body);
}
