import clsx from "clsx";
import { randomUUID } from "crypto";

const featuredTestimonial = {
  body: "I enrolled for DCA course and I wholeheartedly recommend Instudia to anyone ready to embrace growth and conquer new horizons! The platform’s dynamic range of courses empowers you to master skills that matter, while its vibrant, supportive community fuels your journey every step of the way. Whether you’re sharpening your expertise for the future or diving into bold challenges, Instudia is the ultimate launchpad for unlocking your potential.",
  author: {
    name: "Sentisenla",
    handle: "",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG-20240610-WA0035.jpg?updatedAt=1740029601907/tr:w-200,h-300,fo-auto",
    logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
  },
};
const testimonials = [
  [
    [
      {
        body: "The flexibility of the Diploma in Computer Applications class schedule was a game-changer, allowing me to balance learning with my personal commitments seamlessly. Incredibly supportive instructors, and inclusive empowerment, no matter your starting point, this program fuels growth!",
        author: {
          name: "Vevelu",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111137.jpg?updatedAt=1740030755019",
        },
      },
      {
        body: "Studying at this institution has been an inspiring and transformative journey! The vibrant, welcoming environment and flawlessly organized systems make learning both seamless and enjoyable. The exceptional faculty members are truly dedicated to nurturing growth and innovation, offering guidance that elevates every student’s potential.",
        author: {
          name: "Minikivi",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111213.jpg?updatedAt=1740030755030",
        },
      },
    ],
    [
      {
        body: "I love the welcoming environment and friendly vibe here—it’s so easy to connect and open up. The computer activities are incredibly fun and have been my favorite part of the experience!",
        author: {
          name: "Tongtila",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111853.jpg?updatedAt=1740030754513",
        },
      },
    ],
  ],
  [
    [
      {
        body: "I had an incredible experience completing Frontend Development using React with Team Instudia, where their excellent communication skills, interactive training, and supportive environment truly stood out. They not only empowered us with skill-based knowledge but also guided us to develop a productive mindset. Grateful for the memorable journey and their dedication to our growth!",
        author: {
          name: "Ghupito",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250113_140237.jpg?updatedAt=1740031463994",
        },
      },
    ],
    [
      {
        body: "The Instudia team was incredibly friendly and supportive, always going above and beyond to help students excel. I explored numerous new skills in computer knowledge, gaining confidence and expertise. It was an inspiring and seamless experience—truly unmatched",
        author: {
          name: "Tunato",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111018.jpg?updatedAt=1740030754604",
        },
      },
      {
        body: "Instudia is more than a learning space—it’s a place of growth, collaboration, and unforgettable memories. The team’s dedication, timely support, and passion for sharing knowledge set a remarkable standard. I’ll always carry the lessons and inspiration from this incredible community wherever I go!",
        author: {
          name: "Niukali",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/SNOW_20230320_111103_815.jpg?updatedAt=1740029602746",
        },
      },
      
    ],
  ],
];

export default function TestimonialGrid() {
  return (
    <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ec80ff] to-[#eb4af1]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ffca80] to-[#fcf089] xl:ml-0 xl:mr-[calc(50%-12rem)]"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-[#c22bef]">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We have worked with thousands of amazing students
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <img
                alt=""
                src={featuredTestimonial.author.imageUrl}
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
              />
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                {/* <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div> */}
              </div>
              {/* <img
                alt=""
                src={featuredTestimonial.author.logoUrl}
                className="h-10 w-auto flex-none"
              /> */}
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx + randomUUID()}
                  className={clsx(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8"
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle + randomUUID()}
                      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                    >
                      <blockquote className="text-gray-900">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <img
                          alt=""
                          src={testimonial.author.imageUrl}
                          className="h-10 w-10 rounded-full bg-gray-50"
                        />
                        <div>
                          <div className="font-semibold">
                            {testimonial.author.name}
                          </div>
                          {/* <div className="text-gray-600">{`@${testimonial.author.handle}`}</div> */}
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
