import Image from "next/image";
import type { ComponentProps } from "react";
import { urlFor } from "@/sanity/lib/client";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { Callout } from "@/components/shared/Callout";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { MetricBlock } from "@/components/shared/MetricBlock";
import { DividerBlock } from "@/components/shared/DividerBlock";
import { CtaButton } from "@/components/shared/CtaButton";
import { FileDownload } from "@/components/shared/FileDownload";
import { TableBlock } from "@/components/shared/TableBlock";

/**
 * Shared Portable Text renderer map for Sanity rich content.
 *
 * Blog posts and project case studies render the SAME set of custom blocks, so the
 * configuration lives here instead of being duplicated in each page. Each block's `value`
 * is typed via `ComponentProps<typeof Block>` so the renderer and the component it feeds
 * can never drift out of sync.
 *
 * The only per-page difference is the inline image's framing, exposed via `imageClassName`
 * and `imageFallbackAlt`.
 */

/** A Sanity image object as it arrives embedded inside Portable Text content. */
interface SanityImageValue {
  _type?: string;
  alt?: string;
  caption?: string;
  asset?: { _ref?: string };
}

/** A Sanity file-download block (resolved to a CDN URL at render time). */
interface FileDownloadValue {
  title?: string;
  description?: string;
  file?: { asset?: { _ref?: string } };
}

export interface PortableTextOptions {
  /** Tailwind classes for the wrapper around inline images. */
  imageClassName?: string;
  /** Alt text used when an inline image has no `alt` set. */
  imageFallbackAlt?: string;
}

/** Build a Portable Text component map, framing inline images per the given options. */
export function getPortableTextComponents(options: PortableTextOptions = {}) {
  const {
    imageClassName = "relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800",
    imageFallbackAlt = "Image",
  } = options;

  return {
    types: {
      image: ({ value }: { value: SanityImageValue }) => (
        <div className={imageClassName}>
          <Image
            src={urlFor(value).url()}
            alt={value.alt || imageFallbackAlt}
            fill
            className="object-cover"
            unoptimized // Sanity handles optimization; also keeps GIFs animated.
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 text-white text-xs text-center backdrop-blur-sm">
              {value.caption}
            </div>
          )}
        </div>
      ),
      code: ({ value }: { value: ComponentProps<typeof CodeBlock> }) => (
        <CodeBlock code={value.code} language={value.language} filename={value.filename} />
      ),
      callout: ({ value }: { value: ComponentProps<typeof Callout> }) => (
        <Callout style={value.style} title={value.title} body={value.body} />
      ),
      youtubeEmbed: ({ value }: { value: ComponentProps<typeof YouTubeEmbed> }) => (
        <YouTubeEmbed url={value.url} caption={value.caption} />
      ),
      metricBlock: ({ value }: { value: ComponentProps<typeof MetricBlock> }) => (
        <MetricBlock metrics={value.metrics} />
      ),
      dividerBlock: ({ value }: { value: ComponentProps<typeof DividerBlock> }) => (
        <DividerBlock style={value.style} />
      ),
      ctaButton: ({ value }: { value: ComponentProps<typeof CtaButton> }) => (
        <CtaButton text={value.text} url={value.url} style={value.style} />
      ),
      fileDownload: ({ value }: { value: FileDownloadValue }) => {
        // Sanity file refs look like "file-<id>-<ext>"; the CDN URL needs "<id>.<ext>".
        const fileUrl = value.file?.asset?._ref
          ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.file.asset._ref.replace("file-", "").replace("-", ".")}`
          : "#";
        return <FileDownload title={value.title ?? ""} description={value.description} fileUrl={fileUrl} />;
      },
      tableBlock: ({ value }: { value: ComponentProps<typeof TableBlock> }) => (
        <TableBlock caption={value.caption} hasHeader={value.hasHeader} rows={value.rows} />
      ),
    },
  };
}
