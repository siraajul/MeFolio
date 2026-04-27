import { ArrowUpRight } from "lucide-react";

interface CtaButtonProps {
  text: string;
  url: string;
  style?: "primary" | "secondary" | "outline";
}

export function CtaButton({ text, url, style = "primary" }: CtaButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]";

  const styleClasses: Record<string, string> = {
    primary: "bg-brand text-white hover:opacity-90 shadow-brand/25",
    secondary: "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700",
    outline: "bg-transparent text-foreground border-2 border-neutral-300 dark:border-neutral-700 hover:border-brand hover:text-brand",
  };

  return (
    <div className="my-8 not-prose">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${styleClasses[style] || styleClasses.primary}`}
      >
        {text}
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
}
