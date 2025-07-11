import React from 'react'
import { AppConfig } from '../_utils/AppConfig';

export const metadata = {
  title:"Skill Development Courses in Dimapur | instudia",
  description:"Skill development workshops conducted by in Dimapur. Our awareness sessions for students & professionals. Learn Fundamental training,Python, web development, career pathways and many more",
  openGraph: {
    title: "Skill Development initiatives with instudia",
    description: "Skill development workshops conducted by in Dimapur. Our awareness sessions for students & professionals. Learn Fundamental training,Python, web development, career pathways and many more",
    url: `${AppConfig.canonicalBase}`,
    locale: AppConfig.locale,
    siteName: AppConfig.site_name,
    images: [
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
        width: 1200,
        height: 630, 
        type: "image/jpeg",
        alt: "Upskill with instudia",
      },
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
        width: 1200,
        height: 630, 
        alt: "Enroll with instudia",
        type: "image/jpeg",
      },
    ]
  },
  twitter: {
    title:"Skill Development Courses in Dimapur | instudia",
  description:"Elevate your career with premier computer and skill training in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
    card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  },
  metadataBase: new URL("https://instudianagaland.com"),
  keywords: [
    "skill development",
    "Dimapur computer training",
    "Nagaland job skills",
    "Tally GST",
    "web development course",
    "programming classes Dimapur",
    "digital skills training",
    "career advancement courses"
  ]
};

export default function Layout({children}: any) {
  return (
    <div className='relative'>
        {children}
    </div>
  )
}
