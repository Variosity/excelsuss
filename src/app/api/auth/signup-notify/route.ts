export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, username } = await req.json();

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL; // your email

    if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
      // Silently skip — don't break signup if env vars aren't set
      return NextResponse.json({ ok: true });
    }

    const now = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Member — The Excelsus</title>
</head>
<body style="margin:0;padding:0;background:#0F0D0B;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0F0D0B;padding:40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#1A1714;border:1px solid rgba(201,168,76,0.2);border-top:3px solid #C9A84C;">
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 8px;font-family:'Times New Roman',serif;font-size:22px;font-weight:900;letter-spacing:4px;color:#C9A84C;text-transform:uppercase;">
                THE EXCELSUS
              </h1>
              <p style="margin:0 0 32px;font-family:'Times New Roman',serif;font-size:11px;letter-spacing:3px;color:#6B6357;text-transform:uppercase;">
                New Member Alert
              </p>

              <div style="background:#211E1A;border:1px solid rgba(201,168,76,0.15);padding:24px;margin-bottom:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.08);">
                      <span style="font-family:'Times New Roman',serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B6357;">Username</span>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.08);text-align:right;">
                      <span style="font-family:Georgia,serif;font-size:15px;color:#F5EED8;font-weight:bold;">${username || "—"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.08);">
                      <span style="font-family:'Times New Roman',serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B6357;">Email</span>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.08);text-align:right;">
                      <span style="font-family:Georgia,serif;font-size:15px;color:#F5EED8;">${email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="font-family:'Times New Roman',serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B6357;">Time (UTC)</span>
                    </td>
                    <td style="padding:8px 0;text-align:right;">
                      <span style="font-family:Georgia,serif;font-size:15px;color:#F5EED8;">${now}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="font-family:Georgia,serif;font-size:13px;color:#6B6357;margin:0;line-height:1.6;">
                The forge grows. Review in your
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/admin" style="color:#C9A84C;text-decoration:none;"> admin panel →</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;background:#0F0D0B;border-top:1px solid rgba(201,168,76,0.08);text-align:center;">
              <p style="font-family:'Times New Roman',serif;font-size:10px;color:#6B6357;letter-spacing:2px;text-transform:uppercase;margin:0;">
                © The Excelsus — Admin Notification
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "The Excelsus <noreply@excelsus.live>",
        to: [NOTIFY_EMAIL],
        subject: `⚔ New Member: ${username || email}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[signup-notify] Resend error:", await res.text());
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup-notify] Error:", err);
    // Never let notification failure break the user flow
    return NextResponse.json({ ok: true });
  }
}
