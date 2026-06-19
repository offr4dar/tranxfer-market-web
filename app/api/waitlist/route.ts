import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || !body.email || !EMAIL_REGEX.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from("waitlist")
    .insert({ email: body.email.trim().toLowerCase() });

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

  return NextResponse.json({ success: true });
}
