import { ImageResponse } from 'next/og'
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettings } from "@/types/sanity";

export const alt = 'Resume'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Image() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);

  const firstName = settings?.firstName || "Sirajul";
  const lastName = settings?.lastName || "Islam";
  const tagline = settings?.resumeTagline || settings?.tagline || "SQA Engineer & SDET";
  const profileImageUrl = settings?.profileImageUrl;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #171717, #0a0a0a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flex: 1,
          paddingLeft: '80px',
        }}>
          <div style={{
            fontSize: 32,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#a3a3a3',
            marginBottom: '20px',
            display: 'flex',
          }}>
            Resume
          </div>
          <h1 style={{ 
            fontSize: 80, 
            fontWeight: 'bold', 
            margin: 0, 
            padding: 0, 
            lineHeight: 1.1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <span style={{ display: 'flex' }}>{firstName}</span>
            <span style={{ display: 'flex' }}>{lastName}</span>
          </h1>
          <p style={{ 
            fontSize: 40, 
            color: '#d4d4d4', 
            marginTop: '20px',
            display: 'flex'
          }}>
            {tagline}
          </p>
        </div>
        {profileImageUrl && (
          <div style={{ display: 'flex', paddingRight: '80px' }}>
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              style={{ width: '400px', height: '400px', borderRadius: '50%', objectFit: 'cover', border: '8px solid #262626' }}
            />
          </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  )
}
