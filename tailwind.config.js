/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: "100%",
                    },
                },
            },
            fontFamily: {
                sans: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
