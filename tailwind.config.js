/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        118: "29.5rem",
        892: "223rem",
      },
      height: {
        100: "25rem",
      },
      colors: {
        primary: "#0d0c0d",
        secondary: "#ffffff",
        "primary-button": "#94898e",
        "secondary-button": "#edf1f5",
        Accent: "#a1979b",
      },
    },
  },
  plugins: [],
};
