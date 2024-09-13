interface IStatProps {
  label: string;
  value: string;
}

interface IStatsProps {
  stats: Array<IStatProps>;
}

export default function Stats({ stats }: IStatsProps) {
  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by students for quality upskilling
          </h2>
          <p className="mt-3 px-10 text-base text-gray-500 sm:mt-4">
            We understand that the cost of education can be a barrier for many
            individuals, which is why we offer affordable training programs that
            are accessible to everyone. Our courses are designed to be flexible,
            allowing students to learn at their own pace and on their own
            schedule. We also offer financing options and scholarships to ensure
            that cost is not a barrier to education.
          </p>
        </div>
      </div>
      <div className="mt-10 bg-white pb-12 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <dl className="rounded-2xl bg-white shadow-lg sm:grid sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
                  >
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                      {stat.label}
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-yellow-600">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
