/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
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
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    // Removed 2048 & 3840 — useless on mobile, bloats image manifest
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
