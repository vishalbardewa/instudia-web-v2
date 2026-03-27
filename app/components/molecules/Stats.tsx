import { FadeIn, FadeInStagger } from "../atom/FadeIn";

interface IStatProps {
  label: string;
  value: string;
}

interface IStatsProps {
  stats: Array<IStatProps>;
}

export default function Stats({ stats }: IStatsProps) {
  return (
    <FadeInStagger>
      <FadeIn>
        <div className="relative isolate overflow-hidden bg-white py-20 sm:py-32">
          {/* Subtle Background Glow */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brandpurple to-emerald-300 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none text-center lg:text-left flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-24">

              <div className="max-w-2xl">
                <h2 className="text-4xl font-black tracking-tight text-[#1B1C1E] sm:text-5xl lg:text-6xl leading-tight">
                  Trusted by students <span className="block text-brandpurple mt-1">for quality upskilling</span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 font-medium">
                  We believe cost should never be a barrier to education. Dive into affordable, high-impact training programs built exactly for your schedule. Access top-tier mentors and financing options guaranteeing your success natively.
                </p>
              </div>

              <div className="flex-1 w-full max-w-2xl lg:max-w-none border border-neutral-200/60 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-gray-900/5 sm:p-12 relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-1 bg-redhue opacity-80" />

                <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="relative flex flex-col gap-y-3 pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:rounded-full">
                      <dt className="text-xs font-extrabold leading-6 text-gray-500 uppercase tracking-[0.15em]">{stat.label}</dt>
                      <dd className="text-5xl font-black tracking-tight text-[#1B1C1E] drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02] origin-left">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

            </div>
          </div>
        </div>
      </FadeIn>
    </FadeInStagger>
  );
}
