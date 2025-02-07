import * as React from "react";

import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

import { DocsContainer as BaseDocsContainer } from "@storybook/blocks";
import { addons } from "@storybook/preview-api";

import darkTheme from "../theme/dark";
import lightTheme from "../theme/light";

const channel = addons.getChannel();

export function DocsContainer(props: React.ComponentProps<typeof BaseDocsContainer>) {
  const [isDark, setDark] = React.useState();

  React.useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, [setDark]);

  return <BaseDocsContainer {...props} theme={isDark ? darkTheme : lightTheme} />;
}
