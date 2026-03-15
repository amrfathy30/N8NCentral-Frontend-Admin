import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        main: "#3E8F60",
        greenLight: "#3E8F60",
        greenDark: "#2B7B4C",
        blackq: "#0E0F14",
      },
    },
  },
  plugins: [],
} satisfies Config;
