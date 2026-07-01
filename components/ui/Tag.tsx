import * as React from "react";

/** Tag — soft pastel pill for skills, tech stacks, labels. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  tone?: "blush" | "rose" | "sage" | "plain";
  mono?: boolean;
  dot?: boolean;
  interactive?: boolean;
}

export function Tag({
  children,
  tone = "blush",
  mono = false,
  dot = false,
  interactive = false,
  className = "",
  ...rest
}: TagProps) {
  const cls = `iw-tag iw-tag--${tone} ${mono ? "iw-tag--mono" : ""} ${
    interactive ? "iw-tag--interactive" : ""
  } ${className}`.trim();
  return (
    <span className={cls} {...rest}>
      {dot && <span className="iw-tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
