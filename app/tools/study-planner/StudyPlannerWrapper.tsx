"use client";

import React, { useState, useEffect } from "react";
import StudyPlannerClient from "../../components/organisms/StudyPlannerClient";

export default function StudyPlannerWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-96 w-full animate-pulse bg-gray-100 rounded-[2rem]" />;
  }

  return <StudyPlannerClient />;
}
