import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F3EE",
        espresso: "#241812",
        blush: "#EDE4D9",
        sage: "#7C8B72",
        amber: "#D8A25E",
        stone: "#D4D0CA",
      },
      boxShadow: {
        soft: "0 28px 90px rgba(36, 24, 18, 0.10)",
        card: "0 22px 55px rgba(36, 24, 18, 0.18)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
