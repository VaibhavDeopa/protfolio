import type {
  ApiDetailResponse,
  ApiListResponse,
  BlogPostDetail,
  BlogPostSummary,
  ProjectDetail,
  ProjectSummary,
} from "@portfolio/types";

const projectsBase =
  process.env.PROJECTS_API_URL ?? "http://localhost:3001";
const blogBase = process.env.BLOG_API_URL ?? "http://localhost:3002";

async function fetchProjectsJson<T>(path: string): Promise<T> {
  const res = await fetch(`${projectsBase}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Projects API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

async function fetchBlogJson<T>(path: string): Promise<T> {
  const res = await fetch(`${blogBase}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Blog API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const json =
    await fetchProjectsJson<ApiListResponse<ProjectSummary>>("/api/projects");
  return json.data;
}

export async function getProject(slug: string): Promise<ProjectDetail | null> {
  const res = await fetch(`${projectsBase}/api/projects/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Projects API error: ${res.status}`);
  const json = (await res.json()) as ApiDetailResponse<ProjectDetail>;
  return json.data;
}

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const json =
    await fetchBlogJson<ApiListResponse<BlogPostSummary>>("/api/blog");
  return json.data;
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  const res = await fetch(`${blogBase}/api/blog/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog API error: ${res.status}`);
  const json = (await res.json()) as ApiDetailResponse<BlogPostDetail>;
  return json.data;
}
