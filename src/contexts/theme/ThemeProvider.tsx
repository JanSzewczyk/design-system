import React from "react";

import { ThemeContext } from "./theme.context";
import { ThemeType } from "./theme.types";

function getInitialTheme(defaultTheme?: ThemeType): ThemeType {
  if (typeof window !== "undefined" && window.localStorage) {
    const storageTheme = window.localStorage.getItem("theme");

    if (
      storageTheme === "dark" ||
      (!storageTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    }
  }

  return defaultTheme ?? "light";
}

export interface ThemeProviderProps {
  /**
   * Children Components using theming.
   */
  children?: React.ReactNode;
  /**
   * Define the default theme which is set at the beginning if neither local storage nor media is defined.
   */
  defaultTheme?: ThemeType;
  /**
   * Define theme that is always set initially.
   */
  theme?: ThemeType;
}

export function ThemeProvider({ children, defaultTheme, theme }: ThemeProviderProps) {
  const [themeState, setThemeState] = React.useState<ThemeType>(
    theme ? theme : getInitialTheme(defaultTheme)
  );

  function rawSetTheme(rawTheme: ThemeType): void {
    if (typeof window !== "undefined" && window.localStorage) {
      if (rawTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("theme", rawTheme);
    }
  }

  React.useEffect(() => {
    rawSetTheme(themeState);
  }, [themeState]);

  return (
    <ThemeContext.Provider value={{ theme: themeState, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}
