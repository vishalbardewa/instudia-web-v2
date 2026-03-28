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
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brandpurple to-emerald-300 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] [clip-path:polygon(74.1%_44.1%,_100%_61.6%,_97.5%_26.9%,_85.5%_0.1%,_80.7%_2%,_72.5%_32.5%,_60.2%_62.4%,_52.4%_68.1%,_47.5%_58.3%,_45.2%_34.5%,_27.5%_76.7%,_0.1%_64.9%,_17.9%_100%,_27.6%_76.8%,_76.1%_97.7%,_74.1%_44.1%)]" />
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
