import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBJECT_LABELS: Record<string, string> = {
  booking: "Booking Inquiry",
  pricing: "Pricing",
  custom: "Custom Package",
  availability: "Check Availability",
  other: "Other",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  const subjectLabel = SUBJECT_LABELS[subject] ?? subject ?? "General";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, sans-serif; background: #f9fafb; padding: 32px 0; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
    <div style="background: #141414; padding: 28px 32px;">
      <p style="margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); text-transform: uppercase;">New Submission</p>
      <h1 style="margin: 6px 0 0; font-size: 24px; font-weight: 700; color: #fff;">Contact Form</h1>
    </div>
    <div style="padding: 32px;">

      <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9ca3af;">From</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        <tr><td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${name}</td></tr>
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Email</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;"><a href="mailto:${email}" style="color: #FF6B35;">${email}</a></td></tr>
        ${phone ? `<tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${phone}</td></tr>` : ""}
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Subject</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${subjectLabel}</td></tr>
      </table>

      <h2 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9ca3af;">Message</h2>
      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${message}</div>

    </div>
    <div style="padding: 20px 32px; background: #f9fafb; border-top: 1px solid #f3f4f6;">
      <p style="margin: 0; font-size: 12px; color: #9ca3af;">Submitted via <a href="https://photoboothexperience.ca/" style="color: #9ca3af;">photoboothexperience.ca</a></p>
    </div>
  </div>
</body>
</html>`;

  const { error } = await resend.emails.send({
    from: "Photo Booth Experience <notifications@photoboothexperience.ca>",
    to: "design@listella.co",
    replyTo: email,
    subject: `New Contact: ${subjectLabel} — ${name}`,
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
