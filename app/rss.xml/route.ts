import { posts } from '@/app/data/posts';
import { SITE_URL, canonicalFor } from '@/lib/site';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const buildDate = new Date().toUTCString();

  const itemsXml = latestPosts
    .map((post) => {
      const postUrl = canonicalFor(`/blog/${post.slug}`);
      const pubDate = new Date(post.date).toUTCString();

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <dc:creator><![CDATA[${post.author || 'instudia'}]]></dc:creator>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>instudia — Tech &amp; Career Insights in Dimapur</title>
    <link>${SITE_URL}/blog</link>
    <description>Tech tutorials, programming guides, career advice, and industry insights from instudia — Nagaland's top tech training institute in Dimapur.</description>
    <language>en-in</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=14400, stale-while-revalidate=86400',
    },
  });
}
