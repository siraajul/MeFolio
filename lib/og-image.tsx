import { ImageResponse } from "next/og";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

/** Standard Open Graph card dimensions. */
export const OG_SIZE = { width: 1200, height: 630 };

interface OgImageOptions {
  /** Optional pill label rendered above the name (e.g. "Portfolio", "Resume"). */
  badge?: string;
  /** Prefer `resumeTagline` over the general `tagline` (used by the resume card). */
  useResumeTagline?: boolean;
}

/**
 * Shared Open Graph / Twitter card used by every route's image convention.
 *
 * Renders a 1200×630 PNG with the name, tagline, domain and (when available) the profile
 * photo — all sourced from Sanity Site Settings. Centralizing the satori markup here keeps
 * the homepage, resume and any future cards from duplicating ~90 lines of styling each.
 */
export async function renderOgImage({ badge, useResumeTagline }: OgImageOptions = {}) {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);

  const firstName = settings?.firstName || "SIRAJUL";
  const lastName = settings?.lastName || "ISLAM";
  const tagline =
    (useResumeTagline ? settings?.resumeTagline : undefined) ||
    settings?.tagline ||
    "Software Quality Assurance Engineer & SDET";
  const fullName = `${firstName} ${lastName}`;
  const profileImageUrl = settings?.profileImageUrl;

  // Satori (next/og) needs the raw image bytes; it cannot fetch remote URLs itself.
  let imageSrc: ArrayBuffer | null = null;
  if (profileImageUrl) {
    try {
      const res = await fetch(profileImageUrl);
      imageSrc = await res.arrayBuffer();
    } catch (e) {
      console.error("Failed to fetch profile image for OG:", e);
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: imageSrc ? "space-between" : "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #262626 2%, transparent 0%), radial-gradient(circle at 75px 75px, #262626 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
          padding: "0 80px",
        }}
      >
        {/* Decorative blurred orbs */}
        <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, background: "#FF9900", filter: "blur(200px)", opacity: 0.15, borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -100, right: -100, width: 400, height: 400, background: "#00FFFF", filter: "blur(200px)", opacity: 0.15, borderRadius: "50%" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: imageSrc ? "flex-start" : "center", textAlign: imageSrc ? "left" : "center", maxWidth: imageSrc ? "60%" : "80%", zIndex: 10 }}>
          {badge && (
            <div style={{ marginBottom: 20, padding: "8px 24px", background: "rgba(255, 153, 0, 0.1)", border: "1px solid rgba(255, 153, 0, 0.3)", borderRadius: 9999, display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 18, color: "#FF9900", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{badge}</span>
            </div>
          )}

          <h1 style={{ fontSize: 80, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", background: "linear-gradient(to right, #ffffff, #a3a3a3)", backgroundClip: "text", color: "transparent" }}>
            {fullName}
          </h1>

          <p style={{ fontSize: 32, color: "#a3a3a3", marginTop: 20, lineHeight: 1.4 }}>{tagline}</p>

          <div style={{ marginTop: 40, padding: "10px 24px", background: "#171717", border: "1px solid #262626", borderRadius: 9999, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 20, color: "#00FFFF", fontWeight: 600 }}>siraajul.com</span>
          </div>
        </div>

        {imageSrc && (
          <div style={{ display: "flex", zIndex: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- satori renders raw bytes; next/image is not available in the OG runtime */}
            <img
              src={imageSrc as unknown as string}
              alt="Profile"
              style={{ width: "380px", height: "380px", borderRadius: "50%", objectFit: "cover", border: "8px solid #262626" }}
            />
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE }
  );
}
