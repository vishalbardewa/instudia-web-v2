import fs from "fs";

const coursesData = JSON.parse(
  fs.readFileSync(new URL("./app/courses.json", import.meta.url), "utf8")
);

const courseRedirects = [];
for (const course of coursesData.courses || []) {
  if (Array.isArray(course.previousSlugs)) {
    for (const prevSlug of course.previousSlugs) {
      courseRedirects.push({
        source: `/courses/${prevSlug}`,
        destination: `/courses/${course.slug}`,
        permanent: true,
      });
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  serverExternalPackages: ['pdf2json', 'mammoth'],
  experimental: {
    optimizePackageImports: ['@heroicons/react', '@headlessui/react', '@tabler/icons-react'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "instudianagaland.com" }],
        destination: "https://www.instudianagaland.com/:path*",
        permanent: true,
      },
      {
        source: "/host-us",
        destination: "/host-a-seminar",
        permanent: true,
      },
      ...courseRedirects,
    ];
  },
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "studio.tailwindui.com" },
      { protocol: "https", hostname: "everpath-course-content.s3-accelerate.amazonaws.com" },
      { protocol: "https", hostname: "easternmirror-assets.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "morungexpress.com" },
      { protocol: "https", hostname: "www.morungexpress.com" },
      { protocol: "https", hostname: "nagalandtribune.in" },
      { protocol: "https", hostname: "nagalandpost.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    const scriptSrc = [
      "script-src 'self' 'unsafe-inline'",
      isDev ? "'unsafe-eval'" : null,
      "https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://tally.so",
    ]
      .filter(Boolean)
      .join(" ");

    const cspDirectives = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://ik.imagekit.io https://res.cloudinary.com https://api.whatsapp.com https://wa.me https://tally.so",
      "frame-src 'self' https://tally.so https://www.google.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "media-src 'self' https: data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://tally.so",
      "frame-ancestors 'self'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
    ]
      .filter(Boolean)
      .join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspDirectives,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
