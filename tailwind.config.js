/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "chat-900": "#181c24",
        "chat-800": "#111b21",
        "chat-100": "#202c34",
        "chat-50": "#303c44",
        "chat-green-500": "#0b332c",
        "chat-green-400": "#05a884",
        "chat-green-600": "#015c4b",
      },
    },
  },
  plugins: [],
};
