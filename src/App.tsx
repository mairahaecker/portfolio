import { useState, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { Reveal } from "./components/Reveal";
import Bouncy from "./components/Bouncy";
import type { BouncyState } from "./data/sprites";
import { Placeholder } from "./components/Placeholder";
import { InViewVideo } from "./components/InViewVideo";
import { ActionDock } from "./components/ActionDock";
import { CustomCursor } from "./components/CustomCursor";
import { LivingBackground } from "./components/LivingBackground";
import { Loader } from "./components/Loader";
import { ScrollProgress } from "./components/ScrollProgress";
import { DraggableCollage } from "./components/DraggableCollage";
import { useTilt, useMagnetic } from "./hooks/useMouseFx";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { confettiBurst } from "./lib/confetti";
import {
  MailIcon, PhoneIcon, LinkedInIcon, WhatsAppIcon, InstagramIcon, CalendarIcon,
  ArrowIcon, ArrowUpRight, DownloadIcon, PlayIcon, PinIcon, SparkIcon, HandshakeIcon,
  RocketIcon, MicIcon, MenuIcon, CloseIcon,
} from "./components/icons";
import {
  profile, ticker, about, stats, lookingFor, credibility, testimonial,
  pillars, highlights, talkadoo, speaking, creative,
  offClock, nav, aboutImages, speakingPhoto, media,
} from "./data/content";

function fireConfetti(e: { clientX: number; clientY: number }) {
  confettiBurst(e.clientX, e.clientY);
}

/* ----------------------------- small helpers ----------------------------- */

function MagneticLink({
  href, children, className = "", external = false, onClick,
}: {
  href: string; children: ReactNode; className?: string; external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const m = useMagnetic<HTMLAnchorElement>(0.3);
  return (
    <a
      ref={m.ref}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      onClick={onClick}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center gap-2 will-change-transform ${className}`}
    >
      {children}
    </a>
  );
}

function TiltCard({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const t = useTilt<HTMLDivElement>(max);
  return (
    <div
      ref={t.ref}
      onMouseMove={t.onMouseMove}
      onMouseLeave={t.onMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-coral">
      <span className="h-1.5 w-1.5 rounded-full bg-coral" />
      {children}
    </span>
  );
}

const pillarIcon = { spark: SparkIcon, handshake: HandshakeIcon, rocket: RocketIcon, mic: MicIcon };

/* --------------------------------- Nav ----------------------------------- */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-ink">
          Maira<span className="text-coral">.</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm font-medium text-ink-soft transition-colors hover:text-coral">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={profile.calendly}
            target="_blank"
            rel="noopener noreferrer"
            onClick={fireConfetti}
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-coral-deep sm:inline-flex"
          >
            Book a chat
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-paper px-5 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper-2"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

/* -------------------------------- Hero ----------------------------------- */

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // "Setting up the room before an event": pieces arrive and settle.
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      tl.from('[data-hero="eyebrow"]', { y: 16, opacity: 0, duration: 0.5 })
        .from('[data-hero="title"]', { y: 34, opacity: 0 }, "-=0.25")
        .from('[data-hero="sub"]', { y: 22, opacity: 0 }, "-=0.55")
        .from('[data-hero="cta"] > *', { y: 18, opacity: 0, scale: 0.92, stagger: 0.08, duration: 0.5 }, "-=0.45")
        .from('[data-hero="meta"]', { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
        .from('[data-hero="portrait"]', { scale: 0.92, opacity: 0, rotate: -2, duration: 0.9, ease: "power4.out" }, "-=1.15")
        .from('[data-hero="chip"]', { scale: 0.4, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.35")
        .from('[data-hero="ticker"]', { y: 22, opacity: 0, duration: 0.6 }, "-=0.4");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-parallax="0.12" className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber/20 blur-3xl" />
        <div data-parallax="0.22" className="absolute right-0 top-32 h-80 w-80 rounded-full bg-blush/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-16 pb-12 md:grid-cols-[1.15fr_0.85fr] md:pt-24 md:pb-20">
        <div>
          <p data-hero="eyebrow" className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Hi, I'm Maira
          </p>
          <h1 data-hero="title" className="font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.1rem]">
            I make things happen:{" "}
            <span className="text-gradient">events, ideas,</span> and the
            occasional hoodie.
          </h1>
          <p data-hero="sub" className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {profile.subline}
          </p>
          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticLink
              href={profile.calendly}
              external
              onClick={fireConfetti}
              className="squash rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-white shadow-soft hover:bg-coral-deep"
            >
              <CalendarIcon className="h-4 w-4" />
              Book a chat
            </MagneticLink>
            <a
              href="#highlights"
              className="squash inline-flex items-center gap-2 rounded-full border border-line bg-cream px-6 py-3.5 text-sm font-semibold text-ink hover:border-coral hover:text-coral-deep"
            >
              <SparkIcon className="h-4 w-4 text-coral" />
              See my work
            </a>
            <a
              href="/Maira_Haecker_CV_Munich.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="squash inline-flex items-center gap-2 rounded-full border border-line bg-cream px-6 py-3.5 text-sm font-semibold text-ink hover:border-coral hover:text-coral-deep"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </div>
          <div data-hero="meta" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <span className="inline-flex items-center gap-2">
              <PinIcon className="h-4 w-4 text-coral" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal" /> {profile.availability}
            </span>
          </div>
        </div>

        <div data-hero="portrait" className="relative mx-auto w-full max-w-sm">
          <TiltCard max={9} className="relative">
            <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] bg-gradient-to-br from-coral via-tangerine to-amber opacity-90" />
            <img
              src="/assets/people/headshot.jpg"
              alt="Maira Haecker"
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-[1.7rem] object-cover object-top shadow-lift"
            />
            <div data-hero="chip" className="absolute -bottom-4 -left-4 rotate-[-4deg] rounded-2xl bg-cream px-4 py-2.5 shadow-lift">
              <p className="font-display text-sm font-bold text-ink">Events. Building. Creative.</p>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* moving ticker strip */}
      <div data-hero="ticker" className="border-y border-line bg-ink py-3 text-paper">
        <div className="marquee-track">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="mx-5 inline-flex items-center gap-5 font-display text-sm font-semibold uppercase tracking-wide">
              {t} <SparkIcon className="h-4 w-4 text-amber" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- About ---------------------------------- */

function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal><Eyebrow>About me</Eyebrow></Reveal>
        <div className="mt-8 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <Reveal delay={80}>
            <p className="font-display text-2xl font-medium leading-snug text-ink md:text-[2rem]">
              {about.body}
            </p>
            <p className="mt-6 flex items-start gap-2.5 rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-ink-soft shadow-soft">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
              <span>{about.current}</span>
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="rounded-3xl border border-line bg-gradient-to-br from-paper-2 to-cream p-7 shadow-soft">
              <p className="font-accent text-xl italic text-coral-deep">
                {about.goGetterTitle}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {about.goGetter}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <TiltCard max={5}>
              <img
                src={aboutImages.portrait}
                alt="Maira at a startup event space"
                className="h-72 w-full rounded-3xl object-cover object-top shadow-soft"
                loading="lazy"
              />
            </TiltCard>
            <TiltCard max={5}>
              <img
                src={aboutImages.arena}
                alt="Maira at a large-scale startup event"
                className="h-72 w-full rounded-3xl object-cover shadow-soft"
                loading="lazy"
              />
            </TiltCard>
            <TiltCard max={5}>
              <img
                src={aboutImages.selfie}
                alt="Maira with peers on the way to an event"
                className="h-72 w-full rounded-3xl object-cover object-center shadow-soft"
                loading="lazy"
              />
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ What I do -------------------------------- */

function WhatIDo() {
  const [active, setActive] = useState(0);
  const p = pillars[active];
  const ActiveIcon = pillarIcon[p.icon];
  return (
    <section id="what-i-do" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>What I do</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            How I help a startup move faster.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-ink-faint">
            Hover or tap a strength to see the proof behind it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pl, i) => {
            const Icon = pillarIcon[pl.icon];
            const isActive = i === active;
            return (
              <Reveal key={pl.key} delay={i * 70}>
                <button
                  type="button"
                  data-cursor
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`flex h-full w-full flex-col rounded-3xl border p-6 text-left shadow-soft transition-all duration-300 ${
                    isActive
                      ? "-translate-y-1 border-coral/50 bg-cream shadow-lift"
                      : "border-line bg-cream/70 hover:-translate-y-1 hover:border-coral/30"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                      isActive ? "bg-coral text-white" : "bg-coral/12 text-coral"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink">
                    {pl.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{pl.body}</p>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* live detail panel */}
        <Reveal>
          <div className="mt-5 rounded-3xl border border-coral/25 bg-cream p-6 shadow-soft md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral/12 text-coral">
                  <ActiveIcon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
              </div>
              <a
                href={p.href}
                className="squash inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-coral-deep"
              >
                See related work <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {p.related.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2.5 rounded-2xl bg-paper-2/70 px-4 py-3 text-sm leading-snug text-ink-soft"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Highlights ------------------------------- */

const filters = ["All", "Building", "Operations", "Creative"] as const;

function Highlights() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = highlights.filter((h) => active === "All" || h.tag === active);
  return (
    <section id="highlights" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              A few things I'm proud of.
            </h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active === f
                      ? "bg-ink text-paper"
                      : "border border-line bg-cream text-ink-soft hover:border-coral hover:text-coral-deep"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((h, i) => (
            <Reveal key={h.title} delay={i * 70}>
              <TiltCard max={6} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-soft">
                  <div className="aspect-[4/3] overflow-hidden bg-paper-2">
                    {h.image ? (
                      <img src={h.image} alt={h.title} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <Placeholder label={h.placeholder ?? "Photo coming soon"} className="h-full rounded-none border-0" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-coral">{h.tag}</span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink">{h.title}</h3>
                    <p className="mt-1 text-xs font-medium text-ink-faint">{h.org}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{h.blurb}</p>
                    {h.link && (
                      <a
                        href={h.link}
                        {...(h.link.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-deep hover:gap-2.5"
                      >
                        {h.linkLabel} <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Talkadoo --------------------------------- */

/** Bouncy in the Talkadoo spotlight: waves hello, settles to idle, dances on
 *  hover, and jumps when poked. Decorative delight moment. */
function BouncyMascot({ className = "" }: { className?: string }) {
  const [pose, setPose] = useState<BouncyState>("wave");
  return (
    <div
      className={className}
      onMouseEnter={() => setPose("dance")}
      onMouseLeave={() => setPose("idle")}
      onClick={() => setPose("jump")}
    >
      <Bouncy state={pose} size={184} />
    </div>
  );
}

function TalkadooSpot() {
  return (
    <section id="talkadoo" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-grape to-[#5b34a8] py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-30">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-teal/40 blur-2xl" />
        <div className="absolute bottom-10 right-1/4 h-52 w-52 rounded-full bg-amber/40 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Venture in progress
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Talkadoo
          </h2>
          <p className="mt-2 font-accent text-xl italic text-amber">{talkadoo.tagline}</p>
          <p className="mt-5 max-w-md leading-relaxed text-white/80">{talkadoo.intro}</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {talkadoo.traction.map((t) => (
              <div key={t.label} className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur-sm">
                <p className="font-display text-2xl font-extrabold text-amber">{t.value}</p>
                <p className="mt-1 text-[11px] leading-tight text-white/75">{t.label}</p>
              </div>
            ))}
          </div>
          <dl className="mt-8 space-y-5">
            {talkadoo.points.map((pt) => (
              <div key={pt.label} className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-amber">{pt.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-white/90">{pt.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex flex-col items-center">
          <BouncyMascot className="absolute -top-12 right-0 z-20 cursor-pointer sm:-right-8" />
          <TiltCard max={6} className="mt-16 w-full max-w-xs">
            <img
              src={talkadoo.flyer}
              alt="Talkadoo: an interactive play mat that teaches children languages through movement"
              className="w-full rounded-2xl border-4 border-white/20 shadow-lift"
              loading="lazy"
            />
          </TiltCard>
          <div className="mt-5 flex items-end gap-4">
            <p className="max-w-[7rem] text-xs text-white/60">
              Meet Bouncy. Give him a poke. The mat, live at a fair:
            </p>
            <div className="w-[120px] shrink-0 overflow-hidden rounded-2xl border-4 border-white/20 shadow-lift">
              <InViewVideo src={media.talkadooLoop} poster={talkadoo.flyer} className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Speaking --------------------------------- */

function Speaking() {
  return (
    <section id="speaking" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>Public speaking & hosting</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            My favorite part of the job: a mic and a room.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* featured pitch video + stage photo */}
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="mx-auto max-w-[340px] overflow-hidden rounded-3xl bg-ink shadow-lift">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={media.pitchPoster}
                  className="w-full"
                >
                  <source src={media.pitchVideo} type="video/mp4" />
                </video>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
                <MicIcon className="h-4 w-4 text-coral" />
                Pitching solo on stage at Science Park. Hit play.
              </div>
              <TiltCard max={5} className="mt-5">
                <img
                  src={speakingPhoto}
                  alt="Maira pitching with her team on stage at an event"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
                  loading="lazy"
                />
              </TiltCard>
            </div>
          </Reveal>

          {/* scannable list */}
          <div className="space-y-3">
            {speaking.map((s, i) => (
              <Reveal key={s.title} delay={i * 40}>
                <article className="group flex items-start gap-4 rounded-2xl border border-transparent bg-cream p-5 transition-colors hover:border-line hover:shadow-soft">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/12 text-sm font-bold text-coral">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.detail}</p>
                    {s.link && (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-deep hover:gap-2.5"
                      >
                        <PlayIcon className="h-4 w-4" /> {s.linkLabel}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Off the clock ----------------------------- */

function OffTheClock() {
  return (
    <section id="off-the-clock" className="scroll-mt-20 bg-paper-2/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>Off the clock</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Things I make, places I go, ways I move.
          </h2>
        </Reveal>

        {/* Creative: the visual centerpiece */}
        <Reveal delay={80}>
          <div className="mt-12 rounded-3xl border border-line bg-cream p-6 shadow-soft md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">Creative</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{creative.intro}</p>
              </div>
              <span className="rounded-full bg-coral/12 px-3 py-1 text-xs font-semibold text-coral-deep">Things I make</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TiltCard>
                <img src={creative.catalog[0]} alt="Mallorca luxury jewelry catalog cover" className="aspect-[4/5] w-full rounded-2xl bg-paper-2 object-contain shadow-soft" loading="lazy" />
              </TiltCard>
              {creative.paintings.map((p) => (
                <TiltCard key={p.src}>
                  <img src={p.src} alt={p.alt} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-soft" loading="lazy" />
                </TiltCard>
              ))}
              {creative.hoodies.slice(0, 3).map((src, i) => (
                <TiltCard key={src}>
                  <img src={src} alt={`Bleach-painted hoodie ${i + 1}`} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-soft" loading="lazy" />
                </TiltCard>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-faint">
              <span className="rounded-full bg-paper-2 px-3 py-1">Paintings</span>
              <span className="rounded-full bg-paper-2 px-3 py-1">Bleach-art hoodies</span>
              <span className="rounded-full bg-paper-2 px-3 py-1">Jewelry catalog</span>
            </div>
          </div>
        </Reveal>

        {/* Travel + Sports */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal delay={120}>
            <div className="rounded-3xl border border-line bg-cream p-6 shadow-soft">
              <h3 className="font-display text-2xl font-bold text-ink">Traveling</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{offClock.travel}</p>
              <DraggableCollage
                className="mt-5 h-80"
                items={[
                  { src: offClock.travelImages[0], caption: "Beach evenings" },
                  { src: offClock.travelImages[1], caption: "Coast at dusk" },
                  { src: offClock.travelImages[2], caption: "Golden hour" },
                  { src: offClock.travelImages[3], caption: "Wherever I land" },
                ]}
              />
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="rounded-3xl border border-line bg-cream p-6 shadow-soft">
              <h3 className="font-display text-2xl font-bold text-ink">Sports</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{offClock.sports}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  "Maira training martial arts",
                  "Maira in her jiu jitsu gi",
                  "Maira snowboarding at sunset",
                  "Maira cross-country skiing",
                ].map((alt, i) => (
                  <img
                    key={alt}
                    src={offClock.sportsImages[i]}
                    alt={alt}
                    className="aspect-square w-full rounded-2xl object-cover shadow-soft"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Contact --------------------------------- */

function Contact() {
  const calendlySrc = `${profile.calendly}?hide_gdpr_banner=1&background_color=fffaf4&primary_color=ff5c39&text_color=2a1f18`;
  return (
    <section id="contact" className="scroll-mt-20 bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">Let's talk</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Looking for someone who turns chaos into momentum?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">
            I'm open to the DACH region and available from August 2026, ready to relocate for startup roles in partnerships, events, operations, and building. Book a time below, or reach me any way you like.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 rounded-2xl border border-paper/15 p-4 transition-colors hover:border-coral hover:bg-white/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/20 text-coral"><MailIcon /></span>
                <span className="flex flex-col"><span className="text-xs uppercase tracking-wider text-paper/50">Email</span><span className="font-medium">{profile.email}</span></span>
                <ArrowIcon className="ml-auto h-5 w-5 text-paper/40 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={profile.whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-paper/15 p-4 transition-colors hover:border-teal hover:bg-white/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/20 text-teal"><WhatsAppIcon /></span>
                <span className="flex flex-col"><span className="text-xs uppercase tracking-wider text-paper/50">WhatsApp</span><span className="font-medium">{profile.whatsapp}</span></span>
                <ArrowIcon className="ml-auto h-5 w-5 text-paper/40 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4 rounded-2xl border border-paper/15 p-4 transition-colors hover:border-amber hover:bg-white/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber/20 text-amber"><PhoneIcon /></span>
                <span className="flex flex-col"><span className="text-xs uppercase tracking-wider text-paper/50">Phone</span><span className="font-medium">{profile.phone}</span></span>
                <ArrowIcon className="ml-auto h-5 w-5 text-paper/40 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-paper/15 p-4 transition-colors hover:border-coral hover:bg-white/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/20 text-coral"><LinkedInIcon /></span>
                <span className="flex flex-col"><span className="text-xs uppercase tracking-wider text-paper/50">LinkedIn</span><span className="font-medium">mairahaecker1502</span></span>
                <ArrowIcon className="ml-auto h-5 w-5 text-paper/40 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-paper/15 p-4 transition-colors hover:border-blush hover:bg-white/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush/20 text-blush"><InstagramIcon /></span>
                <span className="flex flex-col"><span className="text-xs uppercase tracking-wider text-paper/50">Instagram</span><span className="font-medium">{profile.instagramHandle}</span></span>
                <ArrowIcon className="ml-auto h-5 w-5 text-paper/40 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-paper/15 bg-cream">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3 text-ink">
                <CalendarIcon className="h-4 w-4 text-coral" />
                <span className="text-sm font-semibold">Book a 30-minute chat</span>
              </div>
              <iframe
                title="Book a 30-minute chat with Maira on Calendly"
                src={calendlySrc}
                className="h-[640px] w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="bg-ink/95 text-paper/55">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 pt-8 pb-28 text-sm sm:flex-row sm:items-center">
        <span className="font-display font-bold text-paper">Maira Haecker</span>
        <span>Built from scratch by me. No em dashes were harmed.</span>
        <div className="flex items-center gap-5">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">LinkedIn</a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">{profile.instagramHandle}</a>
          <a href={`mailto:${profile.email}`} className="hover:text-paper">Email</a>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------- Looking for / Stats / Logos --------------------- */

function LookingFor() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-4">
      <div className="rounded-3xl border border-coral/25 bg-gradient-to-br from-paper-2 to-cream p-7 shadow-soft md:p-9">
        <div className="grid gap-6 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-coral/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-coral-deep">
              <SparkIcon className="h-4 w-4" /> {lookingFor.headline}
            </p>
            <p className="mt-4 font-display text-xl font-bold leading-snug text-ink">
              {lookingFor.focus}
            </p>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-ink-soft">{lookingFor.note}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {lookingFor.targets.map((t) => (
                <span key={t} className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper">
                  {t}
                </span>
              ))}
              <span className="rounded-full border border-coral/40 px-4 py-1.5 text-sm font-medium text-coral-deep">
                at startups
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <dl className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <div className="rounded-3xl border border-line bg-cream p-7 text-center shadow-soft">
              <dt className="font-display text-5xl font-extrabold text-gradient">{s.value}</dt>
              <dd className="mt-2 text-sm leading-snug text-ink-soft">{s.label}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function LogoStrip() {
  return (
    <section className="border-y border-line bg-paper-2/50 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Where I've worked & studied
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {credibility.map((c) => (
            <span key={c} className="font-display text-lg font-bold text-ink/55 transition-colors hover:text-coral-deep">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialBlock() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
      <Reveal>
        <SparkIcon className="mx-auto h-7 w-7 text-coral" />
        <blockquote className="mt-5 font-accent text-2xl italic leading-snug text-ink md:text-3xl">
          "{testimonial.quote}"
        </blockquote>
        <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-ink-faint">
          {testimonial.attribution}
        </p>
      </Reveal>
    </section>
  );
}

/* --------------------------------- App ----------------------------------- */

export default function App() {
  useSmoothScroll();
  return (
    <div className="relative min-h-screen text-ink">
      <Loader />
      <LivingBackground />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <LookingFor />
        <StatsBand />
        <About />
        <LogoStrip />
        <WhatIDo />
        <Highlights />
        <TalkadooSpot />
        <Speaking />
        <TestimonialBlock />
        <OffTheClock />
        <Contact />
      </main>
      <Footer />
      <ActionDock />
    </div>
  );
}
