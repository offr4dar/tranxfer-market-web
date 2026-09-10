"use client";

import { LargeArrowIcon } from "./icons";
import { useWaitlistForm } from "./useWaitlistForm";

/** The "03+ Get Notified" CTA — the email capture form, submitted by
 * clicking the large arrow rather than a conventional button. */
export function GetNotifiedSection() {
  const { state, email, setEmail, errorMsg, handleSubmit } = useWaitlistForm();

  return (
    <section className="relative flex w-full flex-col items-center gap-[80px] bg-primary-orange px-[20px] pt-[180px] pb-[120px] text-black">
      <p className="absolute left-[20px] top-[62px] font-heading text-[50px] font-semibold uppercase tracking-[1px]">
        03+
      </p>

      <div className="flex flex-col items-center text-center">
        <h2 className="font-heading text-[200px] max-tablet:text-[48px] font-semibold uppercase leading-[0.95]">
          Get Notified
        </h2>
        <p className="font-heading text-[111px] max-tablet:text-[48px] font-semibold uppercase leading-[0.95]">
          when we launch
        </p>
      </div>

      <div className="w-full max-w-[1269px]">
        {state === "success" ? (
          <p className="font-body text-[24px] uppercase tracking-[0.48px]">
            You&apos;re on the list! We&apos;ll notify you when we go live.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-end gap-[37px] max-tablet:gap-[16px] border-b-[10px] max-tablet:border-b-[4px] border-black"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              disabled={state === "loading"}
              className="h-[144px] max-tablet:h-[56px] min-w-0 flex-1 bg-transparent font-heading text-[100px] max-tablet:text-[28px] font-semibold uppercase outline-none placeholder:text-black/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              aria-label={state === "loading" ? "Joining…" : "Join waitlist"}
              className="size-[126px] max-tablet:size-[56px] shrink-0 cursor-pointer pb-[10px] max-tablet:pb-[4px] transition-opacity hover:opacity-70 disabled:opacity-40"
            >
              <LargeArrowIcon className="size-full" />
            </button>
          </form>
        )}
        {state === "error" && (
          <p className="mt-3 font-body text-[16px] uppercase tracking-[0.32px]">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
