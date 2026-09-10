import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { createResendClient } from "@/lib/resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendAcknowledgementEmail(email: string) {
  // The signup itself already succeeded (they're in the waitlist table) by
  // the time this runs — nothing in here should be able to turn that into
  // a failure response to the caller, only something to notice
  // server-side. That includes `new Resend()` itself, which throws
  // synchronously (not just an async rejection) when RESEND_API_KEY is
  // missing/empty — exactly the state this runs in until it's configured.
  try {
    const resend = createResendClient();
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "You're on the list",
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #000;">
          <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; color: #ff6a00; margin: 0 0 24px;">
            Tranxfer Market
          </p>
          <h1 style="font-size: 22px; margin: 0 0 16px;">You&rsquo;re on the list.</h1>
          <p style="font-size: 15px; line-height: 1.5; margin: 0 0 16px;">
            Thanks for signing up — we&rsquo;ll email you the moment Tranxfer Market goes live.
          </p>
          <p style="font-size: 15px; line-height: 1.5; margin: 0;">
            Built for scouts, coaches, players and agents to find and build valuable connections.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Waitlist acknowledgement email error:", error);
    }
  } catch (err) {
    console.error("Waitlist acknowledgement email error:", err);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || !body.email || !EMAIL_REGEX.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();

  const supabase = createServerClient();
  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already registered." },
        { status: 409 }
      );
    }
    console.error("Waitlist insert error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  await sendAcknowledgementEmail(email);

  return NextResponse.json({ success: true });
}
