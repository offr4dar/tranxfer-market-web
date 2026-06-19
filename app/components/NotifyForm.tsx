"use client";

import { useState } from "react";

type State = "idle" | "form" | "loading" | "success" | "error";

export default function NotifyForm() {
  const [state, setState] = useState<State>("idle");
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

  if (state === "success") {
    return (
      <div className="text-center flex flex-col gap-2">
        <p className="font-body text-white text-xl font-bold">
          You&apos;re on the list!
        </p>
        <p className="font-body text-white/60 text-sm">
          We&apos;ll notify you when we go live.
        </p>
      </div>
    );
  }

  if (state === "idle") {
    return (
      <button
        onClick={() => setState("form")}
        className="bg-white text-black font-body font-bold text-[14px] tracking-[0.28px] px-[60px] py-5 rounded-full shadow-[0px_4px_6.9px_rgba(0,0,0,0.25)] hover:bg-zinc-100 transition-colors cursor-pointer"
      >
        Notify me!
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoFocus
          className="flex-1 bg-white/15 text-white placeholder:text-white/40 border border-white/25 rounded-full px-6 py-[18px] text-[14px] tracking-[0.28px] font-body outline-none focus:border-white/60 focus:bg-white/20 transition-all backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="bg-white text-black font-body font-bold text-[14px] tracking-[0.28px] px-8 py-[18px] rounded-full shadow-[0px_4px_6.9px_rgba(0,0,0,0.25)] hover:bg-zinc-100 disabled:opacity-60 transition-all whitespace-nowrap cursor-pointer"
        >
          {state === "loading" ? "Joining…" : "Join waitlist"}
        </button>
      </form>
      {state === "error" && (
        <p className="font-body text-red-400 text-sm text-center">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
