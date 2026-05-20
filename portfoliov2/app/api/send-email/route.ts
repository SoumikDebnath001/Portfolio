import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ip -> timestamp of last successful send
const rateLimit = new Map<string, number>();

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  // ── Rate limit ──────────────────────────────────────
  const ip      = getIP(req);
  const lastSent = rateLimit.get(ip);
  const now      = Date.now();

  if (lastSent && now - lastSent < ONE_DAY_MS) {
    const resetsIn = Math.ceil((lastSent + ONE_DAY_MS - now) / 3600000);
    return NextResponse.json(
      { error: `You already sent a message today. Try again in ${resetsIn}h.` },
      { status: 429 },
    );
  }
  // ────────────────────────────────────────────────────

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: subject || `Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#222;">
          <p style="font-size:13px;color:#888;margin-bottom:24px;letter-spacing:0.08em;text-transform:uppercase;">
            Portfolio contact form
          </p>
          <p style="font-size:15px;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:32px 0;" />
          <p style="font-size:13px;color:#888;">
            <strong style="color:#444;">${name}</strong>&nbsp;·&nbsp;
            <a href="mailto:${email}" style="color:#888;">${email}</a>
          </p>
        </div>
      `,
    });

    // Record successful send
    rateLimit.set(ip, now);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
