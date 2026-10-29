import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        "glass-panel": "rgba(20, 20, 23, 0.4)",
        "glass-hover": "rgba(255, 255, 255, 0.03)",
        "glass-edge": "rgba(255, 255, 255, 0.08)",
        "glass-highlight": "rgba(255, 255, 255, 0.15)",
        neon: {
          cyan: "#00f0ff",
          green: "#39ff14",
          red: "#ff2a2a",
          amber: "#ffae00",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      boxShadow: {
        "glass-edge": "inset 0 1px 0 0 rgba(255,255,255,0.1)",
        "neon-hover": "0 0 20px rgba(6,182,212,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
