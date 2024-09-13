import { Button } from '../atom/Button';

export default function ReasonStepper() {
  return (
    <div className="mt-10 bg-white">
      <div className="flex flex-col border-b border-gray-200 lg:border-0">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"
          />
          <div className="relative bg-gray-100 lg:bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
              <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                <div className="lg:pr-16">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                    Focus on what matters
                  </h2>
                  <p className="mt-2 text-lg font-bold italic text-gray-600">
                    Upskilling is not a luxury, it&apos;s a necessity in
                    today&apos;s fast-changing workplace.
                  </p>
                  <span className="mt-1 mb-0 text-lg font-light italic text-gray-600">
                    - Irene Rosenfeld
                  </span>
                  <div className="mt-6">
                    <Button
                      target="_blank"
                      rel="noopener"
                      href="https://tally.so/r/wvebpA"
                      className="inline-block rounded-md border border-transparent bg-yellow-600 py-3 px-8 font-medium text-white hover:bg-yellow-700"
                    >
                      Join Us Today!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-48 w-full sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="reason to join instudia"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
