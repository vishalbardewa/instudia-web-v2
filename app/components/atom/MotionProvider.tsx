"use client";
import { LazyMotion } from "framer-motion";

// Async loader — Framer ships domAnimation as a separate chunk (~15KB vs 120KB full bundle)
const loadFeatures = () => import("framer-motion").then((m) => m.domAnimation);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
