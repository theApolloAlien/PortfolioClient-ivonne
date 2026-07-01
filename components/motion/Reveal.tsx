"use client";

import * as React from "react";

/* Reveal — scroll-triggered fade + rise + blur-in. Ports the reference's
   "trigger then guarantee-final" pattern: after triggering the CSS reveal we
   snap to the final visible state via a timer, so nothing can stay stuck
   hidden (covers paused/off-screen transitions). Reduced-motion → shown now. */

type RevealProps = {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLElement>, "style">;

export function Reveal({ children, as: Tag = "div", delay = 0, className = "", style, ...rest }: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);
  const [settled, setSettled] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      setSettled(true);
      return;
    }
    const trigger = () => {
      setShown(true);
      setTimeout(() => setSettled(true), delay + 680);
    };
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    if (r.top < vh * 0.92 && r.bottom > 0) {
      requestAnimationFrame(trigger);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            trigger();
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settledStyle: React.CSSProperties | null = settled
    ? { transition: "none", opacity: 1, transform: "none", filter: "none" }
    : null;

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={`iw-reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...settledStyle, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}
