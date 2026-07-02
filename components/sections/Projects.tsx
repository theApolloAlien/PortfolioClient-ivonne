import * as React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, Smartphone } from "@/components/icons";

type Project = {
  name: string;
  kind: string;
  element: string;
  tone: string;
  summary: string;
  tags: string[];
  mobile?: boolean;
  href?: string;
};

// Each card carries a keepsake element instead of a botanical specimen:
// a pearl heart for the friend-group expense app, a champagne award bow for
// the sports event site, and a pearl star for the games platform.
const PROJECTS: Project[] = [
  {
    name: "Splitly",
    kind: "Mobile expense-splitting app",
    element: "pearl-heart",
    tone: "media--rose",
    summary:
      "A group expense-splitter that uses a debt-simplification algorithm to settle up in the fewest transactions.",
    tags: ["React Native", "Expo", "Python", "AWS Lambda", "DynamoDB"],
    mobile: true,
  },
  {
    name: "KINGS Cup",
    kind: "University sports event website",
    element: "bow-cream",
    tone: "media--blush",
    summary:
      "Public hub for a university-wide sports event, with responsive interfaces and GSAP-powered motion, built with a 15+ team.",
    tags: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
    href: "https://www.kingscupsg.com/",
  },
  {
    name: "Gamify",
    kind: "Browser game platform",
    element: "pearl-star",
    tone: "media--sage",
    summary:
      "A browser-based games platform built from scratch, with 1,000+ weekly visitors and a PHP-backed comment system.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    href: "https://gamify.fun/",
  },
];

function Card({ p, i }: { p: Project; i: number }) {
  const linkProps = p.href
    ? ({ as: "a" as const, href: p.href, target: "_blank", rel: "noreferrer" })
    : {};
  return (
    <Reveal delay={i * 110}>
      <GlassCard variant="frost" interactive className="work-card" {...linkProps}>
        <div className={`work-card__media ${p.tone}`} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="work-card__flower" src={`/elements/${p.element}.webp`} alt="" loading="lazy" decoding="async" />
          <span className="work-card__badge">
            {p.mobile ? <Smartphone /> : <ArrowUpRight />}
            {p.mobile ? "Mobile app" : "Live site"}
          </span>
        </div>
        <div className="work-card__kind">{p.kind}</div>
        <h3 className="work-card__title">{p.name}</h3>
        <p className="work-card__summary">{p.summary}</p>
        <div className="work-card__tags">
          {p.tags.map((t) => (
            <Tag key={t} tone="blush" mono>
              {t}
            </Tag>
          ))}
        </div>
        <div className="work-card__foot">
          {p.href ? (
            <span className="work-card__link">
              Visit site <ArrowUpRight />
            </span>
          ) : (
            <span className="work-card__link work-card__link--muted">No public link yet</span>
          )}
        </div>
      </GlassCard>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="work" className="work section">
      <div className="work__sky" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="work__cloud work__cloud--a" src="/elements/cloud.webp" alt="" loading="lazy" decoding="async" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="work__cloud work__cloud--b" src="/elements/cloud.webp" alt="" loading="lazy" decoding="async" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="work__cloud work__cloud--c" src="/elements/cloud.webp" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="container">
        <div className="section__head">
          <Reveal>
            <SectionLabel index="02" floret>
              Selected work
            </SectionLabel>
          </Reveal>
          <Reveal as="h2" className="section__title" delay={80}>
            Things I&apos;ve <em>shipped</em>.
          </Reveal>
          <Reveal className="section__intro" delay={140}>
            A few projects spanning mobile, web platforms, and team builds.
          </Reveal>
        </div>
        <div className="work__grid">
          {PROJECTS.map((p, i) => (
            <Card key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
