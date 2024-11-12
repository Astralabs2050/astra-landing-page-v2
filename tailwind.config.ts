import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        conthrax: ["var(--font-conthrax)", "sans-serif"],
        sfui: ["var(--font-sfuitext_reg)", "sans-serif"],
        "sfui-medium": ["var(--font-sfuitext_med)", "sans-serif"],
        "sfui-semibold": ["var(--font-sfuitext_semibold)", "sans-serif"],
        "sfui-bold": ["var(--font-sfuitext_bold)", "sans-serif"],
        "sfui-heavy": ["var(--font-sfuitext_heavy)", "sans-serif"],
      },
      animation: {
        "soft-shake": "soft-shake .9s ease-in-out",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
      },
      keyframes: {
        "soft-shake": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
          "75%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
          "100%": { transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%": {
            boxShadow:
              "0 0 10px rgba(150, 150, 150, 0.4), 0 0 20px rgba(150, 150, 150, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(150, 150, 150, 0.6), 0 0 30px rgba(150, 150, 150, 0.4)",
          },
          "100%": {
            boxShadow:
              "0 0 10px rgba(150, 150, 150, 0.4), 0 0 20px rgba(150, 150, 150, 0.2)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
