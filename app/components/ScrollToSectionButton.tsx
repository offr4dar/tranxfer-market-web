import { CircleArrowGlyph } from "./CircleArrowGlyph";

/**
 * The hero's "scroll to the next section" button — same orange circle,
 * same corner position and size as FloatingBackButton on interior pages,
 * but deliberately NOT the same component: this one is `absolute` within
 * its section (so it scrolls away with the hero, unlike the interior
 * button which stays fixed to the viewport for the whole page), it's a
 * plain in-page anchor rather than a route change, and its arrow is
 * rotated to point down-right instead of left.
 *
 * Same reasoning as FloatingBackButton for the geometry: this button is a
 * descendant of Hero, which — unlike its own inner strapline — doesn't
 * cancel the site's ambient --page-zoom for its own box (its min-height
 * is compensated instead, see Hero in page.tsx). Left unchecked, this
 * button's 65px size and 20px inset would both grow above 1500px,
 * overflowing past Hero's height (which is deliberately pinned to exactly
 * one real viewport). Every geometric value below is authored as
 * "target ÷ --page-zoom" instead — a separate `zoom` override on the
 * element doesn't cancel the ambient zoom the same way for its own
 * offsets at the same time as its size; dividing the values directly
 * does, same as Hero's own min-height.
 */
export function ScrollToSectionButton({ targetId }: { targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      aria-label="Scroll to next section"
      style={{
        bottom: "calc(20px / var(--page-zoom))",
        right: "calc(20px / var(--page-zoom))",
        width: "calc(65px / var(--page-zoom))",
        height: "calc(65px / var(--page-zoom))",
      }}
      className="absolute z-10 rounded-full bg-primary-orange text-white shadow-lg transition-opacity hover:opacity-80"
    >
      <CircleArrowGlyph className="h-full w-full rotate-[225deg]" />
    </a>
  );
}
