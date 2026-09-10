import {
  CpdIcon,
  EndorsementsIcon,
  InsightsIcon,
  ParentalControlIcon,
  PerformanceLogIcon,
  ProfileAnalyticsIcon,
  TrackerIcon,
  VideoContentIcon,
} from "./components/icons";
import { Footer } from "./components/Footer";
import { GetNotifiedSection } from "./components/GetNotifiedSection";
import { Header } from "./components/Header";
import { HoverScrubVideo } from "./components/HoverScrubVideo";
import { RotatingWord } from "./components/RotatingWord";
import { ScrollToSectionButton } from "./components/ScrollToSectionButton";

function Hero() {
  // Fills the full viewport height *below Header*, so section one starts
  // right at the fold. Two things stack up here, not just one:
  //
  //  1. min-height can't be a plain 100vh: this section is a normal
  //     descendant of `body`, which carries the site's ambient
  //     --page-zoom (1 below 1500px, growing above it, see globals.css)
  //     — an authored 100vh rendered *through* that zoom would come out
  //     taller than the real viewport above 1500px, the same compounding
  //     trap body's own width had to route around. Dividing by
  //     --page-zoom cancels it: (100vh / zoom) × zoom = 100vh, always,
  //     however large the zoom gets.
  //  2. Header sits *above* this section and is part of "above the fold"
  //     too — its own rendered height (--header-height × the same
  //     ambient zoom) has to come out of the budget, or Header+Hero
  //     together render taller than one viewport and the fold lands
  //     partway through Hero instead of exactly at its bottom edge.
  //     --header-height is a plain authored length (not itself scaled by
  //     anything), so it's subtracted after dividing by zoom, not before.
  return (
    <section
      className="relative flex w-full items-center justify-center"
      style={{ minHeight: "calc((100vh / var(--page-zoom)) - var(--header-height))" }}
    >
      {/* Unlike the rest of the page, the strapline always scales with
          viewport width — it ignores the flat 768–1500px zone globals.css
          applies to `body`. It's still nested inside that scaled body
          though, and nested `zoom` values compound, so its own zoom
          divides out the ambient --page-zoom before applying its own
          continuous 100vw/1320px formula (1320 matches
          --breakpoint-desktop, the design's reference width). */}
      <div
        className="flex items-center justify-center gap-[10px]"
        style={{ zoom: "calc((100vw / 1320px) / var(--page-zoom))" }}
      >
        <span className="flex h-[194px] items-center justify-end text-right font-heading text-[200px] font-semibold uppercase leading-[40px] text-black">
          Your
        </span>
        <RotatingWord lineHeight={194} />
      </div>
      <ScrollToSectionButton targetId="section-one" />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="section-one" className="mt-[120px] flex w-full max-[850px]:flex-col items-center gap-[128px] px-[20px] pt-[120px] pb-[120px]">
      <div className="flex w-1/2 max-[850px]:w-full flex-col gap-[30px] text-black">
        <div className="font-heading text-[50px] font-semibold uppercase tracking-[1px]">
          <p className="leading-[0.95]">01+</p>
          {/* mt-[95px]: two blank display lines' worth of gap in Figma
              before the "for the ..." pair — spacer instead of empty
              paragraphs so it stays out of the accessibility tree. */}
          <p className="mt-[95px] leading-[0.95]">
            for the <span className="text-primary-orange">players</span>
          </p>
          <p className="leading-[0.95]">
            for the <span className="text-primary-orange">professionals</span>
          </p>
        </div>
        <p className="font-body text-[24px] leading-[1.21] tracking-[0.48px]">
          Build valuable connections on{" "}
          <span className="font-semibold">The Tranxfer Market</span> app
          where technology coalesces everyone in the game on one platform.
        </p>
        <p className="font-body text-[20px] leading-[1.21] tracking-[0.4px]">
          Players build their profile with performance logs, highlight
          videos, and endorsements; scouts and agents search, and shortlist
          prospects; coaches track and endorse the players they work with -
          all four can connect directly via our gated messaging system.
        </p>
        <p className="font-body text-[20px] leading-[1.21] tracking-[0.4px]">
          Our added verification layer transforms a professionals profile on
          the app to a continuously evolving digital identity that&rsquo;s
          trusted - real evidence of a legitimate and accountable presence in
          the football landscape.
        </p>
      </div>
      <div className="relative h-[756px] w-1/2 max-[850px]:w-full">
        {/* Decorative app-in-use clip, not instructional content — no
            controls, no autoplay/loop. Cursor position over it maps
            directly onto the timeline (see HoverScrubVideo): the left
            edge is always the clip's start, the right edge always its
            last frame. Page scroll has no effect on it. */}
        <HoverScrubVideo
          src="/video/app_sample.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-[100px] bg-black/13 px-[10px] py-[5px] font-body text-[10px] tracking-[0.2px] text-black">
      {label}
    </span>
  );
}

