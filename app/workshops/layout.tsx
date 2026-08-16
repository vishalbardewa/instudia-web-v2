import { SITE_URL, canonicalFor } from '@/lib/site';

export const metadata = {
  title: "Skill Development Programs in Dimapur",
  description: "Skill development workshops and awareness sessions for students & professionals in Dimapur. Learn Python, web development, and career pathways.",
  alternates: {
    canonical: canonicalFor("/workshops"),
  },
  openGraph: {
    title: "Skill Development Programs in Dimapur",
    description: "Skill development workshops and awareness sessions for students & professionals in Dimapur. Learn Python, web development, and career pathways.",
    url: canonicalFor("/workshops"),
    locale: "en_IN",
    siteName: "instudia",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
        width: 1200,
        height: 630, 
        type: "image/jpeg",
        alt: "Skill Development Programs in Dimapur — instudia",
      },
    ]
  },
  twitter: {
    title: "Skill Development Programs in Dimapur",
    description: "Skill development workshops and awareness sessions for students & professionals in Dimapur. Learn Python, web development, and career pathways.",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9"],
  },
  metadataBase: new URL(SITE_URL),
};

export default function Layout({children}: any) {
  return (
    <div className='relative'>
        {children}
    </div>
  )
}
