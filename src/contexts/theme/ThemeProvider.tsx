import { ThemeContext } from "./theme.context";
import React from "react";
import { ThemeType } from "./theme.types";

function getInitialTheme(): ThemeType {
  if (typeof window !== "undefined" && window.localStorage) {
    const storageTheme = window.localStorage.getItem("theme");

    if (
      storageTheme === "dark" ||
      (!storageTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    }
  }

  return "light";
}

export interface ThemeProviderProps {
  defaultTheme?: ThemeType;
  children?: React.ReactNode;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeType>(
    defaultTheme ? defaultTheme : getInitialTheme
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
    rawSetTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
