"use client";

import React, { useState, useEffect } from "react";
import WhatsAppWidget from "./WhatsAppWidget";
import SearchModal from "./SearchModal";
import MasterclassModal from "../organisms/MasterclassModal";
import { CookieBanner } from "../molecules/CookieBanner";

interface ClientWidgetsProps {
  searchOpen: boolean;
  onCloseSearch: () => void;
}

/**
 * Deferred non-critical client widgets (modals, banners, floating chat).
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
      <SearchModal open={searchOpen} onClose={onCloseSearch} />
      <MasterclassModal />
      <CookieBanner />
    </>
  );
}
