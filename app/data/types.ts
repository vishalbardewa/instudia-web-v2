// Shared types and pure utilities — safe to import in both server and client code.

export type ContentItem =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "list-ordered"; items: string[] }
  | { type: "links"; items: string[] }
  | { type: "blockquote"; text: string; fontSize?: string; textCase?: "uppercase" | "lowercase" | "capitalize" | "normal"; calloutType?: string }
  | { type: "divider" }
  | { type: "image"; src: string; alt: string }
  | { type: "chart"; chartType: "bar" | "line" | "area"; title?: string; data: any[]; units?: string }
  | { type: "widget"; widgetId: string; spec?: any }
  | { type: "code"; language: string; content: string };

export interface Section {
  heading?: string;
  /** Ordered content: paragraphs, bullet lists, and code blocks in document order. */
  items: ContentItem[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;           // ISO "YYYY-MM-DD"
  readTime: string;
  author: string;
  authorRole: string;
  authorPhoto: string;
  /** Optional short biography shown below the article */ 
  authorBio?: string;
  coverImage: string;
  ogImage?: string;
  body: Section[];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
