import coursesData from '../courses.json';

export interface Course {
  slug: string;
  fullTitle: string;
  image: string;
  category: string;
}

export function getRecommendedCourses(keywords: string[] = [], maxResults = 2): Course[] {
  if (!keywords || keywords.length === 0) return [];
  
  const courses = coursesData.courses;
  const results = courses.map((course: any) => {
    let score = 0;
    const title = (course.fullTitle || "").toLowerCase();
    const slug = (course.slug || "").toLowerCase();
    const highlight = (course.courseHightlight || course.courseHighlight || "").toLowerCase();

    keywords.forEach((kwRaw) => {
      const keyword = kwRaw.toLowerCase().trim();
      if (!keyword) return;
      
      // Native String Constraints
      if (title.includes(keyword)) score += 5;
      if (slug.includes(keyword)) score += 4;
      if (highlight.includes(keyword)) score += 1;
      
      // Extensive Synonym Targeting Constraints Matrix 
      if ((keyword.includes('react') || keyword.includes('html') || keyword.includes('css') || keyword.includes('javascript') || keyword.includes('next.js')) && slug === 'frontend-development') score += 5;
      if ((keyword.includes('node') || keyword.includes('express') || keyword.includes('api') || keyword.includes('backend') || keyword.includes('c++') || keyword.includes('java')) && slug === 'backend-development') score += 5;
      if ((keyword.includes('docker') || keyword.includes('aws') || keyword.includes('cloud') || keyword.includes('kubernetes') || keyword.includes('linux')) && slug === 'learn-devops-cloud-services') score += 5;
      if ((keyword.includes('sql') || keyword.includes('database') || keyword.includes('postgres') || keyword.includes('mongodb')) && (slug === 'backend-development' || slug === 'data-analytics')) score += 3;
      if ((keyword.includes('figma') || keyword.includes('design') || keyword.includes('wireframe') || keyword.includes('ui/ux')) && slug === 'ui-ux-designing') score += 5;
      if ((keyword.includes('photoshop') || keyword.includes('illustrator') || keyword.includes('graphics')) && slug === 'graphic-designing') score += 5;
      if ((keyword.includes('python') || keyword.includes('django')) && (slug === 'python' || slug === 'data-analytics')) score += 5;
      if ((keyword.includes('ai') || keyword.includes('llm') || keyword.includes('machine learning') || keyword.includes('generative')) && slug === 'generative-ai') score += 6;
      if ((keyword.includes('excel') || keyword.includes('spreadsheet') || keyword.includes('sheets')) && slug === 'advanced-excel') score += 5;
      if ((keyword.includes('tally') || keyword.includes('gst') || keyword.includes('accounting')) && (slug === 'gst' || slug === 'tally')) score += 5;
      if ((keyword.includes('powerbi') || keyword.includes('dashboard') || keyword.includes('tableau') || keyword.includes('analytics')) && slug === 'buisness-intelligence-using-powerbi') score += 6;
      if ((keyword.includes('agile') || keyword.includes('scrum') || keyword.includes('jira') || keyword.includes('project')) && slug === 'learn-project-management') score += 5;
    });

    return { course, score };
  });

  // Filter threshold mapping and strict sort return constraints
  const matched = results.filter(r => r.score > 0).sort((a, b) => b.score - a.score);
  return matched.slice(0, maxResults).map(r => r.course);
}
