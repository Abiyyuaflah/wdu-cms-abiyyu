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
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Sora", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        lg: "0.75rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
