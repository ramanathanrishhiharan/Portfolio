import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL!;
const SHEET_SECRET = process.env.SHEET_SECRET!;
const GUIDE_URL =
  "https://docs.google.com/document/d/1u3wtHxTac0fIFFADeBqghOC2Mnay2Pvs/copy";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, mobile } = await req.json();

    if (!firstName || !lastName || !email || !mobile) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Save lead to Google Sheet
    await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        mobile,
        secret: SHEET_SECRET,
      }),
    });

    // Send the guide email via Gmail SMTP
    await transporter.sendMail({
      from: `"Ramanathan Rishiharan" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your HR Policy Guide is here",
      html: `
        <div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; line-height: 1.6; color: #111;">
          <p>Hey ${firstName.toUpperCase()},</p>
          <p>You signed up for the HR Policy Template, so here it is.</p>
          <p>Quick gut check: if an employee asked for your leave policy in writing right now, could you hand it to them in under a minute?</p>
          <p>Most founders can tell you their revenue to the dollar and have no idea what's actually in their own HR policy — because there isn't one, just a Slack message from 18 months ago.</p>
          <p>That gap is the whole reason this exists.</p>
          <p>It covers the essentials: leave, conduct, and onboarding, so you're not starting from a blank page.</p>
          <p>Open it, swap in your company details, and you've got a real policy instead of a Slack message.</p>
          <p>The onboarding section is the one to start with.</p>
          <p>Skip it and new hires spend their first week guessing instead of working.</p>
          <p>
            <a href="${GUIDE_URL}"
               style="display:inline-block;background:#111;color:#fff;
                      padding:14px 24px;border-radius:8px;
                      text-decoration:none;font-weight:600;margin:16px 0;">
              → Download the HR Policy Template now
            </a>
          </p>
          <p>
            Onboarding Team
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
