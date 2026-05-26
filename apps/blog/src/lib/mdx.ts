import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface MdxFile<T extends object> {
  slug: string;
  frontmatter: T;
  content: string;
}

function getMdxPaths(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(CONTENT_DIR, file));
}

export function getAllMdx<T extends object>(): MdxFile<T>[] {
  return getMdxPaths().map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const slug = path.basename(filePath, ".mdx");
    return { slug, frontmatter: data as T, content: content.trim() };
  });
}

export function getMdxBySlug<T extends object>(
  slug: string
): MdxFile<T> | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as T, content: content.trim() };
}
