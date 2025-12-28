/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                secondary: '#57C82F',
                primary: '#2F57C8'
            },
        },
    },
    plugins: [],
};