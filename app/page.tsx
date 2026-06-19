import Image from "next/image";
import NotifyForm from "./components/NotifyForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="flex-1 flex flex-col bg-brand-dark overflow-hidden relative p-5 gap-2.5">
        {/* Background image */}
        <div className="absolute inset-0 opacity-50 pointer-events-none select-none">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover object-[60%_center]"
            priority
          />
        </div>

        {/* Header */}
        <header className="relative z-10 backdrop-blur-[7.55px] bg-white/12 px-5 py-2.5 rounded-[5px] flex items-center flex-shrink-0">
          <div className="w-[75px] h-[43px] overflow-hidden relative flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Tranxfer Market"
              className="w-full h-full"
            />
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center justify-center gap-[60px] py-16 md:py-[91px] relative z-10 w-full max-w-[918px] mx-auto">
          {/* Headline */}
          <div className="text-center uppercase tracking-[1.6px]">
            <h1 className="font-heading text-[clamp(40px,8vw,80px)] leading-[0.95] text-white m-0">
              Your Game. Your Career.
            </h1>
            <h1 className="font-heading text-[clamp(40px,8vw,80px)] leading-[0.95] text-brand-accent m-0">
              Your Move.
            </h1>
          </div>

          {/* Subtext */}
          <div className="flex flex-col gap-[30px] text-center text-white font-body text-[clamp(16px,2.2vw,22px)] leading-[1.21] tracking-[0.44px] px-4">
            <p className="m-0 max-w-[818px]">
              Built for scouts, coaches, players and agents to find and build
              valuable connections.
            </p>
            <p className="m-0 max-w-[818px]">
              Coming soon to Android and iPhone.
            </p>
          </div>

          {/* CTA */}
          <NotifyForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black flex items-center justify-center gap-[50px] py-[30px] flex-shrink-0 flex-wrap px-5">
        <a
          href="/terms"
          className="font-heading text-[16px] text-white uppercase tracking-[0.32px] leading-[1.21] hover:text-brand-accent transition-colors"
        >
          Terms
        </a>
        <a
          href="/privacy"
          className="font-heading text-[16px] text-white uppercase tracking-[0.32px] leading-[1.21] hover:text-brand-accent transition-colors"
        >
          Privacy
        </a>
        <a
          href="/safeguarding"
          className="font-heading text-[16px] text-white uppercase tracking-[0.32px] leading-[1.21] hover:text-brand-accent transition-colors"
        >
          Safeguarding
        </a>
      </footer>
    </div>
  );
}
