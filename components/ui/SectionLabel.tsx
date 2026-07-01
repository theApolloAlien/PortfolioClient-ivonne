import * as React from "react";
import { Floret } from "@/components/icons";

/** SectionLabel — the eyebrow: mono index, rose rule, tracked label, optional floret. */
export interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  index?: string;
  floret?: boolean;
}

export function SectionLabel({ children, index, floret = false, className = "", ...rest }: SectionLabelProps) {
  const cls = `iw-sectionlabel ${className}`.trim();
  return (
    <span className={cls} {...rest}>
      {floret && (
        <span className="iw-sectionlabel__floret" aria-hidden="true">
          <Floret size={16} color="var(--rose)" />
        </span>
      )}
      {index && <span className="iw-sectionlabel__index">{index}</span>}
      <span className="iw-sectionlabel__rule" aria-hidden="true" />
      <span className="iw-sectionlabel__label">{children}</span>
    </span>
  );
}
