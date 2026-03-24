// Sanity Client Configuration
import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2024-01-01",
    useCdn: true, // Set to true to use Sanity's edge cache for faster queries
    stega: {
      studioUrl: "/studio",
    },
});

const builder = createImageUrlBuilder(client);

/**
 * Returns a Sanity image URL builder pre-configured with:
 * - auto=format → serves WebP/AVIF based on browser support (no code changes needed per image)
 * - q=80        → 80% quality (visually indistinguishable, ~40% smaller file size)
 *
 * Usage: urlFor(source).width(800).url()
 */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
    return builder.image(source).auto("format").quality(80);
}
