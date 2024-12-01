/** @type {import('tailwindcss').Config} */
module.exports = {
  rippleui: {
    defaultStyle: false,
    removeThemes: ["dark", "whateverTheme"],
  },

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "300px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    container: {
      // screens: {
      //   sm: { min: "475px", max: "500px" },
      //   xs: { min: "475px", max: "499px" },
      // },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("rippleui")],
};
