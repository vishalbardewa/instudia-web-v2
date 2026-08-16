import {
  LockClosedIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    id: 'career-counseling',
    name: 'Find the Right Role For You',
    description:
      'A career counselor or mentor helps uncover and navigate the path toward your ideal job.',
    icon: BuildingOfficeIcon,
    accent: 'text-brightyellow',
    bg: 'bg-brightyellow/10',
    border: 'border-brightyellow/20',
  },
  {
    id: 'cv-coaching',
    name: 'CV & Interview Coaching',
    description:
      'Professional resume and interview coaching services sharpen your CV and boost interview readiness.',
    icon: LockClosedIcon,
    accent: 'text-brandpurple',
    bg: 'bg-brandpurple/10',
    border: 'border-brandpurple/20',
  },
  {
    id: 'industry-referrals',
    name: 'Referrals to Top Companies',
    description:
      'Network with recruiters and staffing agencies to unlock job opportunities and referrals in your field.',
    icon: UserGroupIcon,
    accent: 'text-redhue',
    bg: 'bg-redhue/10',
    border: 'border-redhue/20',
  },
  {
    id: 'salary-negotiation',
    name: 'Salary Negotiation Coaching',
    description:
      'A specialized career coach boosts your confidence with effective, evidence-based negotiation strategies.',
    icon: ArrowPathIcon,
    accent: 'text-flourescent',
    bg: 'bg-flourescent/10',
    border: 'border-flourescent/20',
  },
];

export default function FeatureWithColumns() {
  return (
    <section className="relative bg-white py-20 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Instudia Career Services
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Exclusive career prep for{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-brandpurple">instudians</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-brandpurple/10 -rotate-1 -z-0 rounded" />
            </span>
          </h2>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            Instudians get exclusive access to job openings at our partner companies, plus guidance from our dedicated Career Preparation team.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`group relative flex flex-col gap-5 rounded-[2rem] border ${feature.border} bg-white p-7 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden`}
            >
              {/* Accent dot */}
              <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${feature.bg} ring-2 ring-offset-2 ${feature.accent.replace('text-', 'ring-')}`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center flex-shrink-0`}>
                <feature.icon className={`h-6 w-6 ${feature.accent}`} aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#1B1C1E] leading-snug">{feature.name}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
