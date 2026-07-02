"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Floret } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Petals } from "@/components/motion/Petals";

/* Hero — full-viewport, framed by two asymmetric edge-anchored clusters of
   simple watercolor florals (sakura, lily of the valley, pressed daisies) with
   two small butterflies as accents (3 depth layers). Idle sway + rAF-lerped
   pointer parallax + scroll part-out, all transform/opacity. Reduced-motion →
   elements rest in final positions. Phones get a curated corner arrangement. */

const A = "/elements/";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

type Flower = {
  side: "l" | "r";
  src: string;
  layer: "back" | "mid" | "front";
  w: string;
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  rot: number;
  par: number;
  dx: number;
  dy: number;
  delay: number;
  dur: number;
  sway?: string;
  flip?: boolean;
};

// Every plant is anchored so its root/stem end runs OFF-frame (bottom-anchored
// deep enough, or rotated so the base points at the nearest screen edge) — no
// painted roots or cut stems ever float over open cream.
const FLOWERS: Flower[] = [
  // LEFT cluster: sakura sweeping from the top corner, lily-of-the-valley
  // bouquet grounding the bottom, pressed daisies leaning in from the edge.
  { side: "l", src: "sakura", layer: "front", w: "50vh", pos: { left: "-12vw", top: "-13vh" }, rot: -10, par: 16, dx: -180, dy: -50, delay: 0.04, dur: 7.6, sway: "16% 20%" },
  { side: "l", src: "lily-1", layer: "front", w: "42vh", pos: { left: "-7vw", bottom: "-14vh" }, rot: -5, par: 20, dx: -200, dy: 70, delay: 0.0, dur: 7.2 },
  { side: "l", src: "daisies", layer: "mid", w: "24vh", pos: { left: "-9vw", top: "36%" }, rot: 78, par: 9, dx: -120, dy: 40, delay: 0.18, dur: 8.2, sway: "50% 88%" },
  { side: "l", src: "butterfly-blue", layer: "mid", w: "10vh", pos: { left: "13vw", top: "19%" }, rot: -8, par: 14, dx: -150, dy: -30, delay: 0.3, dur: 6.4, sway: "50% 50%" },

  // RIGHT cluster: mirrored sakura up top, daisies deep in the bottom corner,
  // a lily sprig leaning in from the edge and the red butterfly drifting low.
  { side: "r", src: "sakura", layer: "front", w: "52vh", pos: { right: "-13vw", top: "-12vh" }, rot: 10, par: 17, dx: 190, dy: -55, delay: 0.08, dur: 7.9, flip: true, sway: "84% 20%" },
  { side: "r", src: "daisies", layer: "front", w: "30vh", pos: { right: "-6vw", bottom: "-13vh" }, rot: -8, par: 19, dx: 185, dy: 66, delay: 0.12, dur: 7.4, flip: true },
  { side: "r", src: "lily-2", layer: "mid", w: "27vh", pos: { right: "-9vw", top: "36%" }, rot: -75, par: 12, dx: 150, dy: 40, delay: 0.2, dur: 8.0, sway: "50% 88%" },
  { side: "r", src: "butterfly-red", layer: "mid", w: "9vh", pos: { right: "12vw", top: "62%" }, rot: 6, par: 10, dx: 130, dy: 30, delay: 0.34, dur: 6.8, sway: "50% 50%" },
];

