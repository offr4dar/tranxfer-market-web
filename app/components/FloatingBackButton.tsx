import Link from "next/link";
import { CircleArrowGlyph } from "./CircleArrowGlyph";

/**
 * The circular back-to-home button on interior pages (privacy, terms,
 * safeguarding, ...). Figma positions it with absolute coordinates against
 * the page's own (very tall) canvas, but the brief is for it to always
 * stay in view while scrolling — `fixed` (viewport-relative), not
 * `absolute` (document-relative), is what actually delivers that.
 *
 * It's a normal descendant of `body`, so it inherits the site's ambient
 * --page-zoom (see globals.css) like everything else — meaning its 65px
 * size and 20px inset would both grow above the 1500px threshold
 * otherwise. A floating control button should stay one constant,
 * comfortable-to-click size regardless of viewport width, unlike page
 * content, so every geometric value below is authored as
 * "target ÷ --page-zoom" — the same cancellation trick body's own width
 * and Hero's min-height already rely on, applied here instead of a
 * separate `zoom` override on the element (tried that; an element's own
 * zoom and its own offsets don't cancel the ambient zoom the same way at
 * the same time — dividing the values directly does).
 */
export function FloatingBackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      style={{
        bottom: "calc(20px / var(--page-zoom))",
        right: "calc(20px / var(--page-zoom))",
        width: "calc(65px / var(--page-zoom))",
        height: "calc(65px / var(--page-zoom))",
      }}
      className="fixed z-10 rounded-full bg-primary-orange text-white shadow-lg transition-opacity hover:opacity-80"
    >
      <CircleArrowGlyph className="h-full w-full" />
    </Link>
  );
}
