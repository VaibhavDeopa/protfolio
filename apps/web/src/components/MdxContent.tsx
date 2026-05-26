function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderBlock(block: string, key: number): React.ReactNode {
  const trimmed = block.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={key} className="text-xl font-normal">
        {trimmed.slice(3)}
      </h2>
    );
  }
  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={key} className="text-lg font-normal">
        {trimmed.slice(4)}
      </h3>
    );
  }
  if (trimmed.startsWith("- ")) {
    const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul key={key}>
        {items.map((item, i) => (
          <li key={i}>{renderInline(item.slice(2))}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key}>
      {trimmed.split("\n").map((line, i, arr) => (
        <span key={i}>
          {renderInline(line)}
          {i < arr.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}

export function MdxContent({ source }: { source: string }) {
  const blocks = source.split(/\n\n+/);
  return <div className="prose max-w-none">{blocks.map(renderBlock)}</div>;
}
