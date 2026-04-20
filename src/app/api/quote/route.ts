import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const BOOTH_LABELS: Record<string, string> = {
  compact: "Compact Pole PhotoBooth",
  premium: "Premium Pole PhotoBooth",
  ai: "AI PhotoBooth",
  "360": "360 VideoBooth",
};

const PACKAGE_LABELS: Record<string, string> = {
  basic: "Basic Package",
  gold: "Gold Package",
  platinum: "Platinum Package",
  custom: "Build Your Own",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { booth, date, duration, package: pkg, customAddons, printSize, backdropChoice, address, name, email, phone, notes, estimatedTotal } = body;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, sans-serif; background: #f9fafb; padding: 32px 0; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
    <div style="background: #FF6B35; padding: 28px 32px;">
      <p style="margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.75); text-transform: uppercase;">New Submission</p>
      <h1 style="margin: 6px 0 0; font-size: 24px; font-weight: 700; color: #fff;">Quote Request</h1>
    </div>
    <div style="padding: 32px;">

      <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9ca3af;">Contact Info</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        <tr><td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${name}</td></tr>
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Email</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;"><a href="mailto:${email}" style="color: #FF6B35;">${email}</a></td></tr>
        ${phone ? `<tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${phone}</td></tr>` : ""}
      </table>

      <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9ca3af;">Event Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        <tr><td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 140px;">Booth</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${BOOTH_LABELS[booth] ?? booth}</td></tr>
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Date</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${date}</td></tr>
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Duration</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${duration} hours</td></tr>
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Package</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${PACKAGE_LABELS[pkg] ?? pkg}</td></tr>
        ${customAddons?.length ? `<tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Add-ons</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${customAddons.join(", ")}</td></tr>` : ""}
        ${printSize ? `<tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Print Size</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${printSize}</td></tr>` : ""}
        ${backdropChoice ? `<tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Backdrop</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${backdropChoice}</td></tr>` : ""}
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Location</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${address}</td></tr>
      </table>

      ${estimatedTotal ? `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        <tr style="border-top: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 140px;">Estimated Total</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #FF6B35;">$${estimatedTotal}</td></tr>
      </table>` : ""}

      ${notes ? `
      <h2 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9ca3af;">Notes</h2>
      <div style="background: #f9fafb; border-radius: 8px; padding: 14px 16px; font-size: 14px; color: #374151; line-height: 1.6;">${notes}</div>
      ` : ""}

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
    subject: `New Quote Request — ${name} (${BOOTH_LABELS[booth] ?? booth})`,
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
