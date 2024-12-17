/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.jsx",
    "./app/**/*.js",
    "./app/**/*.ts",
    "./app/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
