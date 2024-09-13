import React from 'react';

export default function TestimonialWithStats() {
  return (
    <div className="relative mt-1">
      <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
        <div className="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
            <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72" />
            <svg
              className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
              />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20">
            <div className="relative overflow-hidden rounded-2xl pt-64 pb-10 shadow-xl">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1543269664-647163ef2ee4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="instudia"
              />
              <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
              <div className="from-white-600 via-white-600 absolute inset-0 bg-gradient-to-t opacity-90" />
              <div className="relative px-8">
                <blockquote className="mt-8">
                  <div className="relative text-lg font-medium text-white md:grow">
                    <svg
                      className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 text-rose-400"
                      fill="grey"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative font-light">
                      We believe that education is the key to unlocking
                      potential and creating opportunities for a better future.
                      Join us today and let us help you achieve your dreams!
                    </p>
                  </div>

                  <footer className="mt-4">
                    <p className="text-base font-bold text-white">
                      Elevate your skills, elevate your future - with instudia
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Driven by Ambition, Growth by Skills
            </h2>
            <div className="mt-6 space-y-6 text-gray-500">
              <p className="text-lg">
                Our mission is to empower unemployed and unskilled youth with
                industry-specific courses that will impact their lives and open
                up new job opportunities. We believe that everyone deserves a
                chance to succeed, and we are committed to providing the
                resources and training necessary to make that happen.
              </p>
              <p className="text-base leading-7">
                Our institute offers a wide range of computer courses designed
                to prepare students for success in today&apos;s job market. We
                offer courses in areas such as web development, graphic design,
                data analysis, and more. Each course is tailored to meet the
                specific needs of the industry, ensuring that our students are
                equipped with the skills and knowledge necessary to excel in
                their chosen field.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
