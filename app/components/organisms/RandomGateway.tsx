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

  if (!Component) return null;
  return <Component />;
}