// Phone arrangement: lily bouquet + daisies anchored deep in the bottom
// corners (root ends off-screen), sakura tucked at the top and one butterfly.
const MOBILE_FLOWERS: Flower[] = [
  { side: "l", src: "lily-1", layer: "front", w: "30vh", pos: { left: "-15vw", bottom: "-11vh" }, rot: -4, par: 12, dx: -120, dy: 60, delay: 0.02, dur: 7.2 },
  { side: "r", src: "daisies", layer: "front", w: "25vh", pos: { right: "-11vw", bottom: "-10vh" }, rot: -6, par: 12, dx: 120, dy: 58, delay: 0.08, dur: 7.5, flip: true },
  { side: "r", src: "sakura", layer: "front", w: "28vh", pos: { right: "-23vw", top: "-9vh" }, rot: 8, par: 10, dx: 130, dy: -40, delay: 0.14, dur: 7.8, flip: true, sway: "84% 20%" },
  { side: "l", src: "butterfly-blue", layer: "mid", w: "7vh", pos: { left: "9vw", top: "24%" }, rot: -6, par: 14, dx: -110, dy: -24, delay: 0.3, dur: 6.4, sway: "50% 50%" },
];

const Z = { back: 1, mid: 2, front: 3 } as const;

function HeroFlower({ f, mobile }: { f: Flower; mobile?: boolean }) {
  const outer: CSSVars = {
    ...f.pos,
    width: f.w,
    zIndex: Z[f.layer],
    "--par": f.par,
    "--dx": f.dx,
    "--dy": f.dy,
  };
  const sway: CSSVars = {
    "--rot": f.rot,
    transformOrigin: f.sway,
    animationDuration: `${f.dur}s`,
    animationDelay: `${f.delay || 0}s`,
  };
  return (
    <div
      className={`hero-fl hero-fl--${f.layer} hero-fl--${f.side}${mobile ? " hero-fl--m" : ""}`}
      style={outer}
    >
      <div className="hero-fl__inner" style={{ animationDelay: `${f.delay || 0}s` }}>
        <div className="hero-fl__sway" style={sway}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${A}${f.src}.webp`}
            alt=""
            aria-hidden="true"
            style={f.flip ? { transform: "scaleX(-1)" } : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement | null>(null);
  // Which flower set to render. "pending" until we know the viewport so we never
  // ship the wrong set to SSR (avoids a hydration mismatch and loading unused
  // images on phones). Flowers slide in via their entrance animation on mount.
  const [view, setView] = React.useState<"pending" | "d" | "m">("pending");

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const apply = () => setView(mq.matches ? "m" : "d");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  React.useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0,
      my = 0,
      tmx = 0,
      tmy = 0,
      raf = 0;
    const tick = () => {
      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      hero.style.setProperty("--mx", mx.toFixed(4));
      hero.style.setProperty("--my", my.toFixed(4));
      raf = Math.abs(tmx - mx) > 0.0005 || Math.abs(tmy - my) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      schedule();
    };
    const onLeave = () => {
      tmx = 0;
      tmy = 0;
      schedule();
    };
    const onScroll = () => {
      const sp = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
      hero.style.setProperty("--sp", sp.toFixed(3));
    };

    window.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const flowers = view === "m" ? MOBILE_FLOWERS : view === "d" ? FLOWERS : [];

  return (
    <section id="top" className="hero" ref={ref as React.RefObject<HTMLElement>}>
      <div className="hero__flowers" aria-hidden="true">
        {flowers.map((f, i) => (
          <HeroFlower key={`${view}-${i}`} f={f} mobile={view === "m"} />
        ))}
      </div>

      <div className="hero__veil" aria-hidden="true" />
      <Petals count={12} className="hero__petals" />

      <div className="hero__content container">
        <Reveal className="hero__eyebrow">
          <Floret size={16} />
          <span>Computer Science · NTU</span>
        </Reveal>

        <Reveal as="h1" className="hero__title" delay={90}>
          Building software that <em>solves real problems</em>.
        </Reveal>

        <Reveal className="hero__sub" delay={180}>
          A Year-2 Computer Science student crafting thoughtful products across full-stack web, mobile apps,
          and AI-powered tools.
        </Reveal>

        <Reveal className="hero__cta" delay={260}>
          <Button variant="filled" size="lg" href="#work" icon={<ArrowDown />}>
            View my work
          </Button>
          <Button variant="outline" size="lg" href="#contact">
            Get in touch
          </Button>
        </Reveal>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span className="hero__scroll-label">scroll</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}
