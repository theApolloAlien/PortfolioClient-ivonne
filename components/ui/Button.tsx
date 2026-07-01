import * as React from "react";

/** Button — the signature rounded pill. Renders <a> when href is provided. */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: "filled" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "leading" | "trailing";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "filled",
  size = "md",
  href,
  icon,
  iconPosition = "trailing",
  disabled = false,
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  const cls = `iw-btn iw-btn--${variant} iw-btn--${size} ${className}`.trim();
  const iconEl = icon ? (
    <span
      className={`iw-btn__icon iw-btn__icon--${iconPosition === "leading" ? "lead" : "trail"}`}
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null;

  const content = (
    <>
      {iconPosition === "leading" && iconEl}
      {children && <span className="iw-btn__label">{children}</span>}
      {iconPosition === "trailing" && iconEl}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
