"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export interface SeminarPixelPayload {
  campus: string;
  topic: string;
  date: string;
  courseInterest?: string;
  rating: number;
}

/**
 * Fires Meta Pixel (Lead + CompleteRegistration) and GA4 (generate_lead + seminar_feedback)
 * conversion events when a student submits seminar feedback.
 */
export function trackSeminarSubmission(payload: SeminarPixelPayload): void {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: payload.topic,
      content_category: payload.campus,
      value: 0,
      currency: "INR",
    });
    window.fbq("track", "CompleteRegistration", {
      content_name: `Seminar Certificate - ${payload.topic}`,
      status: "completed",
    });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "seminar_micro_app",
      event_label: `${payload.campus} | ${payload.topic}`,
      campus: payload.campus,
      seminar_topic: payload.topic,
      seminar_date: payload.date,
      course_interest: payload.courseInterest || "Unspecified",
    });

    window.gtag("event", "seminar_feedback", {
      campus: payload.campus,
      seminar_topic: payload.topic,
      seminar_date: payload.date,
      rating: payload.rating,
    });
  }
}

