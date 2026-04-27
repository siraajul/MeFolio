interface DividerBlockProps {
  style?: "line" | "dots" | "space";
}

export function DividerBlock({ style = "line" }: DividerBlockProps) {
  if (style === "space") {
    return <div className="my-12 not-prose" />;
  }

  if (style === "dots") {
    return (
      <div className="my-12 flex items-center justify-center gap-2 not-prose">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
      </div>
    );
  }

  // Default: line
  return (
    <div className="my-12 not-prose">
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
    </div>
  );
}
