import * as React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <Reveal className="about__media">
          <div className="about__accent" aria-hidden="true" />
          <Avatar
            src="/ivonne-headshot.jpeg"
            alt="Ivonne Wijaya"
            size="100%"
            shape="rounded"
            framed
            floret
            className="about__portrait"
          />
          <Reveal className="about__chip" delay={220}>
            <Tag tone="sage" dot>
              NTU · Computing
            </Tag>
          </Reveal>
        </Reveal>

        <div className="about__body">
          <Reveal>
            <SectionLabel index="01">About me</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="section__title" delay={80}>
            I build things that <em>help people</em>.
          </Reveal>
          <Reveal className="about__lead" delay={140}>
            I&apos;m a Computer Science student at NTU who loves turning real-world problems into software that
            feels calm and considered.
          </Reveal>
          <Reveal className="about__para" delay={200}>
            Over the past few years I&apos;ve shipped React and Next.js websites, React Native mobile apps, and
            Django backends — moving comfortably between frontend polish and backend logic.
          </Reveal>
          <Reveal className="about__para" delay={260}>
            Outside of code I help run student organisations and technical projects, which taught me that good
            software is as much about people and communication as it is about writing it.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
