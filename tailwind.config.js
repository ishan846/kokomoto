/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 4px 40px 3.2px #0000001F",
        custom2: "0px 32.91px 19.75px 0px #0000000D",
        custom3: "0px 50px 30px 0px #0000000D",
      },
    },
    plugins: [],
  },
};
