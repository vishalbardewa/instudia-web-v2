import { CareerAdviceForm } from '../../components/organisms/CareerAdviceForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Your Career Path | Instudia',
  description: 'Enter your skills and hobbies to receive market-driven career advice.',
};

export default function CareerDiscoveryPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 selection:bg-brandpurple/30 font-jakarta">
      <CareerAdviceForm />
    </main>
  );
}
