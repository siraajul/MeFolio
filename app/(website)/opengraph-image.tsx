import { renderOgImage, OG_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export const alt = "Sirajul Islam - SQA Engineer & SDET";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
