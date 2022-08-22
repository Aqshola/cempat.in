module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        nunito: ["Nunito", "sans-serif"],
      },
      colors:{
        green:{
          primary:"#00AA13"
        },
        red:{
          primary:"#EE2737"
        },
        blue:{
          primary:"#00AED6"
        }
      }
    },
  },
  plugins: [],
}