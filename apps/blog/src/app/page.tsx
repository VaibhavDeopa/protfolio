export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>Blog API</h1>
      <p>
        JSON endpoints: <code>GET /api/blog</code>,{" "}
        <code>GET /api/blog/[slug]</code>
      </p>
    </main>
  );
}
