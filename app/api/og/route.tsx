import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || 'instudia | Tech & Skill Institute';
    const category = searchParams.get('category') || 'Dimapur, Nagaland';
    const type = searchParams.get('type') || 'Certification Course';
    const author = searchParams.get('author') || 'instudia Academic Faculty';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0F1012',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Subtle Background Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              backgroundColor: 'rgba(194, 27, 255, 0.15)',
              filter: 'blur(80px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 224, 27, 0.08)',
              filter: 'blur(80px)',
            }}
          />

          {/* Top Bar: Brand & Badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.03em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                instudia<span style={{ color: '#C21BFF' }}>.</span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#A0A0A0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  paddingLeft: '12px',
                  borderLeft: '2px solid rgba(255,255,255,0.15)',
                }}
              >
                Dimapur · Nagaland
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(194, 27, 255, 0.2)',
                border: '1px solid rgba(194, 27, 255, 0.4)',
                borderRadius: '9999px',
                padding: '8px 20px',
                color: '#E279FF',
                fontSize: 14,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {category}
            </div>
          </div>

          {/* Main Title & Type */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
              maxWidth: '960px',
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#FFE01B',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: '16px',
              }}
            >
              {type}
            </div>
            <div
              style={{
                fontSize: title.length > 50 ? 46 : 56,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Bar: Author & Tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#C21BFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: 14,
                }}
              >
                i
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>{author}</div>
                <div style={{ fontSize: 12, color: '#888888' }}>ISO 9001:2015 Verified Institute</div>
              </div>
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#888888',
                letterSpacing: '0.05em',
              }}
            >
              instudianagaland.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
