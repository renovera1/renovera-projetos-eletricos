export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#061525",
          900: "#0A2037",
          800: "#102D49",
          700: "#174265",
        },
        energy: {
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(45,212,191,.12), 0 22px 65px rgba(8,30,54,.22)",
        crisp: "0 22px 60px rgba(6,21,37,.16)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(94,234,212,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
