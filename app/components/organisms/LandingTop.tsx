import { Button } from "../atom/Button";
import { FadeIn, FadeInStagger } from "../atom/FadeIn";

export default function LandingTop() {
  const heroImages = [
    "https://images.unsplash.com/photo-1649957909636-10a8b37d052e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661432995748-6ccff78a1180?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1713946598635-0c2a65e4ee08?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608048608477-30389696fdc1?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1649957909636-10a8b37d052e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const imageIndex = Math.floor(Math.random() * (heroImages.length - 1));
  return (
    <div className="min-h-screen bg-white mt-6">
      <main>
        <div>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-1">
              <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src={heroImages[`${imageIndex}`]}
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" />
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">
                      Empowering lives through
                    </span>
                    <span className="block text-slate-300">
                      skill-based trainings
                    </span>
                  </h1>
                  <p className="mx-auto mt-6 max-w-lg text-center text-xl text-slate-300 sm:max-w-3xl">
                    Experience and learn skills that are high on demand.
                    Programs designed specifically for students and working
                    professionals. Stay future-ready with new-age courses.
                  </p>
                  <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                    <div className="flex justify-center gap-3 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <Button
                        target="_blank"
                        rel="noopener"
                        href="https://tally.so/r/wvebpA"
                        className="flex items-center justify-center border border-transparent bg-black px-4 py-3 text-base font-medium text-black shadow-sm hover:bg-white hover:text-black sm:px-8"
                      >
                        Contact Us
                      </Button>
                      <Button
                        className="flex items-center justify-center border border-transparent bg-[#FFE01B] px-4 py-3 text-base font-medium !text-black shadow-sm sm:px-8 animate-pulse"
                        href="/courses"
                      >
                        Explore Courses
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FadeInStagger>
            <FadeIn>
              <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Affiliations received from Esteemed Institutes.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-4">
                    <div className=" col-span-1 flex justify-center grayscale hover:grayscale-0 md:col-span-2 lg:col-span-1">
                      <img
                        className="h-24"
                        src="/assets/images/iso-logo.png"
                        alt="ISO"
                      />
                    </div>
                    <div className=" col-span-1 flex items-center justify-center grayscale hover:grayscale-0 md:col-span-2 lg:col-span-1">
                      <img
                        className="h-12"
                        src="/assets/images/aisect.png"
                        alt="AISECT"
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center grayscale hover:grayscale-0 md:col-span-2 lg:col-span-1">
                      <img
                        className="h-24"
                        src="/assets/images/niact.png"
                        alt="National Institute for Advanced Ccomputer Technology"
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center grayscale hover:grayscale-0 md:col-span-2 md:col-start-2 lg:col-span-1">
                      <img
                        className="h-24"
                        src="/assets/images/msme-logo.png"
                        alt="Ministry of Micro, Small and Medium Enterprises"
                      />
                    </div>
                    {/* <div className="col-span-2 flex justify-center grayscale hover:grayscale-0 md:col-span-2 md:col-start-4 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                    alt="Workcation"
                  />
                </div> */}
                  </div>
                </div>
              </div>
            </FadeIn>
          </FadeInStagger>
        </div>
      </main>
    </div>
  );
}
