import { ImageResponse } from 'next/og';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettings } from "@/types/sanity";

export const runtime = 'edge';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

// Image metadata
export const alt = 'Sirajul Islam - SQA Engineer & SDET';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Fetch data
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);

  const firstName = settings?.firstName || 'SIRAJUL';
  const lastName = settings?.lastName || 'ISLAM';
  const tagline = settings?.tagline || 'Software Quality Assurance Engineer & SDET';
  const fullName = `${firstName} ${lastName}`;
  const profileImageUrl = settings?.profileImageUrl;

  let imageSrc: ArrayBuffer | null = null;
  if (profileImageUrl) {
    try {
      // Fetch the remote image and convert it to ArrayBuffer for the Edge runtime
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
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: imageSrc ? 'space-between' : 'center',
          backgroundColor: '#0a0a0a', // Dark background
          backgroundImage: 'radial-gradient(circle at 25px 25px, #262626 2%, transparent 0%), radial-gradient(circle at 75px 75px, #262626 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '0 80px',
        }}
      >
        {/* Decorative Elements */}
        <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: '#FF9900', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: '#00FFFF', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: imageSrc ? 'flex-start' : 'center', textAlign: imageSrc ? 'left' : 'center', maxWidth: imageSrc ? '60%' : '80%', zIndex: 10 }}>
            {/* Name */}
            <h1 style={{ fontSize: 80, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #a3a3a3)', backgroundClip: 'text', color: 'transparent' }}>
              {fullName}
            </h1>
            
            {/* Tagline */}
            <p style={{ fontSize: 32, color: '#a3a3a3', marginTop: 20, lineHeight: 1.4 }}>
              {tagline}
            </p>
            
            {/* Domain */}
            <div style={{ marginTop: 40, padding: '10px 24px', background: '#171717', border: '1px solid #262626', borderRadius: 9999, display: 'flex', alignItems: 'center' }}>
               <span style={{ fontSize: 20, color: '#00FFFF', fontWeight: 600 }}>siraajul.com</span>
            </div>
        </div>

        {imageSrc && (
          <div style={{ display: 'flex', zIndex: 10 }}>
            <img 
              src={imageSrc as any} 
              alt="Profile" 
              style={{ width: '380px', height: '380px', borderRadius: '50%', objectFit: 'cover', border: '8px solid #262626' }}
            />
          </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
