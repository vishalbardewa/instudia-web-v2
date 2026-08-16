import { MetadataRoute } from 'next';
import { canonicalFor } from '@/lib/site';
import coursesData from './courses.json';
import { posts } from './data/posts';

const SITE_CONTENT_DATE = '2026-08-16T00:00:00.000Z';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRouteConfigs = [
    { route: '', priority: 1.0, freq: 'weekly' as const },
    { route: '/about', priority: 0.8, freq: 'weekly' as const },
    { route: '/contact', priority: 0.8, freq: 'weekly' as const },
    { route: '/workshops', priority: 0.8, freq: 'weekly' as const },
    { route: '/host-a-seminar', priority: 0.8, freq: 'weekly' as const },
    { route: '/courses', priority: 0.9, freq: 'weekly' as const },
    { route: '/faq', priority: 0.8, freq: 'weekly' as const },
    { route: '/blog', priority: 0.85, freq: 'weekly' as const },
    { route: '/careers', priority: 0.8, freq: 'weekly' as const },
    { route: '/privacy-policy', priority: 0.5, freq: 'monthly' as const },
    { route: '/cookie-policy', priority: 0.5, freq: 'monthly' as const },
    { route: '/terms', priority: 0.5, freq: 'monthly' as const },
    { route: '/tools', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/career-blueprint', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/career-planner', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/ats-analyzer', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/salary-insights', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/study-planner', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/assessment-designer', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/lecture-note-generator', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/resume-builder', priority: 0.8, freq: 'monthly' as const },
    { route: '/gallery', priority: 0.7, freq: 'monthly' as const },
    { route: '/links', priority: 0.6, freq: 'monthly' as const },
  ];

  const staticRoutes = staticRouteConfigs.map((cfg) => ({
    url: canonicalFor(cfg.route),
    lastModified: SITE_CONTENT_DATE,
    changeFrequency: cfg.freq,
    priority: cfg.priority,
  }));

  const dynamicCourses = (coursesData.courses || []).map((course) => ({
    url: canonicalFor(`/courses/${course.slug}`),
    lastModified: SITE_CONTENT_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPosts = posts.map((post) => ({
    url: canonicalFor(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date).toISOString() : SITE_CONTENT_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicCourses, ...blogPosts];
}
