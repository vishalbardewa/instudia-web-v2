"use client";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export interface CertificateData {
  studentName: string;
  campus: string;
  topic: string;
  date: string;
  certificateId: string;
}

function formatDisplayDate(dateStr: string): string {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Generates a landscape A4 PDF certificate for a seminar attendee and triggers
 * an immediate browser download.
 */
export async function generateAndDownloadCertificate(
  data: CertificateData
): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  // Landscape A4: 841.89 x 595.28 points
  const width = 841.89;
  const height = 595.28;
  const page = pdfDoc.addPage([width, height]);

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSerifItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  const deepIndigo = rgb(0.118, 0.106, 0.18); // #1E1B2E
  const brandPurple = rgb(0.388, 0.4, 0.945); // #6366F1
  const accentGold = rgb(0.851, 0.467, 0.024); // #D97706
  const mutedGray = rgb(0.38, 0.4, 0.45);
  const lightBg = rgb(0.985, 0.985, 0.995);

  // Subtle off-white background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: lightBg,
  });

  // Outer dark indigo border
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: deepIndigo,
    borderWidth: 3,
  });

  // Inner accent border
  page.drawRectangle({
    x: 34,
    y: 34,
    width: width - 68,
    height: height - 68,
    borderColor: brandPurple,
    borderWidth: 1,
  });

  // Top accent bar
  page.drawRectangle({
    x: 34,
    y: height - 48,
    width: width - 68,
    height: 14,
    color: deepIndigo,
  });

  const drawCentered = (
    text: string,
    y: number,
    size: number,
    font: typeof fontBold,
    color: ReturnType<typeof rgb>
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y,
      size,
      font,
      color,
    });
  };

  // Brand Header
  drawCentered("INSTUDIA", height - 92, 22, fontBold, deepIndigo);
  drawCentered(
    "SKILL TRAINING & TECH EDUCATION  •  DIMAPUR, NAGALAND",
    height - 110,
    9.5,
    fontRegular,
    mutedGray
  );

  // Divider line
  page.drawLine({
    start: { x: width / 2 - 90, y: height - 126 },
    end: { x: width / 2 + 90, y: height - 126 },
    thickness: 1.5,
    color: accentGold,
  });

  // Certificate Title
  drawCentered(
    "CERTIFICATE OF PARTICIPATION",
    height - 175,
    28,
    fontBold,
    brandPurple
  );

  drawCentered(
    "THIS IS PROUDLY PRESENTED TO",
    height - 215,
    11,
    fontBold,
    mutedGray
  );

  // Student Name (auto-scale if very long)
  const cleanName = data.studentName.trim();
  const nameSize = cleanName.length > 28 ? 28 : 36;
  drawCentered(cleanName, height - 268, nameSize, fontSerifItalic, deepIndigo);

  // Underline beneath student name
  page.drawLine({
    start: { x: 180, y: height - 284 },
    end: { x: width - 180, y: height - 284 },
    thickness: 1,
    color: rgb(0.8, 0.82, 0.88),
  });

  // Participation statement
  drawCentered(
    "for actively participating in the seminar on",
    height - 318,
    13,
    fontRegular,
    mutedGray
  );

  const topicText = `"${data.topic.trim()}"`;
  const topicSize = topicText.length > 48 ? 16 : 20;
  drawCentered(topicText, height - 350, topicSize, fontBold, deepIndigo);

  drawCentered(
    `held at ${data.campus.trim()} on ${formatDisplayDate(data.date)}`,
    height - 384,
    13.5,
    fontRegular,
    mutedGray
  );

  // Footer section: Signature & Verification ID
  const footerY = 92;

  // Left: Date & Certificate ID
  page.drawText(`Certificate ID: ${data.certificateId}`, {
    x: 72,
    y: footerY + 14,
    size: 10,
    font: fontBold,
    color: deepIndigo,
  });
  page.drawText("Verify at instudianagaland.com", {
    x: 72,
    y: footerY - 2,
    size: 9,
    font: fontRegular,
    color: mutedGray,
  });

  // Right: Authorized Signatory
  page.drawLine({
    start: { x: width - 250, y: footerY + 18 },
    end: { x: width - 72, y: footerY + 18 },
    thickness: 1,
    color: deepIndigo,
  });
  page.drawText("Director, instudia", {
    x: width - 215,
    y: footerY + 2,
    size: 10.5,
    font: fontBold,
    color: deepIndigo,
  });
  page.drawText("Dimapur, Nagaland", {
    x: width - 205,
    y: footerY - 12,
    size: 9,
    font: fontRegular,
    color: mutedGray,
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const safeFileName = cleanName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const link = document.createElement("a");
  link.href = url;
  link.download = `instudia-certificate-${safeFileName || "seminar"}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

