const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    ".typography-heading-1": {
      "@apply font-poppins text-6xl font-light leading-relaxed -tracking-[.01562em]": {}
    },
    ".typography-heading-2": {
      "@apply leading-[1.2] font-poppins text-5xl font-light -tracking-[.00833em]": {}
    },
    ".typography-heading-3": {
      "@apply font-poppins text-4xl font-normal leading-[1.167] tracking-normal": {}
    },
    ".typography-heading-4": {
      "@apply font-poppins text-3xl font-normal leading-[1.235] tracking-[.00735em]": {}
    },
    ".typography-heading-5": {
      "@apply font-poppins text-2xl font-normal leading-[1.334] tracking-normal": {}
    },
    ".typography-heading-6": {
      "@apply font-poppins text-xl font-normal font-medium leading-[1.6] tracking-[.0075em]": {}
    },
    ".typography-subtitle-1": {
      "@apply font-poppins text-md leading-7 tracking-[.00938em]": {}
    },
    ".typography-subtitle-2": {
      "@apply font-poppins text-sm font-medium leading-[1.57] tracking-[.00714em]": {}
    },
    ".typography-body-1": {
      "@apply font-poppins text-md font-normal leading-normal tracking-[.00938em]": {}
    },
    ".typography-body-2": {
      "@apply font-poppins text-sm font-normal leading-[1.43] tracking-[.01071em]": {}
    },
    ".typography-button": {
      "@apply font-poppins text-sm font-medium leading-5 tracking-[.02857em]": {}
    },
    ".typography-caption": {
      "@apply font-poppins text-xs font-normal leading-[1.66] tracking-[.03333em]": {}
    },
    ".typography-overline": {
      "@apply font-poppins text-xs font-normal uppercase leading-[2.66] tracking-[.08333em]": {}
    },
    ".typography-code": {
      "@apply font-code text-md font-bold leading-5 tracking-wide": {}
    }
  });
});
