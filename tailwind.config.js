const colors = require("tailwindcss/colors") // eslint-disable-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme") // eslint-disable-line @typescript-eslint/no-var-requires

// For more info see: https://tailwindcss.com/docs/configuration
module.exports = {
  purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: colors.warmGray,
        orange: colors.orange,
        green: colors.green,
        blue: colors.lightBlue,
        purple: colors.purple,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        retro: "4px 4px 0 #292524",
        "retro-lg": "6px 6px 0 #292524",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["odd", "even"],
      boxShadow: ["dark"],
      outline: ["dark"],
      borderWidth: ["dark"],
      fontWeight: ["dark"],
    },
  },
  plugins: [],
}
