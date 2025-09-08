
const ContactUs = () => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="divide-y-2 divide-gray-200">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Get in touch
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Collaborate
                  </h3>
                  <dl className="mt-2 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>instudianagaland@gmail.com</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <dd>+91 8798-587-779</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Join our team
                  </h3>
                  <dl className="mt-2 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>instudianagaland@gmail.com</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <dd>+91 9233-606-322</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Say hello
                  </h3>
                  <dl className="mt-2 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>hello@instudianagaland.com</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <dd>+91 8798-587-779</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-16 lg:grid lg:grid-cols-3 lg:gap-8">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Locations
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Dimapur
                  </h3>
                  <div className="mt-2 text-base text-gray-500">
                    <p>First Floor, Vikiye Center, Opp. Notun Bosti Gate</p>
                    <p className="mt-1">Dimapur, Nagaland 797112</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
