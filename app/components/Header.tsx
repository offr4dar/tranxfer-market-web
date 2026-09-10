import Link from "next/link";
import { LogoMark, Wordmark, XIcon } from "./icons";

/** Site header — shared between the homepage and interior pages (privacy,
 * terms, safeguarding, ...). */
export function Header() {
  return (
    <header className="grid h-[var(--header-height)] w-full grid-cols-3 items-center bg-[#F2F2F2] px-[20px]">
      <Link href="/" aria-label="Tranxfer Market home" className="h-[46px] w-[90px] text-[#393939]">
        <LogoMark className="h-full w-full" />
      </Link>
      <Link href="/" aria-label="Tranxfer Market home" className="mx-auto h-[34px] w-[61px] text-[#393939]">
        <Wordmark className="h-full w-full" />
      </Link>
      <a
        href="https://x.com/tranxfermarket"
        target="_blank"
        rel="noreferrer"
        aria-label="Tranxfer Market on X"
        className="ml-auto h-[24px] w-[24px] text-black transition-opacity hover:opacity-70"
      >
        <XIcon className="h-full w-full" />
      </a>
    </header>
  );
}
