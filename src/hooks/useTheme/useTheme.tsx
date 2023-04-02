import React from "react";

import { ThemeContext } from "../../contexts";
import { ThemeContextType } from "../../contexts";

export const useTheme = (): ThemeContextType => React.useContext(ThemeContext);
