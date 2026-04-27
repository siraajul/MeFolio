interface Metric {
  value: string;
  label: string;
}

interface MetricBlockProps {
  metrics: Metric[];
}

export function MetricBlock({ metrics }: MetricBlockProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="my-10 not-prose">
      <div className={`grid gap-4 ${
        metrics.length === 1 ? "grid-cols-1 max-w-xs mx-auto" :
        metrics.length === 2 ? "grid-cols-2" :
        metrics.length === 3 ? "grid-cols-3" :
        "grid-cols-2 md:grid-cols-4"
      }`}>
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="relative group text-center p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-brand/30 transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <p className="text-3xl md:text-4xl font-bold text-brand mb-1 tracking-tight">
                {metric.value}
              </p>
              <p className="text-xs md:text-sm text-neutral-400 uppercase tracking-wider font-medium">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
