export interface ProjectSummary {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
}

export interface ProjectDetail extends ProjectSummary {
  content: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
}

export interface ApiListResponse<T> {
  data: T[];
}

export interface ApiDetailResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: string;
}
