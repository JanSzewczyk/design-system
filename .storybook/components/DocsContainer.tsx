import * as React from "react";

import { DocsContainer as BaseContainer } from "@storybook/blocks";
import { useDarkMode } from "storybook-dark-mode";

import darkTheme from "../theme/dark";
import lightTheme from "../theme/light";

export const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const dark = useDarkMode();

  // React.useEffect(() => {
  //   if (dark) {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }
  // }, [dark]);

  return (
    <BaseContainer context={context} theme={dark ? darkTheme : lightTheme}>
      {children}
    </BaseContainer>
  );
};
