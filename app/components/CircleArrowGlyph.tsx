/**
 * The arrow used inside the orange circular button — shared between the
 * fixed "back to home" button on interior pages (points left, its native
 * orientation) and the "scroll to next section" button on the homepage
 * hero (rotated to point to the bottom-right). Same real vector data
 * either way; only rotation differs, via `className`.
 */
export function CircleArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 65 65" fill="none" className={className} aria-hidden="true">
      <path
        d="M43 34C43.8284 34 44.5 33.3284 44.5 32.5C44.5 31.6716 43.8284 31 43 31L43 32.5L43 34ZM20.9393 31.4393C20.3536 32.0251 20.3536 32.9749 20.9393 33.5607L30.4853 43.1066C31.0711 43.6924 32.0208 43.6924 32.6066 43.1066C33.1924 42.5208 33.1924 41.5711 32.6066 40.9853L24.1213 32.5L32.6066 24.0147C33.1924 23.4289 33.1924 22.4792 32.6066 21.8934C32.0208 21.3076 31.0711 21.3076 30.4853 21.8934L20.9393 31.4393ZM43 32.5L43 31L22 31L22 32.5L22 34L43 34L43 32.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
