import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Section, ContentItem } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

/**
 * Parse a markdown body into structured Section blocks.
 *
 * Supported markdown:
 *   ## Heading           → section.heading
 *   plain text line      → { type: "paragraph", text }
 *   - bullet             → { type: "bullets", items } (consecutive - lines merge)
 *   ```lang ... ```      → { type: "code", language, content }
 */
function parseBody(markdown: string): Section[] {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  let current: Section = { items: [] };

  const pushSection = () => {
    if (current.heading !== undefined || current.items.length > 0) {
      sections.push(current);
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    // Blank line — skip
    if (trimmed === "") {
      i++;
      continue;
    }

    // ## Heading → start a new section
    if (trimmed.startsWith("## ")) {
      pushSection();
      current = { heading: trimmed.slice(3).trim(), items: [] };
      i++;
      continue;
    }

    // Fenced code block ```lang
    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimEnd().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      // Trim leading/trailing blank lines inside the block
      const content = codeLines.join("\n").trim();
      if (content) {
        current.items.push({ type: "code", language, content });
      }
      continue;
    }

    // - Bullet point — merge consecutive bullets into one bullets item
    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("- ")) {
        items.push(lines[i].trimEnd().slice(2).trim());
        i++;
      }
      current.items.push({ type: "bullets", items });
      continue;
    }

    // Bold/italic/plain paragraph — strip leading ** ** wrappers for clean text
    const text = trimmed
      .replace(/^\*\*(.+)\*\*$/, "$1")   // **text** → text
      .replace(/^_(.+)_$/, "$1")          // _text_ → text
      .trim();

    if (text) {
      current.items.push({ type: "paragraph", text });
    }
    i++;
  }

  pushSection();
  return sections;
}

/** Load and parse a single markdown post file. */
export function loadPost(filename: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    categoryColor: data.categoryColor,
    date: data.date,
    readTime: data.readTime,
    author: data.author,
    authorRole: data.authorRole,
    authorPhoto: data.authorPhoto,
    coverImage: data.coverImage,
    body: parseBody(content),
  };
}

/** Load all posts from content/posts/, sorted oldest → newest by date. */
export function loadAllPosts(): Post[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"));

  const loaded = files.map(loadPost);
  loaded.sort((a, b) => a.date.localeCompare(b.date));
  return loaded;
}
