"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import to keep bundle split
const CareerTerminal = dynamic(() => import("./CareerTerminal"), { ssr: false });
const SkillGraphOrbit = dynamic(() => import("./SkillGraphOrbit"), { ssr: false });
const MiniBlueprintGateway = dynamic(() => import("./MiniBlueprintGateway"), { ssr: false });

const GATEWAYS = [CareerTerminal, SkillGraphOrbit, MiniBlueprintGateway];

/**
 * Client-only random gateway selector.
 * Allows the homepage to be statically generated (SSG) while still
 * rendering a random interactive component on the client.
 */
export default function RandomGateway() {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    const pick = GATEWAYS[Math.floor(Math.random() * GATEWAYS.length)];
    setComponent(() => pick);
  }, []);

  if (!Component) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 animate-pulse" aria-hidden="true">
        <div className="h-[420px] rounded-[2.5rem] bg-neutral-100/80 border border-neutral-200/60 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-200/60" />
          <div className="h-4 w-48 rounded-full bg-neutral-200/60" />
        </div>
      </div>
    );
  }

  return <Component />;
}
