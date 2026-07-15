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
      subject: "Your HR Personal Brand Growth Guide is here",
      html: `
  <div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; line-height: 1.6; color: #111;">
    <p>Hey ${firstName.toUpperCase()},</p>

    <p>You signed up for the <strong>HR Personal Brand Growth Guide</strong>, so here it is.</p>

    <p>
      Quick question: if someone searched your name on LinkedIn today, 
      would they immediately understand your expertise and why they should trust you?
    </p>

    <p>
      Most HR professionals are great at helping companies hire and build teams,
      but their own personal brand is almost invisible.
    </p>

    <p>
      They share job posts, company updates, and industry news — but rarely build
      authority around their own experience, insights, and expertise.
    </p>

    <p>
      This guide shows you how to turn LinkedIn into a platform that helps you:
    </p>

    <ul>
      <li>Build credibility as an HR expert</li>
      <li>Create content that attracts the right audience</li>
      <li>Grow your professional network strategically</li>
      <li>Position yourself as a trusted voice in the HR space</li>
    </ul>

    <p>
      Open the guide, implement the framework, and start building a LinkedIn presence
      that creates opportunities instead of just collecting connections.
    </p>

    <p>
      <a href="${GUIDE_URL}"
         style="display:inline-block;background:#111;color:#fff;
                padding:14px 24px;border-radius:8px;
                text-decoration:none;font-weight:600;margin:16px 0;">
        → Get Your HR Personal Brand Guide
      </a>
    </p>

    <p>
      Start with the content framework section — that's where most HR professionals
      see the biggest shift.
    </p>

    <p>
      Ramanathan Rishiharan
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
