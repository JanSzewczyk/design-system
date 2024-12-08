import plugin from "tailwindcss/plugin";

export default plugin(function ({ addUtilities }) {
  addUtilities({
    ".scroll": {
      "@apply scrollbar scrollbar-thin scrollbar-track-app-secondary scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-350":
        {}
    }
  });
});
