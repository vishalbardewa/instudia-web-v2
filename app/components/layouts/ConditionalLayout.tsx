"use client";

import { usePathname } from "next/navigation";
import PrimaryLayout from "./PrimaryLayout";

// Routes where header/footer should be suppressed
const STANDALONE_PREFIXES = ["/links", "/card"];

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isStandalone) return <>{children}</>;
  return <PrimaryLayout>{children}</PrimaryLayout>;
}
