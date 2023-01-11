/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontSize: {
                md: '18px',
            },
            colors: {
                primary: {
                    500: '#e35205',
                },
            },
            fontFamily: {
                primary_noto: ['Noto Sans Thai', ...fontFamily.sans],
                secondary_sarabun: ['Sarabun', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
