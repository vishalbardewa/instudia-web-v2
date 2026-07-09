import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const documentFile = formData.get('document') as File | null;

    if (!name || !email || !subject || !documentFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read the file buffer
    const arrayBuffer = await documentFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send the email with the attachment
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_TEST_SUBMIT_EMAIL || 'test_submission@instudianagaland.com',
      to: ['instudia.internal@gmail.com'], // Hardcoded to the gmail address as requested
      subject: `New Test Submission: ${subject} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </head>
        <body style="margin:0; padding:0; background-color:#1B1C1E; font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <div style="max-width:560px; margin:0 auto; padding: 32px 16px 48px;">

            <!-- ── HEADER BAR ── -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:0;">
              <tr>
                <td style="background-color:#1B1C1E; border: 3px solid #000; border-bottom: none; padding:14px 28px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <img src="https://instudianagaland.com/assets/images/instudia-dark-logo.png" alt="Instudia" style="height:24px; display:block;" />
                      </td>
                      <td align="right" style="font-size:12px; font-weight:800; color:#ffffff; letter-spacing:0.04em;">SUBMISSION ALERT</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- ── HERO BLOCK ── -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#FAFAFA; border: 3px solid #000; border-bottom: none; padding:40px 28px 48px;">
                  <p style="margin:0 0 12px 0; font-size:11px; font-weight:900; color:#1B1C1E; text-transform:uppercase; letter-spacing:0.14em; background:#FFE01B; display:inline-block; padding:4px 8px; border:2px solid #000;">📬 NEW TEST DROP</p>
                  <h1 style="margin:16px 0 0 0; font-size:36px; font-weight:900; color:#1B1C1E; line-height:1.1; letter-spacing:-0.03em;">
                    ${name}<br/>Just Submitted<br/><span style="color:#C21BFF;">${subject}</span>!
                  </h1>
                  <p style="margin:20px 0 0 0; font-size:15px; color:#555; font-weight:600; line-height:1.6;">
                    Review the details below and check the attachment to get started.
                  </p>
                </td>
              </tr>
            </table>

            <!-- ── DETAILS CARD ── -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#FAFAFA; border: 3px solid #000; border-bottom: none; padding:36px 28px 28px;">

                  <!-- Student Name Row -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid #e8e8e8;">
                    <tr>
                      <td width="40%">
                        <span style="font-size:10px; font-weight:800; color:#888; text-transform:uppercase; letter-spacing:0.12em;">Student Name</span>
                      </td>
                      <td>
                        <span style="font-size:16px; font-weight:800; color:#1B1C1E;">${name}</span>
                      </td>
                    </tr>
                  </table>

                  <!-- Email Row -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid #e8e8e8;">
                    <tr>
                      <td width="40%">
                        <span style="font-size:10px; font-weight:800; color:#888; text-transform:uppercase; letter-spacing:0.12em;">Email Address</span>
                      </td>
                      <td>
                        <a href="mailto:${email}" style="font-size:15px; font-weight:800; color:#C21BFF; text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                  </table>

                  <!-- Subject Row -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                    <tr>
                      <td width="40%">
                        <span style="font-size:10px; font-weight:800; color:#888; text-transform:uppercase; letter-spacing:0.12em;">Test / Subject</span>
                      </td>
                      <td>
                        <span style="font-size:14px; font-weight:900; color:#1B1C1E; background-color:#FFE01B; padding:5px 14px; display:inline-block; border: 2px solid #000;">${subject}</span>
                      </td>
                    </tr>
                  </table>

                  <!-- CTA Button -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <a href="mailto:${email}" style="display:inline-block; background-color:#1B1C1E; color:#ffffff; font-size:13px; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; text-decoration:none; padding:14px 36px; border:2px solid #1B1C1E;">
                          Reply to Student →
                        </a>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <!-- ── ATTACHMENT SECTION ── -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#FFE01B; border: 3px solid #000; padding:28px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding-bottom:16px;">
                        <span style="font-size:11px; font-weight:900; color:#FFE01B; text-transform:uppercase; letter-spacing:0.14em; background:#1B1C1E; padding:4px 14px; display:inline-block; border: 2px solid #1B1C1E;">📎 ATTACHMENT</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color:#ffffff; padding:18px 20px; border: 3px solid #000; box-shadow: 4px 4px 0px #000;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="background-color:#FF1B58; width:44px; height:44px; text-align:center; vertical-align:middle; font-size:20px; border: 2px solid #000;">📄</td>
                            <td style="padding-left:14px; vertical-align:middle;">
                              <p style="margin:0; font-size:13px; font-weight:700; color:#555;">File submitted:</p>
                              <p style="margin:4px 0 0 0; font-size:15px; font-weight:900; color:#1B1C1E;">${documentFile.name}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- ── FOOTER ── -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td align="center">
                  <p style="margin:0; font-size:11px; font-weight:800; color:#1B1C1E; letter-spacing:0.06em; text-transform:uppercase;">
                    Powered by Instudia &bull; Secure Submission System
                  </p>
                </td>
              </tr>
            </table>

          </div>
        </body>
        </html>
      `,
      replyTo: email, // So you can reply directly to the student
      attachments: [
        {
          filename: documentFile.name,
          content: buffer,
        }
      ]
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    console.error('Error submitting test:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
