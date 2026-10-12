import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { definePreview } from "@storybook/react-vite";
import { DARK_MODE_EVENT_NAME } from "@storybook-community/storybook-dark-mode";
import * as React from "react";

import { Toaster } from "../src/components";
import "../src/tailwind/global.css";

import dark from "./theme/dark";
import light from "./theme/light";

export function DarkModeDocsContainer(props: DocsContainerProps) {
  const [isDark, setDark] = React.useState(true);

  React.useEffect(() => {
    props.context.channel.on(DARK_MODE_EVENT_NAME, setDark);

    return () => props.context.channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, [props.context.channel]);
  return <DocsContainer {...props} theme={isDark ? dark : light} />;
}

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    )
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    darkMode: {
      classTarget: "html",
      current: "dark",
      dark,
      light,
      stylePreview: true
    },
    docs: {
      container: DarkModeDocsContainer,
      controls: {
        sort: "requiredFirst"
      }
    },
    options: {
      storySort: {
        order: ["Getting Started", ["Introduction"], "Components"]
      }
    }
  },
  tags: ["autodocs"]
});
