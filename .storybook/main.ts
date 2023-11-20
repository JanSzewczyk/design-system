import { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false // 👈 disable the backgrounds addon
      }
    },
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true
  },
  docs: {
    autodocs: true
  }
} satisfies StorybookConfig;
