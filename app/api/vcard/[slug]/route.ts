import { getStaffBySlug } from "@/app/data/staff";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const member = getStaffBySlug(slug);

  if (!member) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Build a standard vCard 3.0 string
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${member.name}`,
    `N:${member.name.split(" ").reverse().join(";")};;`,
    `TITLE:${member.designation}`,
    `ORG:instudia`,
    `TEL;TYPE=CELL:${member.phone.replace(/\s|-/g, "")}`,
    `EMAIL;TYPE=WORK:${member.email}`,
    `ADR;TYPE=WORK:;;First Floor\\, Vikiye Center\\, Opp. Notun Bosti Gate\\, Fellowship Colony;Dimapur;Nagaland;797112;IN`,
    `URL:https://www.instudianagaland.com/card/${member.slug}`,
    member.photo ? `PHOTO;VALUE=uri:${member.photo}` : "",
    member.linkedin ? `URL;TYPE=LinkedIn:${member.linkedin}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${member.slug}.vcf"`,
    },
  });
}
