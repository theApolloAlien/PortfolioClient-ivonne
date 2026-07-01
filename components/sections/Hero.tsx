"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Floret } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Petals } from "@/components/motion/Petals";

/* Hero — full-viewport, framed by two asymmetric edge-anchored flower clusters
   (3 depth layers). Idle sway + rAF-lerped pointer parallax + scroll part-out,
   all transform/opacity. Reduced-motion → flowers rest in final positions. */

const A = "/florals/real/";

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
  lead?: boolean;
};

const FLOWERS: Flower[] = [
  // LEFT cluster
  { side: "l", src: "leaf-sprig", layer: "back", w: "30vh", pos: { left: "-3vw", bottom: "-12vh" }, rot: -26, par: 10, dx: -150, dy: 70, delay: 0.1, dur: 7.5 },
  { side: "l", src: "hellebore-pink", layer: "back", w: "24vh", pos: { left: "-2vw", top: "18%" }, rot: 50, par: 9, dx: -130, dy: 44, delay: 0.16, dur: 8.2, sway: "52% 34%" },
  { side: "l", src: "camellia-pink", layer: "mid", w: "33vh", pos: { left: "-1vw", top: "34%" }, rot: 44, par: 15, dx: -170, dy: 60, delay: 0.08, dur: 6.8, sway: "50% 26%" },
  { side: "l", src: "peony-white", layer: "front", w: "52vh", pos: { left: "-8vw", bottom: "-15vh" }, rot: -6, par: 23, dx: -230, dy: 80, delay: 0.0, dur: 7.0, lead: true },
  { side: "l", src: "calla-white", layer: "front", w: "40vh", pos: { left: "9vw", bottom: "-9vh" }, rot: 13, par: 20, dx: -195, dy: 64, delay: 0.2, dur: 7.9 },

  // RIGHT cluster
  { side: "r", src: "leaf-sprig", layer: "back", w: "27vh", pos: { right: "-4vw", top: "2%" }, rot: 30, par: 10, dx: 150, dy: 40, delay: 0.13, dur: 8.0 },
  { side: "r", src: "peony-white", layer: "front", w: "46vh", pos: { right: "-27vh", top: "-18.4vh" }, rot: -58, par: 23, dx: 220, dy: -52, delay: 0.05, dur: 7.2, lead: true, sway: "50% 56%" },
  { side: "r", src: "camellia-pink", layer: "back", w: "30vh", pos: { right: "-16vh", top: "3.5vh" }, rot: -50, par: 8, dx: 128, dy: 42, delay: 0.2, dur: 8.6, sway: "50% 46%" },
  { side: "r", src: "camellia-pink", layer: "back", w: "23vh", pos: { right: "-14.3vh", top: "20.9vh" }, rot: -60, par: 9, dx: 138, dy: 36, delay: 0.18, dur: 7.4, sway: "51% 46%" },
  { side: "r", src: "tulip-red", layer: "mid", w: "17vh", pos: { right: "-13.2vh", top: "26vh" }, rot: -58, par: 16, dx: 170, dy: 56, delay: 0.14, dur: 7.0, sway: "52% 62%" },
  { side: "r", src: "hellebore-pink", layer: "mid", w: "31vh", pos: { right: "-19.5vh", top: "22.2vh" }, rot: -62, par: 15, dx: 175, dy: 58, delay: 0.1, dur: 6.6, sway: "50% 60%" },
  { side: "r", src: "tulip-purple", layer: "back", w: "15vh", pos: { right: "-12.5vh", top: "40.4vh" }, rot: -56, par: 9, dx: 135, dy: 40, delay: 0.28, dur: 8.1, sway: "50% 58%" },
  { side: "r", src: "ranunculus-yellow", layer: "front", w: "22vh", pos: { right: "-13.6vh", top: "42.8vh" }, rot: -64, par: 18, dx: 188, dy: 54, delay: 0.24, dur: 7.6, sway: "52% 52%" },
  { side: "r", src: "dahlia-red", layer: "mid", w: "26vh", pos: { right: "-17vh", top: "44.2vh" }, rot: -60, par: 17, dx: 185, dy: 66, delay: 0.12, dur: 7.3, sway: "50% 63%" },
  { side: "r", src: "chrysanthemum-yellow", layer: "back", w: "19vh", pos: { right: "-14.5vh", top: "60.3vh" }, rot: -55, par: 11, dx: 145, dy: 50, delay: 0.22, dur: 7.7, sway: "50% 62%" },
];

const Z = { back: 1, mid: 2, front: 3 } as const;

function HeroFlower({ f }: { f: Flower }) {
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
      className={`hero-fl hero-fl--${f.layer} hero-fl--${f.side}`}
      style={outer}
      data-lead={f.lead ? "" : undefined}
    >
      <div className="hero-fl__inner" style={{ animationDelay: `${f.delay || 0}s` }}>
        <div className="hero-fl__sway" style={sway}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}${f.src}.png`} alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement | null>(null);

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

  return (
    <section id="top" className="hero" ref={ref as React.RefObject<HTMLElement>}>
      <div className="hero__flowers" aria-hidden="true">
        {FLOWERS.map((f, i) => (
          <HeroFlower key={i} f={f} />
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
          A Year-2 Computer Science student crafting thoughtful products — full-stack web, mobile apps, and
          AI-powered tools.
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
