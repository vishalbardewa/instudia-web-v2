import { MetadataRoute } from 'next';
import coursesData from './courses.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.instudianagaland.com';

  // Core static gateway paths mapping to the search index prioritize routing logic
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/workshops',
    '/courses',
    '/tools/career-blueprint',
    '/tools/career-planner',
    '/tools/ats-analyzer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.startsWith('/tools') ? 'monthly' as const : 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/courses') ? 0.9 : 0.8,
  }));

  // Dynamic array projection generating localized routes for every single specific course catalog entry
  const dynamicCourses = coursesData.courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicCourses];
}
