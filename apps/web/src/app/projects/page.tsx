import Link from "next/link";
import { getProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <h2 className="mb-6 text-xl font-normal">Projects</h2>
      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.slug}>
            <h3 className="text-lg font-normal">
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <p className="text-muted">{project.description}</p>
            {project.tags && project.tags.length > 0 && (
              <p className="mt-1 text-sm text-muted">
                {project.tags.join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
