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
        cream: "#F9F7F4",
        espresso: "#3A271E",
        blush: "#E9D7D7",
        sage: "#CBD3B8",
        amber: "#E6A94A",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(58, 39, 30, 0.12)",
        card: "0 18px 45px rgba(58, 39, 30, 0.16)",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
