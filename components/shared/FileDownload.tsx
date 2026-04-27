import { Download, FileText } from "lucide-react";

interface FileDownloadProps {
  title: string;
  description?: string;
  fileUrl: string;
}

export function FileDownload({ title, description, fileUrl }: FileDownloadProps) {
  return (
    <div className="my-8 not-prose">
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-brand/30 hover:bg-neutral-900 transition-all duration-300"
      >
        <div className="shrink-0 w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
          <FileText className="w-6 h-6 text-brand" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-neutral-200 group-hover:text-white transition-colors truncate">
            {title}
          </p>
          {description && (
            <p className="text-xs text-neutral-500 mt-0.5 truncate">
              {description}
            </p>
          )}
        </div>
        <div className="shrink-0 w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
          <Download className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
        </div>
      </a>
    </div>
  );
}
