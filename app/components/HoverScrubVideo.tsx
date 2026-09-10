"use client";

import { useEffect, useRef } from "react";

// The scrub range is a deliberately tight window into the clip, not its
// full 0–duration span: left edge = 0.5s, right edge = 6s.
const START_TIME = 0.5;
const END_TIME = 6;

/**
 * A silent, control-less video scrubbed by hovering and moving the mouse
 * over it: cursor position maps directly onto the START_TIME–END_TIME
 * window, so the video is guaranteed to be at START_TIME at the left edge
 * and at END_TIME at the right edge, however wide the element is
 * rendered. It never plays on its own — the only thing that ever moves
 * `currentTime` is cursor position while the cursor is over the video
 * (the mousemove listener lives on the element, so it's naturally scoped
 * to that — no separate hover-tracking state needed, and page scroll
 * doesn't affect it at all).
 *
 * The latest cursor position is applied once per animation frame rather
 * than on every raw mousemove event, since each `currentTime` set is a
 * real seek/decode, not a free property write — doing that at native
 * mousemove frequency stutters.
 */
export function HoverScrubVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingClientX = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Land on the real starting frame (not 0) as soon as duration/seeking
    // is available, rather than showing frame 0 until the first hover.
    const handleLoadedMetadata = () => {
      video.currentTime = START_TIME;
    };
    if (video.readyState >= 1) {
      video.currentTime = START_TIME;
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    const flush = () => {
      rafId.current = null;

      const clientX = pendingClientX.current;
      const duration = video.duration;
      if (clientX == null || !duration || Number.isNaN(duration)) return;

      const rect = video.getBoundingClientRect();
      const relativeX = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
      const clamped = Math.min(1, Math.max(0, relativeX));
      video.currentTime = START_TIME + clamped * (END_TIME - START_TIME);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingClientX.current = e.clientX;
      if (rafId.current == null) rafId.current = requestAnimationFrame(flush);
    };

    video.addEventListener("mousemove", handleMouseMove);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      aria-hidden="true"
      muted
      playsInline
      preload="auto"
      className={className}
    />
  );
}
