import Link from "next/link";

/** Site footer — shared between the homepage and interior pages (privacy,
 * terms, safeguarding, ...). */
export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center gap-[50px] bg-[#212121] py-[30px] font-body text-[12px] tracking-[0.24px] text-white">
      <Link href="/terms" className="hover:opacity-70 transition-opacity">
        Terms
      </Link>
      <Link href="/privacy" className="hover:opacity-70 transition-opacity">
        Privacy
      </Link>
      <Link href="/safeguarding" className="hover:opacity-70 transition-opacity">
        Safeguarding
      </Link>
    </footer>
  );
}
