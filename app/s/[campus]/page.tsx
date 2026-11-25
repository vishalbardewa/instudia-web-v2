import type { Metadata } from "next";
import coursesData from "@/app/courses.json";
import { formatCampusName } from "../_utils/campusFormatter";
import SeminarMicroForm from "./SeminarMicroForm";

interface PageProps {
  params: Promise<{ campus: string }>;
  searchParams: Promise<{
    date?: string;
    d?: string;
    topic?: string;
    t?: string;
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { campus } = await params;
  const query = await searchParams;
  const campusName = formatCampusName(campus);
  const topic = query.topic || query.t || "Tech & Career Seminar";

  return {
    title: `${campusName} — Seminar Feedback & Certificate | instudia`,
    description: `Submit your feedback for ${topic} at ${campusName} and download your instudia participation certificate.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SeminarCampusPage({
  params,
  searchParams,
}: PageProps) {
  const { campus } = await params;
  const query = await searchParams;

  const campusName = formatCampusName(campus);
  const date =
    query.date || query.d || new Date().toISOString().split("T")[0];
  const topic = query.topic || query.t || "Tech & Career Readiness Seminar";

  const courseOptions = coursesData.courses.map((c) => c.fullTitle);

  return (
    <SeminarMicroForm
      campusSlug={campus}
      campusName={campusName}
      date={date}
      topic={topic}
      courseOptions={courseOptions}
    />
  );
}

