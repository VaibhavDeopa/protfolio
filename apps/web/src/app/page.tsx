import Link from "next/link";
import { getBlogPosts, getProjects } from "@/lib/api";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);

  return (
    <>
      <section className="mb-12">
        <p className="mb-4">
          Hi there! Welcome to my personal page. I work on computer graphics,
          light transport, and GPU architectures. This site is powered by a
          Turborepo monorepo with separate <strong>projects</strong> and{" "}
          <strong>blog</strong> microservices.
        </p>
        <p className="text-muted">
          Chronological highlights from research and industry roles appear in
          the news section below.
        </p>
      </section>

      <section id="research" className="mb-12">
        <h2 className="mb-4 text-xl font-normal">Research at a glance</h2>
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="font-normal">
                {project.title}
              </Link>
              <span className="text-muted"> — {project.description}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/projects">View all projects →</Link>
        </p>
      </section>

      <section id="news" className="mb-4">
        <h2 className="mb-4 text-xl font-normal">News</h2>
        <hr className="mb-4 border-border" />
        <table className="w-full border-collapse text-sm">
          <tbody>
            {posts.slice(0, 8).map((post) => (
              <tr key={post.slug} className="align-top">
                <td className="w-28 shrink-0 whitespace-nowrap pr-4 text-muted">
                  {formatDate(post.date)}
                </td>
                <td className="pb-3">
                  <Link href={`/blog/${post.slug}`}>
                    {post.excerpt ?? post.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm">
          <Link href="/blog">Full blog archive →</Link>
        </p>
      </section>
    </>
  );
}
