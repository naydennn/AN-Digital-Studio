import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken?: string | null;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;

  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    body: params,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
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
    let valid: boolean;
    try {
      valid = await verifyRecaptcha(recaptchaToken);
    } catch {
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }
    if (!valid) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed." },
        { status: 422 }
      );
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "AN Digital Studio <contact@andigital.bg>",
      to: process.env.CONTACT_RECIPIENT ?? "contact@andigital.bg",
      replyTo: `${name} <${email}>`,
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
