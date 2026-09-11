"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const WORDS = ["Game,", "Career,", "Move."];

// How long each word sits fully settled before the next transition starts,
// and how long that transition itself takes (must match the 0.6s baked
// into the ticker-slide-in/out animations in globals.css — there's no
// single shared source for this since one's a JS timer and the other a
// CSS animation-duration).
const HOLD_MS = 1800;
const TRANSITION_MS = 600;

/**
 * The animated second word in the "Your ___" hero strapline — cycles
 * Game, -> Career, -> Move. -> Game,... on an endless loop. Ported from
 * CodyHouse's animated-headlines "slide" style (with the inertia/bounce
 * overshoot stripped out — see the ticker-slide-in/out keyframes in
 * globals.css): all three words are stacked directly on top of each
 * other, and at each step the outgoing word slides down and fades out
 * while the incoming one simultaneously slides down from above and fades
 * in.
 *
 * The box's *width* still has to track whichever word is currently
 * showing (so "Your" shifts with it) — that's measured on mount and
 * resized on the same JS timer that drives which word is active, same as
 * before.
 *
 * `lineHeight` sizes both the clipping window and each word's own slot
 * from one number — they must match exactly for the single-line mask to
 * show just one word at a time, so don't set height via `className`.
 */
export function RotatingWord(props: { lineHeight: number; className?: string }) {
  // Backgrounded tabs throttle the JS timer driving this but not any CSS
  // animation still mid-flight, so the two can drift out of sync while
  // hidden. Remounting on return to the tab is simpler than reconciling
  // that drift — see the RotatingWord git history for the bug this fixes.
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") setResetKey((k) => k + 1);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return <Ticker key={resetKey} {...props} />;
}

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServerSnapshot = () => false;

function Ticker({ lineHeight, className }: { lineHeight: number; className?: string }) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const widthsRef = useRef<number[]>([]);
  const activeIndexRef = useRef(0);
  const [width, setWidth] = useState<number>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  // useSyncExternalStore (not a useEffect + useState mirror) both because
  // that's the correct tool for reading external browser state and
  // because it responds live if the OS-level setting changes mid-session,
  // not just at mount.
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServerSnapshot);

  useLayoutEffect(() => {
    // Re-measures every word's width and re-applies whichever one is
    // currently active. Called on mount, but also whenever the *rendered*
    // size of the words could have changed out from under the last
    // measurement:
    //  - once web fonts finish loading (measuring against a fallback font
    //    before then locks in the wrong width for good — how long that
    //    takes depends on network/cache timing, which is why this looked
    //    like it changed "on refresh")
    //  - on window resize (the hero this sits in has its own viewport-
    //    driven `zoom`, see page.tsx, so resizing changes the words'
    //    actual pixel size even though nothing else about them changed)
    const measure = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // getBoundingClientRect() returns rendered (post-zoom) pixels — but
      // this component sits inside Hero's always-scaling zoom (page.tsx),
      // and the width we set below is a CSS length authored *within* that
      // same zoomed subtree. Writing a post-zoom measurement straight back
      // as an authored width gets it zoomed a second time. Dividing every
      // measurement by the zoom factor keeps it in the same pre-zoom units
      // the `width` style expects. The factor itself is detected rather
      // than assumed — the wrapper's own height is a known authored
      // constant (`lineHeight`), so comparing it to the wrapper's actual
      // rendered height gives the current zoom, whatever it is, without
      // this component needing to know Hero's zoom formula at all.
      //
      // This component can be mounted but CSS-hidden (Hero hides it below
      // 768px in favour of static text) — an ancestor with display:none
      // collapses this wrapper to 0×0, which would make zoomFactor 0 and
      // every measurement 0/0 = NaN. Bail out rather than set a NaN width;
      // resize/font-ready will re-measure correctly once it's visible again.
      const wrapperHeight = wrapper.getBoundingClientRect().height;
      if (!wrapperHeight) return;

      const zoomFactor = wrapperHeight / lineHeight;
      const measured = wordRefs.current.map((el) =>
        el ? el.getBoundingClientRect().width / zoomFactor : 0,
      );
      widthsRef.current = measured;
      setWidth(measured[activeIndexRef.current]);
    };

    measure();
    document.fonts?.ready?.then(measure);

    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId != null) return;
      resizeRafId = window.requestAnimationFrame(() => {
        resizeRafId = null;
        measure();
      });
    };
    window.addEventListener("resize", handleResize);

    let timeoutId: number | undefined;
    if (!reduceMotion) {
      const scheduleNext = () => {
        timeoutId = window.setTimeout(() => {
          const next = (activeIndexRef.current + 1) % WORDS.length;
          setPreviousIndex(activeIndexRef.current);
          setActiveIndex(next);
          activeIndexRef.current = next;
          setWidth(widthsRef.current[next]);
          scheduleNext();
        }, HOLD_MS);
      };
      scheduleNext();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeRafId != null) window.cancelAnimationFrame(resizeRafId);
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion, lineHeight]);

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-block overflow-hidden ${className ?? ""}`}
      style={{ height: lineHeight, width, transition: `width ${TRANSITION_MS}ms ease-out` }}
    >
      <span className="sr-only">Your game, your career, your move.</span>
      {WORDS.map((word, i) => {
        const animation = reduceMotion
          ? undefined
          : i === activeIndex
            ? "animate-ticker-slide-in"
            : i === previousIndex
              ? "animate-ticker-slide-out"
              : undefined;
        // Under reduced motion the timer above never runs, so activeIndex
        // stays 0 forever — render that word settled-visible with no
        // animation at all rather than playing even a single slide-in.
        const settled = reduceMotion && i === activeIndex;

        return (
          <span
            key={i}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            aria-hidden="true"
            style={{ height: lineHeight }}
            className={`absolute right-0 top-0 flex items-center justify-end text-right font-heading text-[200px] font-black uppercase leading-[40px] text-primary-orange ${
              settled ? "opacity-100" : "opacity-0"
            } ${animation ?? ""}`}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
