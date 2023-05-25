/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '250': '250px',
        '500': '500px',
      },
      spacing: {
        '20': '20px',
        '30': '30px',
        '40': '40px',
        '50': '50px',
        '100': '100px',
      }
    }
  },
  plugins: [],
}
