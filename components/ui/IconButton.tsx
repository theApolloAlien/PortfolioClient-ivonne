import * as React from "react";

/** IconButton — circular icon-only control (socials, toggles). Always pass label. */
export interface IconButtonProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ReactNode;
  label: string;
  variant?: "glass" | "outline" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export function IconButton({
  icon,
  label,
  variant = "outline",
  size = "md",
  href,
  disabled = false,
  className = "",
  ...rest
}: IconButtonProps) {
  const cls = `iw-iconbtn iw-iconbtn--${variant} iw-iconbtn--${size} ${className}`.trim();
  if (href && !disabled) {
    return (
      <a href={href} className={cls} aria-label={label} {...rest}>
        {icon}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      aria-label={label}
      disabled={disabled}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon}
    </button>
  );
}
