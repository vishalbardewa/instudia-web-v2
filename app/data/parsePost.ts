import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Section, ContentItem } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

/**
 * Parse a markdown body into structured Section blocks.
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

    if (trimmed === "") {
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      pushSection();
      current = { heading: trimmed.slice(3).trim(), items: [] };
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      current.items.push({ type: "subheading", text: trimmed.slice(4).trim() });
      i++;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimEnd().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      const content = codeLines.join("\n").trim();
      if (content) {
        current.items.push({ type: "code", language, content });
      }
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("- ")) {
        items.push(lines[i].trimEnd().slice(2).trim());
        i++;
      }
      current.items.push({ type: "bullets", items });
      continue;
    }

    const text = trimmed.trim();

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

/** Recursively get all markdown files from a directory, relative to POSTS_DIR. */
function getAllFiles(dirPath: string): string[] {
  const files: string[] = [];
  const list = fs.readdirSync(dirPath);
  for (const item of list) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (item.endsWith(".md")) {
      files.push(path.relative(POSTS_DIR, fullPath));
    }
  }
  return files;
}

/** Load all posts from content/posts/ and its subdirectories, sorted newest → oldest by date. */
export function loadAllPosts(): Post[] {
  const files = getAllFiles(POSTS_DIR);
  const loaded = files
    .map((f) => {
      try {
        return loadPost(f);
      } catch (err) {
        console.error(`Error loading post ${f}:`, err);
        return null;
      }
    })
    .filter((p): p is Post => p !== null && typeof p.slug === "string" && p.slug.length > 0);

  // Sort descending: newest first
  loaded.sort((a, b) => b.date.localeCompare(a.date));
  return loaded;
}
