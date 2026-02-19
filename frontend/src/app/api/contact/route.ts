import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SMTP_PORT_DEFAULT = 587;

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken?: string | null;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // skip verification when secret not configured

  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    body: params,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? SMTP_PORT_DEFAULT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ContactPayload;
  const { name, email, subject, message, recaptchaToken } = body;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (recaptchaToken) {
    const valid = await verifyRecaptcha(recaptchaToken);
    if (!valid) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed." },
        { status: 422 }
      );
    }
  }

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `"AN Digital Studio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: `"${name}" <${email}>`,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
