/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#16110D",
        "bg-elevated": "#211A15",
        "bg-card": "#241C16",
        velvet: "#7A1F2B",
        "velvet-light": "#9C2C3A",
        gold: "#C9A227",
        "gold-light": "#E0C15C",
        cream: "#F2E9DC",
        muted: "#A8998A",
        line: "#382C22",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
      boxShadow: {
        card: "0 6px 18px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
