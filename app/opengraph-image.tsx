import { ImageResponse } from 'next/og';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export const runtime = 'edge';

// Image metadata
export const alt = 'MeFolio - Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Query to get site settings
const settingsQuery = groq`*[_type == "siteSettings"][0]{
  firstName,
  lastName,
  tagline,
  "profileImageUrl": image.asset->url
}`;

export default async function Image() {
  // Fetch data
  const settings = await client.fetch(settingsQuery);

  const firstName = settings?.firstName || 'SIRAJUL';
  const lastName = settings?.lastName || 'ISLAM';
  const tagline = settings?.tagline || 'Software Quality Assurance Engineer & SDET';
  const fullName = `${firstName} ${lastName}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a', // Dark background
          backgroundImage: 'radial-gradient(circle at 25px 25px, #262626 2%, transparent 0%), radial-gradient(circle at 75px 75px, #262626 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative Elements */}
        <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: '#FF9900', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: '#00FFFF', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '80%' }}>
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
               <span style={{ fontSize: 20, color: '#FF9900', fontWeight: 600 }}>siraajul.vercel.app</span>
            </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
