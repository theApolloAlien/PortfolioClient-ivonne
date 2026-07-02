"use client";

import * as React from "react";
import { NavLink } from "@/components/ui/NavLink";
import { Button } from "@/components/ui/Button";
import { Floret, Menu, Close, ArrowUpRight } from "@/components/icons";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("");
  const headerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape or when tapping outside the nav.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  React.useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav__inner container-wide">
        <a className="brand" href="#top" aria-label="Ivonne Wijaya, home">
          <Floret size={26} />
          <span className="brand__name">
            Ivonne <em>Wijaya</em>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} active={active === l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Button variant="outline" size="sm" href="#contact" className="nav-cta">
            Get in touch
          </Button>
          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="nav-mobile-menu" className={`nav-mobile ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-mobile__link" onClick={() => setOpen(false)}>
            {l.label}
            <ArrowUpRight />
          </a>
        ))}
      </div>
    </header>
  );
}
