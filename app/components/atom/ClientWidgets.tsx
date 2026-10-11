"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import WhatsAppWidget from "./WhatsAppWidget";
import MobileQuickBar from "./MobileQuickBar";
import { CookieBanner } from "../molecules/CookieBanner";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });
const MasterclassModal = dynamic(() => import("../organisms/MasterclassModal"), { ssr: false });

interface ClientWidgetsProps {
  searchOpen: boolean;
  onCloseSearch: () => void;
}

/**
 * Deferred non-critical client widgets (modals, banners, floating chat, mobile quick actions).
 * Mounts after client hydration to avoid unnecessary SSR bailouts or flight data bloat.
 */
export default function ClientWidgets({
  searchOpen,
  onCloseSearch,
}: ClientWidgetsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <WhatsAppWidget />
      <MobileQuickBar />
      {searchOpen && <SearchModal open={searchOpen} onClose={onCloseSearch} />}
      <MasterclassModal />
      <CookieBanner />
    </>
  );
}
