import { CareerPlannerDashboard } from '../../components/organisms/CareerPlannerDashboard';
import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Student Career Planner & Goal Tracker',
  description: 'Bridge the gap between your current skillset and your dream IT roles with our interactive student career planning and milestone dashboard.',
  alternates: { canonical: canonicalFor('/tools/career-planner') },
  metadataBase: new URL(SITE_URL),
};

export default function CareerPlannerPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1B1C1E] selection:bg-brandpurple/30 font-jakarta">
      <CareerPlannerDashboard />
    </main>
  );
}
