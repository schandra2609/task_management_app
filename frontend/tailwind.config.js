/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        times: ['Times New Roman', 'serif'],
        arial: ['Arial', 'sans-serif', 'Helvatica'],
        courier: ['Courier New'],
        cambria: ['Cambria'],
        monospace: ['monospace']
      },
    },
  },
  plugins: [],
};