"use client";

import { ArrowIcon } from "./icons";
import { useWaitlistForm } from "./useWaitlistForm";

export default function NotifyForm() {
  const { state, email, setEmail, errorMsg, handleSubmit } = useWaitlistForm();

  if (state === "success") {
    return (
      <div className="w-full">
        <p className="font-body text-[11px] uppercase tracking-[0.22px] text-white">
          You&apos;re on the list! We&apos;ll notify you when we go live.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-[10px] border-b border-white w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          required
          disabled={state === "loading"}
          className="flex-1 min-w-0 h-[28px] bg-transparent font-heading font-semibold text-[14px] uppercase text-white placeholder:text-white/26 outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label={state === "loading" ? "Joining…" : "Join waitlist"}
          className="shrink-0 size-[34px] text-primary-orange hover:opacity-80 disabled:opacity-40 transition-opacity cursor-pointer"
        >
          <ArrowIcon className="size-full" />
        </button>
      </form>
      {state === "error" && (
        <p className="font-body text-red-400 text-[11px] uppercase tracking-[0.22px] mt-2">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
