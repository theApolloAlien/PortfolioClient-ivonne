import * as React from "react";
import { Floret } from "@/components/icons";

/** Avatar — softly rounded portrait frame with optional floret accent. */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  size?: number | string;
  shape?: "rounded" | "circle";
  framed?: boolean;
  ring?: boolean;
  floret?: boolean;
}

export function Avatar({
  src,
  alt = "",
  size = 96,
  shape = "rounded",
  framed = false,
  ring = false,
  floret = false,
  className = "",
  style,
  ...rest
}: AvatarProps) {
  const cls = `iw-avatar iw-avatar--${shape} ${framed ? "iw-avatar--framed" : ""} ${
    ring ? "iw-avatar--ring" : ""
  } ${className}`.trim();
  const dim = typeof size === "number" ? `${size}px` : size;
  return (
    <div className={cls} style={{ width: dim, height: dim, ...style }} {...rest}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="iw-avatar__img" src={src} alt={alt} />
      {floret && (
        <span className="iw-avatar__floret" aria-hidden="true">
          <Floret size={38} color="var(--rose)" />
        </span>
      )}
    </div>
  );
}
