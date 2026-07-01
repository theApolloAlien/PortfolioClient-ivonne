import * as React from "react";

/** GlassCard — the frosted-glass surface. Renders <a> when `as="a"` + href. */
export interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: "glass" | "frost" | "solid" | "cream";
  interactive?: boolean;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function GlassCard({
  children,
  variant = "glass",
  interactive = false,
  as: Tag = "div",
  className = "",
  ...rest
}: GlassCardProps) {
  const cls = `iw-glasscard iw-glasscard--${variant} ${
    interactive ? "iw-glasscard--interactive" : ""
  } ${className}`.trim();
  return (
    <Tag className={cls} {...(rest as React.HTMLAttributes<HTMLElement> & { href?: string })}>
      {children}
    </Tag>
  );
}
