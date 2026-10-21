/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bandera española
        'es-red': '#C60B1E',
        'es-yellow': '#FFC400',
        // Partidos
        pp: '#0056a2',
        vox: '#63BE21',
        psoe: '#E1001A',
        sumar: '#7B3FBE',
        pnv: '#1D7B40',
        bildu: '#95C11F',
        junts: '#003DA5',
        erc: '#DA3F1E',
        bng: '#005F9E',
        cc: '#FFB612',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'flag-gradient': 'linear-gradient(180deg, #C60B1E 25%, #FFC400 25%, #FFC400 75%, #C60B1E 75%)',
      }
    },
  },
  plugins: [],
}
