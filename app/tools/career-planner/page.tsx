import { CareerPlannerDashboard } from '../../components/organisms/CareerPlannerDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Career Planner | Instudia',
  description: 'Bridge the gap between your current skills and your dream roles.',
};

export default function CareerPlannerPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1B1C1E] selection:bg-brandpurple/30 font-jakarta">
      <CareerPlannerDashboard />
    </main>
  );
}
