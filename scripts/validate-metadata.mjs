import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://www.instudianagaland.com';
const BRAND_SUFFIX = ' | instudia';

let errors = [];
let warnings = [];

// 1. Validate Authors
console.log('🔍 Validating authors from data/authors.ts...');
const authorsFile = fs.readFileSync(path.resolve('./data/authors.ts'), 'utf8');
const authorKeys = [...authorsFile.matchAll(/['"]([a-z0-9-]+)['"]:\s*\{/g)].map((m) => m[1]);

// 2. Validate Courses
console.log('🔍 Validating courses.json...');
const coursesRaw = fs.readFileSync(path.resolve('./app/courses.json'), 'utf8');
const coursesData = JSON.parse(coursesRaw);
const courseSlugs = new Set();

for (const course of coursesData.courses || []) {
  if (courseSlugs.has(course.slug)) {
    errors.push(`Duplicate course slug found in courses.json: ${course.slug}`);
  }
  courseSlugs.add(course.slug);

  const rawTitle = course.fullTitle || course.slug;
  if (/instudia/i.test(rawTitle)) {
    errors.push(`Course title contains brand name: "${rawTitle}"`);
  }
}

// 3. Validate Blog Posts
console.log('🔍 Validating blog posts in content/posts/...');
const blogSlugs = new Set();
const seenDescriptions = new Map();

function scanBlogPosts(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanBlogPosts(full);
    } else if (f.endsWith('.md')) {
      const relPath = path.relative('.', full);
      const fileContent = fs.readFileSync(full, 'utf8');
      const { data } = matter(fileContent);

      if (!data.slug) {
        errors.push(`${relPath}: missing slug in frontmatter`);
      } else {
        if (blogSlugs.has(data.slug)) {
          errors.push(`${relPath}: duplicate slug "${data.slug}"`);
        }
        blogSlugs.add(data.slug);
      }

      if (!data.title) {
        errors.push(`${relPath}: missing title in frontmatter`);
      } else {
        if (/\|\s*instudia/i.test(data.title) || /-\s*instudia/i.test(data.title)) {
          errors.push(`${relPath}: title contains brand suffix "${data.title}"`);
        }
        const renderedTitle = `${data.title}${BRAND_SUFFIX}`;
        if (renderedTitle.length > 70) {
          warnings.push(`${relPath}: rendered title length is ${renderedTitle.length} chars (target <= 60-70)`);
        }
      }

      if (!data.excerpt) {
        errors.push(`${relPath}: missing excerpt/description`);
      } else {
        const desc = data.excerpt.trim();
        if (desc.length < 50) {
          errors.push(`${relPath}: excerpt too short (${desc.length} chars)`);
        }
        if (desc.length > 300) {
          warnings.push(`${relPath}: excerpt long (${desc.length} chars)`);
        }
        if (seenDescriptions.has(desc)) {
          warnings.push(`${relPath}: duplicate excerpt shared with ${seenDescriptions.get(desc)}`);
        } else {
          seenDescriptions.set(desc, relPath);
        }
      }

      if (!data.authorSlug) {
        errors.push(`${relPath}: missing authorSlug`);
      } else if (!authorKeys.includes(data.authorSlug)) {
        errors.push(`${relPath}: authorSlug "${data.authorSlug}" does not exist in data/authors.ts`);
      }

      if (!data.date) {
        errors.push(`${relPath}: missing publication date`);
      }
      if (!data.dateModified) {
        errors.push(`${relPath}: missing dateModified`);
      }
    }
  }
}

scanBlogPosts(path.resolve('./content/posts'));

// 4. Report
console.log('\n--- METADATA VALIDATION REPORT ---');
if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} Warnings:`);
  for (const w of warnings) {
    console.log(`  - ${w}`);
  }
}

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} Errors encountered:`);
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  console.error('\nBuild-time metadata validation failed!');
  process.exit(1);
}

console.log('✅ All metadata validation checks passed successfully!\n');
