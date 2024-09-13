import Image from "next/image";
import React from "react";
import { Button } from "../atom/Button";

function SideBySideCard() {
  return (
    <div className="bg-white py-16 sm:py-24 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate flex flex-col gap-10 justify-between overflow-hidden bg-[#1B1C1E] py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:flex-row xl:items-center xl:py-32">
          <div className="flex flex-col">
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl xl:max-w-none lg:text-6xl xl:flex-auto">
              Learn. Upskill. Succeed.
            </h2>
            <p className="text-[#FAFAFA] pt-2 text-opacity-60">
              Join Now & Get Certified
            </p>
            <Button
              target="_blank"
              rel="noopener"
              href="#"
              className="flex w-1/3 mt-8 items-center justify-center rounded-md border border-[#FAFAFA] bg-transparent text-base font-medium text-white shadow-sm hover:bg-white hover:text-purple-400 hover:ease-in hover:duration-150 hover:border-[#C21BFF]"
            >
              Get started
            </Button>
          </div>
          <Image
            className="-rotate-[85deg] hover:-rotate-[70deg] hover:ease-in-out hover:duration-150"
            width={320}
            height={320}
            src="https://ik.imagekit.io/dxffek9yf/course-list-page/popper.png?updatedAt=1726210084365"
            alt="party popper"
          />
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#FAFAFA" />
                <stop offset={1} stopColor="#FAFAFA" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SideBySideCard;
