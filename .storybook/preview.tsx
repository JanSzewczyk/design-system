import * as React from "react";

import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { definePreview } from "@storybook/react-vite";
import { DARK_MODE_EVENT_NAME } from "@storybook-community/storybook-dark-mode";

import dark from "./theme/dark";
import light from "./theme/light";

import "../src/tailwind/global.css";

export function DarkModeDocsContainer(props: DocsContainerProps) {
  const [isDark, setDark] = React.useState(true);

  React.useEffect(() => {
    props.context.channel.on(DARK_MODE_EVENT_NAME, setDark);

    return () => props.context.channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, [props.context.channel]);
  return <DocsContainer {...props} theme={isDark ? dark : light} />;
}

export default definePreview({
  parameters: {
    darkMode: {
      dark,
      light,
      current: "dark",
      classTarget: "html",
      stylePreview: true
    },
    options: {
      storySort: {
        order: ["Getting Started", ["Introduction"], "Components"]
      }
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      controls: {
        sort: "requiredFirst"
      },
      container: DarkModeDocsContainer
    }
  },
  decorators: [],
  addons: [addonA11y(), addonDocs()]
});
