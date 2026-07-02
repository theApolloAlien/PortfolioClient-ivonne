"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Reveal } from "@/components/motion/Reveal";
import { Petals } from "@/components/motion/Petals";
import { Mail, Github, Linkedin, ArrowUpRight, Floret } from "@/components/icons";

const EMAIL = "ivonnew0714@gmail.com";

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  // The mailto still opens the visitor's mail app; copying on the same click
  // covers machines with no mail client configured.
  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 2400);
      })
      .catch(() => {});
  };

  return (
    <section id="contact" className="contact section">
      <Petals count={10} className="contact__petals" />
      <div className="container contact__inner">
        <Reveal className="contact__floret">
          <Floret size={34} />
        </Reveal>
        <Reveal as="h2" className="contact__title" delay={80}>
          Let&apos;s build <em>something together</em>.
        </Reveal>
        <Reveal className="contact__sub" delay={150}>
          Open to internships and collaborations. The fastest way to reach me is email.
        </Reveal>

        <Reveal className="contact__cta" delay={220}>
          <Button
            variant="filled"
            size="lg"
            href={`mailto:${EMAIL}`}
            onClick={copyEmail}
            icon={<Mail />}
            iconPosition="leading"
          >
            Email me
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/Ivonne_Wijaya_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            icon={<ArrowUpRight />}
          >
            Résumé
          </Button>
        </Reveal>

        {/* Outside the Reveal: its will-change/transform would trap position:fixed. */}
        <span className={`contact__toast ${copied ? "is-on" : ""}`} role="status" aria-live="polite">
          {copied ? `${EMAIL} copied to clipboard` : ""}
        </span>

        <Reveal className="contact__socials" delay={280}>
          <IconButton
            variant="glass"
            label="GitHub"
            href="https://github.com/Ivonne828"
            target="_blank"
            rel="noreferrer"
            icon={<Github />}
          />
          <IconButton
            variant="glass"
            label="LinkedIn"
            href="https://www.linkedin.com/in/ivonnewijayaa"
            target="_blank"
            rel="noreferrer"
            icon={<Linkedin />}
          />
        </Reveal>
      </div>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <a className="brand brand--footer" href="#top" aria-label="Ivonne Wijaya, home">
            <Floret size={20} />
            <span className="brand__name">
              Ivonne <em>Wijaya</em>
            </span>
          </a>
          <span className="site-footer__meta">© 2026 · Built with Next.js · Deployed on Vercel</span>
        </div>
      </footer>
    </section>
  );
}
