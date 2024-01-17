/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        salsa: ["Salsa", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        "pt-mono": ["PT Mono", "monospace"],
      },
      colors: {
        primary: "#ff512f",
      },
      backgroundImage: {
        wordcloud: `url(/svgs/bg-wordcloud.svg)`,
        pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ff512f' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        "gradient-primary":
          "linear-gradient(90deg, #ff512f, #fd6626, #f9781e, #f58919, #f09819)",
        "gradient-secondary":
          "linear-gradient(90deg, #69ff97, #15fbbc, #00f6dc, #00eef2, #00e4ff)",
      },
    },
  },
  plugins: [],
};
