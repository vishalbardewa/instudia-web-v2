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
    // Removed 2048 & 3840 — useless on mobile, bloats image manifest
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
