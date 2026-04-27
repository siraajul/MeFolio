"use client";

interface CalloutProps {
  style: "tip" | "note" | "warning" | "caution" | "success";
  title?: string;
  body: string;
}

const calloutConfig: Record<string, { icon: string; label: string; borderColor: string; bgColor: string; iconBg: string; textColor: string }> = {
  tip: {
    icon: "💡",
    label: "Tip",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    iconBg: "bg-emerald-500/10",
    textColor: "text-emerald-400",
  },
  note: {
    icon: "📝",
    label: "Note",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/5",
    iconBg: "bg-blue-500/10",
    textColor: "text-blue-400",
  },
  warning: {
    icon: "⚠️",
    label: "Warning",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/5",
    iconBg: "bg-amber-500/10",
    textColor: "text-amber-400",
  },
  caution: {
    icon: "🚨",
    label: "Caution",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/5",
    iconBg: "bg-red-500/10",
    textColor: "text-red-400",
  },
  success: {
    icon: "✅",
    label: "Success",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/5",
    iconBg: "bg-green-500/10",
    textColor: "text-green-400",
  },
};

export function Callout({ style, title, body }: CalloutProps) {
  const config = calloutConfig[style] || calloutConfig.note;

  return (
    <div className={`my-8 rounded-xl border-l-4 ${config.borderColor} ${config.bgColor} p-5 not-prose`}>
      <div className="flex items-start gap-3">
        <span className={`shrink-0 w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center text-base`}>
          {config.icon}
        </span>
        <div className="min-w-0">
          <p className={`font-semibold text-sm uppercase tracking-wider ${config.textColor} mb-1`}>
            {title || config.label}
          </p>
          <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
