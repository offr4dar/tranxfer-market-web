import { FloatingBackButton } from "./FloatingBackButton";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Shared shell for interior pages (privacy, terms, safeguarding, ...):
 * Header, a centred reading column for the page's own content, Footer,
 * and the fixed back-to-home button. The body column is capped at
 * Figma's 918px reading width but stays fluid below that, unlike the
 * marketing page's still-fixed-pixel sections — dense legal copy needs
 * to actually reflow on narrow viewports, not just clip.
 */
export function InteriorPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col bg-white">
      <Header />
      <main className="mx-auto flex w-full max-w-[918px] flex-col gap-[60px] px-[20px] py-[91px]">
        {children}
      </main>
      <Footer />
      <FloatingBackButton />
    </div>
  );
}
