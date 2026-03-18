import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6ab149",
        secondary: "#2d8bc9",
        "background-light": "#ffffff",
        "background-alt": "#f8fafc",
        "accent-dark": "#0f172a",
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "sans-serif"],
        body: ["var(--font-sora)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
