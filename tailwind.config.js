/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A2B49",
          foreground: "#F8F9FA"
        },
        secondary: {
          DEFAULT: "#F8F9FA",
          foreground: "#1A2B49"
        },
        accent: {
          DEFAULT: "#FF6F61",
          foreground: "#FFFFFF"
        },
        supporting: {
          DEFAULT: "#4A90E2",
          foreground: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"]
      }
    },
  },
  plugins: [],
};
