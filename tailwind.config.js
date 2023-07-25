// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  width: {
    sm: '440px',
    tcw: '90%',
    f:"100%",
  },
  height: {
    sm: '547px',
    f: '100%',
    tch: '65px',
    bh:'40px'
  },
  color: {
    or: '#FB6218'
  }
};
export const plugins = [];