// Server-only entry point — imports fs via parsePost. Never import this in client components.
// For types and formatDate, import from "./types" instead.
import { loadAllPostSummaries, loadPostBySlug, loadAllPosts } from "./parsePost";
export type { Post, PostSummary, Section } from "./types";
export { formatDate } from "./types";
export { loadAllPosts, loadAllPostSummaries, loadPostBySlug };

// Source of truth for listing, carousels, and search: lightweight summaries without AST body
export const posts = loadAllPostSummaries();

export function getPostBySlug(slug: string) {
  return loadPostBySlug(slug);
}
