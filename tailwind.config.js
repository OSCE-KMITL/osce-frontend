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
                    100: '#FFEEE6',
                    200: '#FFCAAE',
                    300: '#FFA576',
                    400: '#FF813E',
                    500: '#e35205',
                    600: '#B03D00',
                    700: '#7D2B00',
                    800: '#4A1A00',
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
