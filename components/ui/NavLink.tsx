import * as React from "react";

/** NavLink — anchor with an animated underline sweeping in from the left. */
export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  href?: string;
  active?: boolean;
}

export function NavLink({ children, href = "#", active = false, className = "", ...rest }: NavLinkProps) {
  const cls = `iw-navlink ${active ? "iw-navlink--active" : ""} ${className}`.trim();
  return (
    <a href={href} className={cls} aria-current={active ? "true" : undefined} {...rest}>
      {children}
    </a>
  );
}
