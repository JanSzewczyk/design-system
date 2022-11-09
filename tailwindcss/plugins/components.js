const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".scroll": {
      "@apply scrollbar scrollbar-thin scrollbar-thumb-gray-600/100 hover:scrollbar-thumb-gray-600/80":
        {}
    }
  });
});
