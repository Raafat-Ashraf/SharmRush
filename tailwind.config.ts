import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Brand palette extracted from the SharmRush logo
        navy: {
          50: "#eef4fb",
          100: "#d6e3f3",
          200: "#aec8e7",
          300: "#7ba3d6",
          400: "#4a7cc0",
          500: "#2c5d9f",
          600: "#1f487f",
          700: "#163a67",
          800: "#0f2a4a",
          900: "#0a1f38",
          950: "#06121f",
        },
        aqua: {
          50: "#ecfdfd",
          100: "#cff9f9",
          200: "#a4f1f3",
          300: "#67e4e9",
          400: "#26ccd6",
          500: "#0bb1bf",
          600: "#0a8c9d",
          700: "#0f6f7e",
          800: "#135a67",
          900: "#144b58",
          950: "#06313b",
        },
        sun: {
          50: "#fff5ed",
          100: "#ffe7d3",
          200: "#ffcaa6",
          300: "#ffa56d",
          400: "#ff7a18",
          500: "#fb5e07",
          600: "#ec4403",
          700: "#c43006",
          800: "#9c280d",
          900: "#7e240e",
          950: "#440f04",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(6, 18, 31, 0.18)",
        glow: "0 0 40px -8px rgba(38, 204, 214, 0.55)",
        "glow-sun": "0 0 36px -6px rgba(255, 122, 24, 0.55)",
      },
      backgroundImage: {
        "ocean-gradient":
          "linear-gradient(135deg, #0a1f38 0%, #135a67 55%, #0bb1bf 100%)",
        "ocean-radial":
          "radial-gradient(120% 120% at 50% 0%, #135a67 0%, #0a1f38 60%, #06121f 100%)",
        "sun-gradient": "linear-gradient(135deg, #ff7a18 0%, #fb5e07 100%)",
        "aqua-gradient": "linear-gradient(135deg, #26ccd6 0%, #0a8c9d 100%)",
      },
      keyframes: {
        "wave-slow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wave-fast": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "bubble-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.4" },
          "100%": { transform: "translateY(-110vh) scale(1.3)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "wave-slow": "wave-slow 18s linear infinite",
        "wave-fast": "wave-fast 10s linear infinite",
        float: "float 6s ease-in-out infinite",
        "bubble-rise": "bubble-rise linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
