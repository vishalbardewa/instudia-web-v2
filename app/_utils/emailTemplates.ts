export function buildEnquiryEmailHtml({
  name,
  phone,
  email,
  courseName,
  message,
  submittedAt,
}: {
  name: string;
  phone: string;
  email: string;
  courseName: string;
  message: string;
  submittedAt: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Course Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:2px solid #000;box-shadow:6px 6px 0 #000;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1B1C1E;padding:32px 40px;">
              <p style="margin:0;color:#C21BFF;font-size:10px;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:8px;">instudia × Enquiry Alert</p>
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.03em;text-transform:uppercase;line-height:1.1;">New Course Enquiry</h1>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding:0 40px;">
              <table cellpadding="0" cellspacing="0" style="margin-top:-1px;">
                <tr>
                  <td style="background:#C21BFF;padding:6px 16px;">
                    <span style="color:#fff;font-size:10px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;">Action Required</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
                A new enquiry was submitted on <strong style="color:#1B1C1E;">${submittedAt}</strong>. Here are the details:
              </p>
            </td>
          </tr>

          <!-- Fields -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;">
                ${[
                  ["Full Name", name],
                  ["Phone Number", phone],
                  ["Email Address", `<a href="mailto:${email}" style="color:#C21BFF;text-decoration:none;">${email}</a>`],
                  ["Course Interested In", `<strong>${courseName}</strong>`],
                ].map(([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                  <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;width:40%;">
                    <span style="font-size:10px;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.15em;">${label}</span>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;">
                    <span style="font-size:14px;font-weight:600;color:#1B1C1E;">${value}</span>
                  </td>
                </tr>`).join("")}
                ${message ? `
                <tr style="background:#ffffff;">
                  <td colspan="2" style="padding:14px 20px;">
                    <span style="display:block;font-size:10px;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">Message</span>
                    <span style="font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap;">${message}</span>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px;">
              <a href="https://supabase.com/dashboard" style="display:inline-block;background:#1B1C1E;color:#ffffff;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;border:2px solid #000;box-shadow:4px 4px 0 #C21BFF;">
                View in Supabase →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:2px solid #e5e7eb;">
              <p style="margin:0;font-size:11px;color:#9ca3af;">
                This is an automated notification from instudia. Do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function buildHostSeminarEmailHtml({
  institutionName,
  contactPerson,
  designation,
  email,
  phone,
  institutionType,
  preferredTrack,
  deliveryFormat,
  estimatedAudience,
  preferredDate,
  message,
  submittedAt,
}: {
  institutionName: string;
  contactPerson: string;
  designation?: string;
  email: string;
  phone: string;
  institutionType: string;
  preferredTrack: string;
  deliveryFormat: string;
  estimatedAudience: string;
  preferredDate?: string;
  message?: string;
  submittedAt: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Seminar Booking Request</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:2px solid #000;box-shadow:6px 6px 0 #000;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1B1C1E;padding:32px 40px;">
              <p style="margin:0;color:#C21BFF;font-size:10px;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:8px;">instudia × Institutional Partnership</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:-0.03em;text-transform:uppercase;line-height:1.1;">Seminar Host Request</h1>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding:0 40px;">
              <table cellpadding="0" cellspacing="0" style="margin-top:-1px;">
                <tr>
                  <td style="background:#FFE01B;padding:6px 16px;border:1px solid #000;">
                    <span style="color:#000;font-size:10px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;">Priority Institutional Lead</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
                An institution submitted a request to host instudia for a seminar/workshop on <strong style="color:#1B1C1E;">${submittedAt}</strong>.
              </p>
            </td>
          </tr>

          <!-- Fields -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;">
                ${[
                  ["Institution / Organization", `<strong>${institutionName}</strong>`],
                  ["Institution Type", institutionType],
                  ["Contact Person", designation ? `${contactPerson} (${designation})` : contactPerson],
                  ["Phone Number", `<a href="tel:${phone}" style="color:#1B1C1E;text-decoration:none;font-weight:700;">${phone}</a>`],
                  ["Email Address", `<a href="mailto:${email}" style="color:#C21BFF;text-decoration:none;">${email}</a>`],
                  ["Selected Track", `<strong>${preferredTrack}</strong>`],
                  ["Delivery Format", deliveryFormat],
                  ["Estimated Audience", estimatedAudience],
                  ["Preferred Timeline/Date", preferredDate || "Flexible"],
                ].map(([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                  <td style="padding:12px 18px;border-bottom:1px solid #e5e7eb;width:40%;">
                    <span style="font-size:10px;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.15em;">${label}</span>
                  </td>
                  <td style="padding:12px 18px;border-bottom:1px solid #e5e7eb;">
                    <span style="font-size:14px;font-weight:600;color:#1B1C1E;">${value}</span>
                  </td>
                </tr>`).join("")}
                ${message ? `
                <tr style="background:#ffffff;">
                  <td colspan="2" style="padding:14px 18px;">
                    <span style="display:block;font-size:10px;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">Special Requirements / Message</span>
                    <span style="font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap;">${message}</span>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td style="padding:0 40px 40px;">
              <a href="https://wa.me/91${phone.replace(/\D/g, '').slice(-10)}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;padding:12px 24px;border:2px solid #000;box-shadow:4px 4px 0 #000;margin-right:12px;">
                Chat on WhatsApp →
              </a>
              <a href="mailto:${email}?subject=instudia%20Seminar%20at%20${encodeURIComponent(institutionName)}" style="display:inline-block;background:#1B1C1E;color:#ffffff;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;padding:12px 24px;border:2px solid #000;box-shadow:4px 4px 0 #C21BFF;">
                Reply via Email →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:2px solid #e5e7eb;">
              <p style="margin:0;font-size:11px;color:#9ca3af;">
                Automated institutional dispatch from instudia host portal.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
