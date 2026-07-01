import type { Config } from "tailwindcss";

/**
 * Tailwind is wired to the Ivonne Wijaya design tokens (all defined as CSS
 * variables in app/globals.css). The site's bespoke visuals are authored as
 * plain CSS in globals.css for pixel fidelity; these mappings expose the same
 * tokens as Tailwind utilities where convenient.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "warm-white": "var(--warm-white)",
        cream: "var(--cream)",
        "cream-deep": "var(--cream-deep)",
        sand: "var(--sand)",
        blush: "var(--blush)",
        "rose-soft": "var(--rose-soft)",
        "rose-mid": "var(--rose-mid)",
        rose: "var(--rose)",
        "rose-deep": "var(--rose-deep)",
        "rose-deeper": "var(--rose-deeper)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-soft": "var(--ink-soft)",
        sage: "var(--sage)",
        "sage-deep": "var(--sage-deep)",
        "green-deep": "var(--green-deep)",
      },
      fontFamily: {
        serif: "var(--font-serif)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "glow-rose": "var(--glow-rose)",
        "glow-rose-soft": "var(--glow-rose-soft)",
      },
      transitionTimingFunction: {
        soft: "var(--ease-soft)",
        "in-out": "var(--ease-in-out)",
        emphasis: "var(--ease-emphasis)",
      },
      maxWidth: {
        container: "var(--container-max)",
        "container-wide": "var(--container-wide)",
        text: "var(--container-text)",
      },
    },
  },
  plugins: [],
};

export default config;
