"use client";

import dynamic from "next/dynamic";

const StudyPlannerClient = dynamic(() => import("../../components/organisms/StudyPlannerClient"), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 rounded-[2rem]" />
});

export default function StudyPlannerWrapper() {
  return <StudyPlannerClient />;
}
