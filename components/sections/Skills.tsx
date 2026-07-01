import * as React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag, type TagProps } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";

const GROUPS: { label: string; tone: NonNullable<TagProps["tone"]>; items: string[] }[] = [
  {
    label: "Languages",
    tone: "blush",
    items: ["Python", "JavaScript / TypeScript", "Java", "C / C++", "PHP", "SQL", "HTML / CSS"],
  },
  {
    label: "Frameworks & Libraries",
    tone: "rose",
    items: ["React", "Next.js", "Django", "React Native", "Tailwind CSS", "Bootstrap", "Flutter"],
  },
  {
    label: "Tools & Platforms",
    tone: "sage",
    items: ["Git / GitHub", "Docker", "AWS / GCP / Azure", "PostgreSQL / MySQL / MongoDB", "Figma"],
  },
  {
    label: "Spoken",
    tone: "plain",
    items: ["English (Fluent)", "Chinese (Working proficiency)"],
  },
];

export function Skills() {
  let idx = 0;
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section__head">
          <Reveal>
            <SectionLabel index="04">Toolkit</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="section__title" delay={80}>
            What I <em>work with</em>.
          </Reveal>
        </div>

        <div className="skills__groups">
          {GROUPS.map((g) => (
            <div className="skills__group" key={g.label}>
              <Reveal className="skills__group-label">{g.label}</Reveal>
              <div className="skills__pills">
                {g.items.map((it) => {
                  const d = (idx++ % 8) * 55;
                  return (
                    <Reveal key={it} delay={d} style={{ display: "inline-flex" }}>
                      <Tag tone={g.tone} interactive>
                        {it}
                      </Tag>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
