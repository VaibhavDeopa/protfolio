import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/MdxContent";
import { getProject } from "@/lib/api";

type PageProps = { params: Promise<{ slug: string }> };

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <p className="mb-6 text-sm">
        <Link href="/projects">← Projects</Link>
      </p>
      <h2 className="mb-2 text-2xl font-normal">{project.title}</h2>
      <p className="mb-8 text-muted">{project.description}</p>
      <MdxContent source={project.content} />
    </>
  );
}
