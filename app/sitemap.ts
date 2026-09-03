import { MetadataRoute } from 'next';
import { canonicalFor } from '@/lib/site';
import coursesData from './courses.json';
import { posts } from './data/posts';
import { staff } from './data/staff';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRouteConfigs = [
    { route: '', priority: 1.0, freq: 'daily' as const },
    { route: '/courses', priority: 0.95, freq: 'weekly' as const },
    { route: '/blog', priority: 0.9, freq: 'daily' as const },
    { route: '/tools', priority: 0.9, freq: 'weekly' as const },
    { route: '/about', priority: 0.8, freq: 'monthly' as const },
    { route: '/contact', priority: 0.8, freq: 'monthly' as const },
    { route: '/workshops', priority: 0.85, freq: 'weekly' as const },
    { route: '/host-a-seminar', priority: 0.8, freq: 'monthly' as const },
    { route: '/success-stories', priority: 0.85, freq: 'weekly' as const },
    { route: '/faq', priority: 0.8, freq: 'monthly' as const },
    { route: '/gallery', priority: 0.7, freq: 'monthly' as const },
    { route: '/careers', priority: 0.75, freq: 'monthly' as const },
    { route: '/card', priority: 0.7, freq: 'monthly' as const },
    { route: '/sitemap', priority: 0.6, freq: 'weekly' as const },
    { route: '/tools/career-guide', priority: 0.85, freq: 'weekly' as const },
    { route: '/tools/career-blueprint', priority: 0.85, freq: 'monthly' as const },
    { route: '/tools/career-planner', priority: 0.85, freq: 'monthly' as const },
    { route: '/tools/ats-analyzer', priority: 0.85, freq: 'monthly' as const },
    { route: '/tools/salary-insights', priority: 0.85, freq: 'monthly' as const },
    { route: '/tools/study-planner', priority: 0.85, freq: 'monthly' as const },
    { route: '/tools/assessment-designer', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/lecture-note-generator', priority: 0.8, freq: 'monthly' as const },
    { route: '/tools/resume-builder', priority: 0.85, freq: 'monthly' as const },
    { route: '/tools/flashcards', priority: 0.85, freq: 'weekly' as const },
    { route: '/privacy-policy', priority: 0.3, freq: 'monthly' as const },
    { route: '/cookie-policy', priority: 0.3, freq: 'monthly' as const },
    { route: '/terms', priority: 0.3, freq: 'monthly' as const },
  ];

  const staticRoutes = staticRouteConfigs.map((cfg) => ({
    url: canonicalFor(cfg.route),
    lastModified: now,
    changeFrequency: cfg.freq,
    priority: cfg.priority,
  }));

  const dynamicCourses = (coursesData.courses || []).map((course) => ({
    url: canonicalFor(`/courses/${course.slug}`),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const dynamicStaff = staff.map((member) => ({
    url: canonicalFor(`/card/${member.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPosts = posts.map((post) => {
    const rawDate = post.dateModified || post.date;
    const postDate = rawDate ? new Date(rawDate).toISOString() : now;
    return {
      url: canonicalFor(`/blog/${post.slug}`),
      lastModified: postDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...dynamicCourses, ...dynamicStaff, ...blogPosts];
}
