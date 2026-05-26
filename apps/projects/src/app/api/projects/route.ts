import type { ApiListResponse, ProjectSummary } from "@portfolio/types";
import { NextResponse } from "next/server";
import { getAllMdx } from "@/lib/mdx";

interface ProjectFrontmatter {
  title: string;
  description: string;
  date?: string;
  tags?: string[];
}

export async function GET() {
  const files = getAllMdx<ProjectFrontmatter>();
  const data: ProjectSummary[] = files
    .map(({ slug, frontmatter }) => ({
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      tags: frontmatter.tags,
    }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  const body: ApiListResponse<ProjectSummary> = { data };
  return NextResponse.json(body);
}
