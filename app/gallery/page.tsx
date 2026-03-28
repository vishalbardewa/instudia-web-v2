import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Gallery | Life at Instudia",
  description: "Take a tour of our modern computing labs, creative design studios, and vibrant student community at Instudia Dimapur, Nagaland.",
  alternates: { canonical: "https://www.instudianagaland.com/gallery" },
};

// High-quality modern education, tech, and collaboration placeholders from Unsplash
const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern computer lab setup with dual monitors",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    alt: "Students collaborating on a tech project",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    alt: "Creative design studio session",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    alt: "Instructor assisting a student with code",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    alt: "Focus time in the learning center",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop",
    alt: "Web development workshop in progress",
    span: "md:col-span-1 md:row-span-1",
  },
];

export default function GalleryPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Premium Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-neutral-100 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-brandpurple/5 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-6 px-3 py-1 rounded-full bg-brandpurple/10 border border-brandpurple/20">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandpurple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brandpurple"></span>
            </span>
            Our Campus
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1B1C1E] max-w-4xl mx-auto leading-tight">
            Life at <span className="text-brandpurple">Instudia</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Take a glimpse into our creative and technical ecosystem. A place designed to inspire, collaborate, and engineer the future.
          </p>
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className={`relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 ${image.span}`}
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-lg drop-shadow-md">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about placeholders */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 italic bg-gray-50 py-3 px-6 rounded-2xl inline-block border border-neutral-100">
            * Note: These images are placeholders. Real campus photos will be uploaded soon.
          </p>
        </div>
      </section>
    </main>
  );
}
