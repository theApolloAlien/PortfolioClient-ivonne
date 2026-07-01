"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

/* Bloom — "The fuller picture": a pinned, scroll-scrubbed stage. One CSS var
   --p (0..1) drives the gathered bouquet opening, the descending frosted disc,
   and the four facet cards staggering in. Reduced-motion or ≤1024px → static
   fallback (bouquet on top, cards stacked). Transforms/opacity only. */

const A = "/florals/real/";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const FACETS = [
  {
    n: "01",
    title: "Academic distinction",
    flower: "peony-white",
    kicker: "Highest Distinction · 4.91 / 5",
    body:
      "Bachelor of Computing (Honours) in Computer Science at NTU, with coursework across algorithms, computer architecture, and OOP.",
  },
  {
    n: "02",
    title: "More builds",
    flower: "ranunculus-yellow",
    kicker: "Beyond the headline projects",
    body:
      "NTU Buddhist Society — shipped features into a live Next.js codebase. CS50W — a full-stack Django social network with REST APIs.",
  },
  {
    n: "03",
    title: "Leadership & community",
    flower: "dahlia-red",
    kicker: "Four student roles",
    body:
      "PINTU Technology Officer · NTUBS Tech Subcommittee (Buddhist Week, 500+) · GTD Finance Manager · SCDS Sports Officer.",
  },
  {
    n: "04",
    title: "Always learning",
    flower: "hellebore-pink",
    kicker: "Courses & hackathons",
    body: "Harvard CS50 & CS50W · NUS “Road to ChatGPT” · Hackathons: PSA, Techfest, Manus AI, AWS Ideathon.",
  },
];

type Pos = { left?: string; right?: string; top?: string; bottom?: string; center?: boolean };
const POS: Pos[] = [
  { left: "var(--bx)", top: "var(--bytop)" },
  { right: "var(--bx)", top: "var(--bytop)" },
  { right: "var(--bx)", bottom: "var(--bybot)" },
  { left: "var(--bx)", bottom: "var(--bybot)" },
];

type Bloom = { src: string; x: number; y: number; s: number; rot: number; d: number; z: number; flip?: boolean };
const BOUQUET: Bloom[] = [
  // back foliage
  { src: "leaf-sprig", x: 12, y: 30, s: 38, rot: -42, d: 0.16, z: 1, flip: false },
  { src: "leaf-sprig", x: 88, y: 30, s: 38, rot: 42, d: 0.18, z: 1, flip: true },
  { src: "leaf-sprig", x: 30, y: 21, s: 28, rot: -20, d: 0.2, z: 1, flip: false },
  { src: "leaf-sprig", x: 70, y: 21, s: 28, rot: 20, d: 0.22, z: 1, flip: true },
  // crown
  { src: "camellia-pink", x: 18, y: 33, s: 30, rot: -18, d: 0.1, z: 2 },
  { src: "hellebore-pink", x: 34, y: 27, s: 27, rot: -8, d: 0.07, z: 3 },
  { src: "peony-white", x: 50, y: 30, s: 34, rot: 0, d: 0.0, z: 5 },
  { src: "chrysanthemum-yellow", x: 66, y: 27, s: 26, rot: 8, d: 0.06, z: 3 },
  { src: "camellia-pink", x: 82, y: 33, s: 29, rot: 18, d: 0.11, z: 2, flip: true },
  // second row
  { src: "rose-red", x: 31, y: 45, s: 29, rot: -12, d: 0.13, z: 3 },
  { src: "peony-white", x: 50, y: 47, s: 32, rot: 0, d: 0.09, z: 6 },
  { src: "hellebore-pink", x: 69, y: 45, s: 28, rot: 12, d: 0.12, z: 4 },
  // third row
  { src: "ranunculus-yellow", x: 41, y: 58, s: 26, rot: -7, d: 0.16, z: 5 },
  { src: "camellia-pink", x: 59, y: 58, s: 26, rot: 7, d: 0.15, z: 4 },
  // point
  { src: "dahlia-red", x: 50, y: 69, s: 27, rot: 0, d: 0.18, z: 6 },
];

function Bouquet() {
  return (
    <div className="bloom__bouquet">
      {BOUQUET.map((b, i) => {
        const style: CSSVars = {
          "--rot": b.rot,
          "--b": `clamp(0, calc((var(--p) - ${b.d}) / 0.5), 1)`,
          left: `${b.x}%`,
          top: `${b.y}%`,
          width: `${b.s}%`,
          zIndex: b.z,
          opacity: "calc(0.2 + 0.8 * var(--b))",
          transform: `translate(-50%, -50%) rotate(calc(var(--rot) * 1deg * var(--b))) scale(calc(0.55 + 0.45 * var(--b)))${
            b.flip ? " scaleX(-1)" : ""
          }`,
        };
        return (
          <div key={i} className="bloom__bloom" style={style}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}${b.src}.png`} alt="" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
}

export function Bloom() {
  const secRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqNarrow = window.matchMedia("(max-width: 1024px)");
    let raf = 0;
    const compute = () => {
      const total = sec.offsetHeight - window.innerHeight;
      const prog = total > 0 ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / total)) : 1;
      sec.style.setProperty("--p", prog.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    const setup = () => {
      const stack = mqReduce.matches || mqNarrow.matches;
      sec.classList.toggle("bloom--static", stack);
      window.removeEventListener("scroll", onScroll);
      if (stack) {
        sec.style.setProperty("--p", "1");
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
        compute();
      }
    };
    setup();
    window.addEventListener("resize", setup);
    mqReduce.addEventListener?.("change", setup);
    mqNarrow.addEventListener?.("change", setup);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setup);
      mqReduce.removeEventListener?.("change", setup);
      mqNarrow.removeEventListener?.("change", setup);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="more" className="bloom" ref={secRef as React.RefObject<HTMLElement>} style={{ "--p": 0 } as CSSVars}>
      <div className="bloom__stage">
        <div className="bloom__head">
          <span className="bloom__eyebrow">03 — The fuller picture</span>
          <h2 className="bloom__title">
            More than <em>projects</em>
          </h2>
        </div>

        <div className="bloom__bouquet-wrap">
          <div className="bloom__glow" aria-hidden="true" />
          <Bouquet />
        </div>

        <div className="bloom__cards">
          {FACETS.map((f, i) => {
            const co = `clamp(0, calc((var(--p) - ${i * 0.12 + 0.06}) / 0.34), 1)`;
            const base = POS[i].center ? "translateX(-50%) " : "";
            const style: CSSVars = {
              "--co": co,
              left: POS[i].left,
              right: POS[i].right,
              top: POS[i].top,
              bottom: POS[i].bottom,
              opacity: "var(--co)",
              transform: `${base}translateY(calc((1 - var(--co)) * 26px))`,
              filter: "blur(calc((1 - var(--co)) * 5px))",
            };
            return (
              <div key={f.n} className="bloom__card" style={style}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="bloom__card-flower"
                  data-pos={["tl", "tr", "br", "bl", "bc"][i]}
                  src={`${A}${f.flower}.png`}
                  alt=""
                  aria-hidden="true"
                />
                <GlassCard variant="frost" className="bloom__glass">
                  <span className="bloom__num">{f.n}</span>
                  <h3 className="bloom__card-title">{f.title}</h3>
                  <span className="bloom__kicker">{f.kicker}</span>
                  <p className="bloom__body">{f.body}</p>
                </GlassCard>
              </div>
            );
          })}
        </div>

        <div className="bloom__hint" aria-hidden="true">
          <span className="bloom__hint-dot" />
          keep scrolling to bloom
        </div>
      </div>
    </section>
  );
}
