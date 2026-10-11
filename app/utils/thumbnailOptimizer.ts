/**
 * Generates an optimized thumbnail URL with dynamic CDN transforms for Cloudinary, ImageKit, and Unsplash.
 * Defaults to 600px width WebP/AVIF auto-formatting to eliminate megabyte-level data transfers on blog listings.
 */
export function getOptimizedThumbnail(src: string, width = 600): string {
  if (!src) return src;

  // ImageKit
  if (src.includes("ik.imagekit.io")) {
    if (src.includes("tr:")) return src;
    const parts = src.split("/blog-images/");
    if (parts.length === 2) {
      return `${parts[0]}/tr:w-${width},f-webp,q-80/blog-images/${parts[1]}`;
    }
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}tr=w-${width},f-webp,q-80`;
  }

  // Unsplash
  if (src.includes("images.unsplash.com")) {
    try {
      const url = new URL(src);
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", "75");
      url.searchParams.set("auto", "format");
      return url.toString();
    } catch {
      return src;
    }
  }

  // Cloudinary
  if (src.includes("res.cloudinary.com")) {
    if (src.includes("/upload/f_auto") || src.includes(`/upload/w_${width}`)) return src;
    return src.replace("/image/upload/", `/image/upload/w_${width},f_auto,q_auto/`);
  }

  return src;
}
