export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>Projects API</h1>
      <p>
        JSON endpoints: <code>GET /api/projects</code>,{" "}
        <code>GET /api/projects/[slug]</code>
      </p>
    </main>
  );
}
