const colors = require("tailwindcss/colors") // eslint-disable-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme") // eslint-disable-line @typescript-eslint/no-var-requires

// For more info see: https://tailwindcss.com/docs/configuration
module.exports = {
  purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: colors.blueGray,
        orange: colors.orange,
        lime: colors.lime,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        blue: colors.lightBlue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        retro: "0.25rem 0.25rem 0 0 #0f172a",
        "retro-lg": "0.5rem 0.5rem 0 0 #0f172a",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
