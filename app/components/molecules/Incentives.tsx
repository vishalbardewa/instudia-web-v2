import Image from 'next/image';

const incentives = [
  {
    name: 'Learn job-ready, in-demand skills',
    imageSrc: '/assets/icons/briefcase.svg',
    description:
      'Build skills and put them to the test with tests designed by software development experts.',
  },
  {
    name: 'Get an edge with human support',
    imageSrc: '/assets/icons/community.svg',
    description:
      'Work with a mentor, career coach, and more. They have your back and will hold you accountable.',
  },
  {
    name: 'Land a job or make a career switch',
    imageSrc: '/assets/icons/human-check.svg',
    description:
      'Craft a targeted resume, network effectively, and highlight transferable skills to land your ideal job or smoothly transition careers.',
  },
];

const Incentives = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gray-50 px-6 py-16 sm:p-16">
          <div className="mx-auto max-w-xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                We built our courses with growth mindset
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div
                  key={incentive.name}
                  className="text-center sm:flex sm:text-left lg:block lg:text-center"
                >
                  <div className="sm:shrink-0">
                    <div className="flow-root">
                      <Image
                        className="mx-auto h-16 w-16"
                        src={incentive.imageSrc}
                        alt=""
                        height={24}
                        width={24}
                      />
                    </div>
                  </div>
                  <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-lg font-extrabold text-gray-900">
                      {incentive.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {incentive.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
