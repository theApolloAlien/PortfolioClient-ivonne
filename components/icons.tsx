import * as React from "react";

/* icons.tsx — Ivonne Wijaya icon set, ported 1:1 from the reference icons.js.
   Line icons (stroke, currentColor) for UI + filled brand glyphs for socials.
   Each sizes to 1em and inherits currentColor. */

type IconProps = React.SVGProps<SVGSVGElement>;

function Line({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function Solid({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
      <path d={d} />
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Line>
);

export const ArrowUpRight = (p: IconProps) => (
  <Line {...p}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </Line>
);

export const ArrowDown = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </Line>
);

export const ExternalLink = (p: IconProps) => (
  <Line {...p}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </Line>
);

export const Menu = (p: IconProps) => (
  <Line {...p}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </Line>
);

export const Close = (p: IconProps) => (
  <Line {...p}>
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </Line>
);

export const Mail = (p: IconProps) => (
  <Line {...p}>
    <rect width={18} height={14} x={3} y={5} rx={2.5} />
    <path d="m3.5 7 7.4 5.2a2 2 0 0 0 2.2 0L20.5 7" />
  </Line>
);

export const Smartphone = (p: IconProps) => (
  <Line {...p}>
    <rect width={12} height={20} x={6} y={2} rx={2.5} />
    <path d="M11 18h2" />
  </Line>
);

export const Github = (p: IconProps) => (
  <Solid
    {...p}
    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
  />
);

export const Linkedin = (p: IconProps) => (
  <Solid
    {...p}
    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  />
);

/* Floret — the six-petal mark with a cream center. Bespoke brand glyph. */
export const Floret = ({ size = 24, color = "var(--rose)" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ color }} aria-hidden="true">
    <g fill="currentColor">
      {[0, 60, 120, 180, 240, 300].map((d) => (
        <ellipse key={d} cx="24" cy="12" rx="6.4" ry="11" transform={`rotate(${d} 24 24)`} />
      ))}
    </g>
    <circle cx="24" cy="24" r="5.2" fill="#FBF6F0" />
  </svg>
);
