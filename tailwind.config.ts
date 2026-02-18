import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(210 20% 7%)",
        foreground: "hsl(210 20% 96%)",
        muted: "hsl(218 14% 18%)",
        "muted-soft": "hsl(218 16% 13%)",
        accent: "hsl(162 84% 56%)",
        "accent-soft": "hsl(162 82% 21%)",
        danger: "hsl(0 72% 60%)",
        border: "hsl(216 19% 24%)",
        card: "hsl(222 35% 9%)",
        "card-soft": "hsl(219 30% 11%)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        "soft-elevated":
          "0 18px 45px rgba(15, 23, 42, 0.55), 0 0 0 1px rgba(148, 163, 184, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

