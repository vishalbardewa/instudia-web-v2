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
        if (language === "chart") {
          try {
            const chartData = JSON.parse(content);
            current.items.push({
              type: "chart",
              chartType: chartData.type || "bar",
              title: chartData.title,
              data: chartData.data || [],
              units: chartData.units,
            });
          } catch (err) {
            console.error("[parsePost] Failed to parse chart JSON:", err);
            current.items.push({ type: "code", language, content });
          }
        } else if (language === "json" || language === "widget" || language === "text") {
          try {
            const cleanContent = content.startsWith("JSON") ? content.slice(4).trim() : content;
            const parsed = JSON.parse(cleanContent);
            if (parsed && parsed.widgetSpec && parsed.widgetSpec.id) {
              current.items.push({
                type: "widget",
                widgetId: parsed.widgetSpec.id,
                spec: parsed.widgetSpec,
              });
            } else {
              current.items.push({ type: "code", language, content });
            }
          } catch {
            current.items.push({ type: "code", language, content });
          }
        } else {
          current.items.push({ type: "code", language, content });
        }
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

    if (trimmed.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("* ")) {
        items.push(lines[i].trimEnd().slice(2).trim());
        i++;
      }
      current.items.push({ type: "links", items });
      continue;
    }

    if (/^\d+\. /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trimEnd())) {
        items.push(lines[i].trimEnd().replace(/^\d+\. /, "").trim());
        i++;
      }
      current.items.push({ type: "list-ordered", items });
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("> ")) {
        quoteLines.push(lines[i].trimEnd().slice(2).trim());
        i++;
      }
      
      let text = quoteLines.join("\n");
      let fontSize: string | undefined = undefined;
      let textCase: any = undefined;
      let calloutType: string | undefined = undefined;

      // Check for attributes in brackets at the start: [size:xl, case:upper, type:event]
      const attrMatch = text.match(/^\[(.*?)\]\s*/);
      if (attrMatch) {
        const attrs = attrMatch[1].split(",").map(a => a.trim());
        attrs.forEach(attr => {
          if (attr.startsWith("size:")) fontSize = attr.replace("size:", "").trim();
          if (attr.startsWith("type:")) calloutType = attr.replace("type:", "").trim();
          if (attr.startsWith("case:")) {
            const c = attr.replace("case:", "").trim();
            if (["uppercase", "lowercase", "capitalize", "normal", "upper", "lower", "cap"].includes(c)) {
              if (c === "upper") textCase = "uppercase";
              else if (c === "lower") textCase = "lowercase";
              else if (c === "cap") textCase = "capitalize";
              else textCase = c;
            }
          }
        });
        text = text.replace(attrMatch[0], "");
      }

      current.items.push({ type: "blockquote", text, fontSize, textCase, calloutType });
      continue;
    }

    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      current.items.push({ type: "divider" });
      i++;
      continue;
    }

    const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      current.items.push({ type: "image", alt: imageMatch[1], src: imageMatch[2] });
      i++;
      continue;
    }

    const text = trimmed.trim();

    if (text) {
      if (text.includes("widgetSpec") && (text.startsWith("JSON") || text.startsWith("{"))) {
        try {
          const rawJson = text.replace(/^JSON\s*/, "").trim();
          const parsed = JSON.parse(rawJson);
          if (parsed && parsed.widgetSpec && parsed.widgetSpec.id) {
            current.items.push({
              type: "widget",
              widgetId: parsed.widgetSpec.id,
              spec: parsed.widgetSpec,
            });
            i++;
            continue;
          }
        } catch {
          // ignore error and proceed as standard paragraph
        }
      }

      // Group table lines: if it starts with '|', gather all consecutive lines
      if (text.startsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trimStart().startsWith("|")) {
          tableLines.push(lines[i].trimEnd());
          i++;
        }
        current.items.push({ type: "paragraph", text: tableLines.join("\n") });
        continue; // 'i' is already moved to the next non-table line
      } else {
        current.items.push({ type: "paragraph", text });
      }
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
    authorBio: data.authorBio,
    coverImage: data.coverImage,
    ogImage: data.ogImage,
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
