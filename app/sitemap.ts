import { MetadataRoute } from 'next';
import { slugs } from './routes';
import { posts } from './data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.instudianagaland.com';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/workshops',
    '/courses',
    '/faq',
    '/blog',
    '/careers',
    '/privacy-policy',
    '/cookie-policy',
    '/terms',
    '/tools',
    '/tools/career-blueprint',
    '/tools/career-planner',
    '/tools/ats-analyzer',
    '/tools/salary-insights',
    '/tools/study-planner',
    '/tools/assessment-designer',
    '/tools/lecture-note-generator',
    '/gallery',
    '/success-stories',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.startsWith('/tools') ? 'monthly' as const : 'weekly' as const,
    priority: route === '' ? 1 : route === '/blog' ? 0.85 : route.startsWith('/courses') ? 0.9 : 0.8,
  }));

  const dynamicCourses = Object.values(slugs).map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicCourses, ...blogPosts];
}
