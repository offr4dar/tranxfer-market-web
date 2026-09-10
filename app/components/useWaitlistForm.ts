"use client";

import { useState } from "react";

export type WaitlistState = "form" | "loading" | "success" | "error";

/**
 * Shared submission logic for the waitlist email capture — posts to
 * /api/waitlist and tracks the form/loading/success/error state. Pulled
 * out of NotifyForm so a second, differently-styled form (the "Get
 * Notified" CTA) can drive the exact same behavior instead of
 * reimplementing it.
 */
export function useWaitlistForm() {
  const [state, setState] = useState<WaitlistState>("form");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setState("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  };

  return { state, email, setEmail, errorMsg, handleSubmit };
}
