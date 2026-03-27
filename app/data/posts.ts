// Server-only entry point — imports fs via parsePost. Never import this in client components.
// For types and formatDate, import from "./types" instead.
import { loadAllPosts } from "./parsePost";
export type { Post, Section } from "./types";
export { formatDate } from "./types";

// Source of truth: content/posts/*.md files
export const posts = loadAllPosts();

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
