import Image from "next/image";
import { FadeIn, FadeInStagger } from "../atom/FadeIn";
import SeonaEditorialHero from "../molecules/SeonaEditorialHero";

export default function LandingTop() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <div>
          {/* Seona-Style Editorial Hero */}
          <SeonaEditorialHero />

          <FadeInStagger>
            <FadeIn>
              <div>
                <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Affiliations received from Esteemed Institutes
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-center max-w-4xl mx-auto">
                    <div className="flex justify-center grayscale hover:grayscale-0">
                      <Image
                        className="h-48 object-contain"
                        src="/assets/images/iso-logo.png"
                        alt="ISO Certified Computer Institute in Dimapur, Nagaland"
                        width={220}
                        height={220}
                      />
                    </div>
                    <div className="flex items-center justify-center grayscale hover:grayscale-0">
                      <Image
                        className="h-48 object-contain"
                        src="/assets/images/niact.png"
                        alt="National Institute for Advanced Computer Technology Training"
                        width={150}
                        height={96}
                      />
                    </div>
                    <div className="flex items-center justify-center grayscale hover:grayscale-0">
                      <Image
                        className="h-48 object-contain"
                        src="/assets/images/msme-logo.png"
                        alt="MSME Certified Skill Training Programs in Nagaland"
                        width={150}
                        height={96}
                      />
                    </div>
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
