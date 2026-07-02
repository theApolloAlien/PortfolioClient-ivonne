"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

/* Bloom — "The fuller picture".
   Desktop (>1024px): a pinned, scroll-scrubbed stage. One CSS var --p (0..1)
   drives the gathered bouquet opening, the descending frosted disc, and the four
   facet cards fading in at the corners. (Reduced-motion → static stacked.)
   Mobile (<=1024px): a calm editorial layout — title with a lily-of-the-valley
   sprig tucked at the corner + a numbered list of the facets, revealed on scroll.
   Imagery is gated by viewport so phones load only the lily. */

const A = "/elements/";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const FACETS = [
  {
    n: "01",
    title: "Academic distinction",
    flower: "lily-2",
    kicker: "Highest Distinction · CGPA 4.91 / 5",
    points: [
      "Bachelor of Computing (Honours) in Computer Science at NTU.",
      "Coursework: data structures & algorithms, computer organisation & architecture, OOP, digital logic, and linear algebra.",
    ],
  },
  {
    n: "02",
    title: "More builds",
    flower: "sakura",
    kicker: "Beyond the headline projects",
    points: [
      "NTU Buddhist Society: shipped features into a live Next.js codebase and fixed legacy bugs.",
      "CS50W: a full-stack Django social network with REST APIs and CSRF-protected AJAX.",
    ],
  },
  {
    n: "03",
    title: "Leadership & community",
    flower: "bow-pink",
    kicker: "Four student roles",
    points: [
      "PINTU Technology Officer, building React and TypeScript web apps.",
      "NTU Buddhist Society Tech Subcommittee (Buddhist Week 2026, 500+).",
      "GTD Business Finance Manager, leading sponsorship outreach.",
      "SCDS Club Sports Officer.",
    ],
  },
  {
    n: "04",
    title: "Always learning",
    flower: "butterfly-blue",
    kicker: "Courses, certifications & hackathons",
    points: [
      "Harvard CS50 and CS50W.",
      "NUS “Road to ChatGPT”: basics of AI in language processing.",
      "Hackathons: PSA 2025, Techfest 2026, Manus AI, AWS Ideathon 2026.",
    ],
  },
];

type Bloom = { src: string; x: number; y: number; s: number; rot: number; d: number; z: number; flip?: boolean };
// A keepsake arrangement from the new kit: sakura sprays fan wide, lily of the
// valley anchors the centre, pressed daisies fill, butterflies hover above and
// a curling ribbon + pearl gather the base.
const BOUQUET: Bloom[] = [
  // sakura sprays, widest layer
  { src: "sakura", x: 27, y: 32, s: 46, rot: -8, d: 0.08, z: 2 },
  { src: "sakura", x: 73, y: 32, s: 46, rot: 8, d: 0.1, z: 2, flip: true },
  // lily sprigs at the crown
  { src: "lily-2", x: 37, y: 24, s: 20, rot: -10, d: 0.14, z: 3 },
  { src: "lily-2", x: 63, y: 24, s: 20, rot: 10, d: 0.15, z: 3, flip: true },
  // lily-of-the-valley bouquet, the centrepiece
  { src: "lily-1", x: 50, y: 43, s: 38, rot: 0, d: 0.0, z: 6 },
  // butterflies hovering at the crown
  { src: "butterfly-blue", x: 29, y: 15, s: 12, rot: -6, d: 0.22, z: 7 },
  { src: "butterfly-red", x: 69, y: 17, s: 10, rot: 8, d: 0.26, z: 7 },
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
            <img src={`${A}${b.src}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
        );
      })}
    </div>
  );
}

export function Bloom() {
  const secRef = React.useRef<HTMLElement | null>(null);
  // "pending" until we know the viewport, so we never ship the bouquet to phones
  // (or a hydration mismatch): desktop renders the bouquet, mobile the lone calla.
  const [view, setView] = React.useState<"pending" | "desktop" | "mobile">("pending");

  React.useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqNarrow = window.matchMedia("(max-width: 1024px)");
    let raf = 0;
    let revealIO: IntersectionObserver | null = null;

    const compute = () => {
      const total = sec.offsetHeight - window.innerHeight;
      const prog = total > 0 ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / total)) : 1;
      sec.style.setProperty("--p", prog.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    // Mobile editorial: a simple scroll reveal — head + each facet fade/rise in
    // as they enter the viewport.
    const teardownReveal = () => {
      revealIO?.disconnect();
      revealIO = null;
      sec.classList.remove("bloom--reveal");
    };
    const setupReveal = (active: boolean) => {
      teardownReveal();
      if (!active) return;
      const targets = [sec.querySelector(".bloom__head"), ...sec.querySelectorAll(".bloom__card")].filter(
        Boolean
      ) as Element[];
      sec.classList.add("bloom--reveal");
      revealIO = new IntersectionObserver(
        (entries, io) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
      );
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800) * 0.94 && r.bottom > 0) el.classList.add("is-in");
        else revealIO!.observe(el);
      });
    };

    const setup = () => {
      const reduce = mqReduce.matches;
      const narrow = mqNarrow.matches;
      setView(narrow ? "mobile" : "desktop");
      sec.classList.toggle("bloom--mobile", narrow);
      sec.classList.toggle("bloom--static", reduce && !narrow);
      window.removeEventListener("scroll", onScroll);
      if (narrow || reduce) {
        sec.style.setProperty("--p", "1");
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
        compute();
      }
      // reveal only for the mobile editorial layout (and only if motion is allowed)
      setupReveal(narrow && !reduce);
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
      teardownReveal();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="more" className="bloom" ref={secRef as React.RefObject<HTMLElement>} style={{ "--p": 0 } as CSSVars}>
      <div className="bloom__stage">
        <div className="bloom__head">
          {view === "mobile" && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className="bloom__stem" src={`${A}lily-1.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          )}
          <span className="bloom__eyebrow">03 · The fuller picture</span>
          <h2 className="bloom__title">
            More than <em>projects</em>
          </h2>
        </div>

        {view === "desktop" && (
          <div className="bloom__bouquet-wrap">
            <div className="bloom__glow" aria-hidden="true" />
            <Bouquet />
          </div>
        )}

        <div className="bloom__cards">
          {FACETS.map((f, i) => {
            const co = `clamp(0, calc((var(--p) - ${i * 0.12 + 0.06}) / 0.34), 1)`;
            const style: CSSVars = { "--co": co };
            return (
              <div key={f.n} className="bloom__card" style={style}>
                {view === "desktop" && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    className="bloom__card-flower"
                    data-pos={["tl", "tr", "br", "bl", "bc"][i]}
                    src={`${A}${f.flower}.webp`}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    aria-hidden="true"
                  />
                )}
                <GlassCard variant="frost" className="bloom__glass">
                  <span className="bloom__num">{f.n}</span>
                  <h3 className="bloom__card-title">{f.title}</h3>
                  <span className="bloom__kicker">{f.kicker}</span>
                  <ul className="bloom__points">
                    {f.points.map((pt, j) => (
                      <li key={j} className="bloom__point">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {view === "desktop" && (
          <div className="bloom__hint" aria-hidden="true">
            <span className="bloom__hint-dot" />
            keep scrolling to bloom
          </div>
        )}
      </div>
    </section>
  );
}