// Each card's icon keeps its own natural aspect ratio from Figma (most are
// 48x48, but the CPD book and the Performance Log pencil aren't square) —
// iconClassName carries the box size, the svg itself just fills it.
const FEATURE_CARDS: {
  Icon: (props: { className?: string }) => React.ReactElement;
  iconClassName: string;
  gapClassName: string;
  title: string;
  description: string;
  audiences: string[];
}[] = [
  {
    Icon: ParentalControlIcon,
    iconClassName: "h-[48px] w-[48px]",
    gapClassName: "gap-[18px]",
    title: "Parental control",
    description: "Young people can use the app, but any actions must be authorised",
    audiences: ["Players"],
  },
  {
    Icon: VideoContentIcon,
    iconClassName: "h-[48px] w-[48px]",
    gapClassName: "gap-[20px]",
    title: "Video Content",
    description: "Grab attention by uploading clips of your best performances",
    audiences: ["Players"],
  },
  {
    Icon: CpdIcon,
    iconClassName: "h-[48px] w-[40px]",
    gapClassName: "gap-[18px]",
    title: "CPD",
    description: "Prove your credentials with certification from regulatory bodies and accredited course providers",
    audiences: ["Professionals"],
  },
  {
    Icon: PerformanceLogIcon,
    iconClassName: "h-[44px] w-[48px]",
    gapClassName: "gap-[18px]",
    title: "Performance Log",
    description: "Demonstrate the effort being put toward improving yourself daily",
    audiences: ["Players"],
  },
  {
    Icon: InsightsIcon,
    iconClassName: "h-[48px] w-[48px]",
    gapClassName: "gap-[18px]",
    title: "TM Insights",
    description: "Content curated for professionals to help them keep on top of what’s important",
    audiences: ["Professionals"],
  },
  {
    Icon: TrackerIcon,
    iconClassName: "h-[48px] w-[48px]",
    gapClassName: "gap-[18px]",
    title: "Tracker",
    description: "Keep track of profiles that stand out so you can follow their progress",
    audiences: ["Professionals"],
  },
  {
    Icon: EndorsementsIcon,
    iconClassName: "h-[48px] w-[48px]",
    gapClassName: "gap-[18px]",
    title: "Endorsements",
    description: "Let your reputation speak — collect endorsements from verified professionals",
    audiences: ["Players"],
  },
  {
    Icon: ProfileAnalyticsIcon,
    iconClassName: "h-[48px] w-[48px]",
    gapClassName: "gap-[18px]",
    title: "Profile Analytics",
    description: "Your profile, backed by meaningful data. Take stock of your views and ‘tracked’ count over time.",
    audiences: ["Players"],
  },
];

function FeatureCard({ card }: { card: (typeof FEATURE_CARDS)[number] }) {
  const { Icon, iconClassName, gapClassName, title, description, audiences } = card;
  return (
    <div
      className={`flex h-[285px] w-[30%] max-[670px]:w-[46%] max-[450px]:w-full flex-col items-center justify-center overflow-clip rounded-[20px] bg-white px-[15px] py-[40px] ${gapClassName}`}
    >
      <Icon className={`shrink-0 text-primary-orange ${iconClassName}`} />
      <p className="font-body text-[18px] font-semibold tracking-[0.36px] text-black">{title}</p>
      <p className="text-center font-body text-[14px] tracking-[0.28px] text-black">{description}</p>
      <div className="flex items-start justify-center gap-[10px]">
        {audiences.map((audience) => (
          <Tag key={audience} label={audience} />
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="flex w-full max-[850px]:flex-col items-start justify-center gap-[60px] bg-[#F2F2F2] px-[20px] py-[120px]">
      <div className="flex h-full flex-1 max-[850px]:w-full max-[850px]:flex-none flex-col gap-[40px] font-heading text-[50px] font-semibold uppercase tracking-[1px] text-black">
        <p className="leading-[0.95]">02+</p>
        <div className="leading-[0.95]">
          <p>Features</p>
          <p>built-in</p>
        </div>
      </div>
      <div className="flex w-[936px] max-[850px]:w-full flex-wrap content-center items-center gap-[32px]">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="w-full bg-white">
      <Header />
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <GetNotifiedSection />
      <Footer />
    </main>
  );
}
