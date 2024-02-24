/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          off: "var(--background-off)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          off: "var(--foreground-off)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          off: "var(--primary-off)",
        },
        secondary: {
          // Corrected spelling from "secondery" to "secondary"
          DEFAULT: "var(--secondary)",
          off: "var(--secondary-off)",
        },
        border: "var(--border)", // Corrected syntax for the var function
      },
    },
  },
};
