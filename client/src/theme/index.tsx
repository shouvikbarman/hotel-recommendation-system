import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import zIndex from "./z-index";

interface Props {
  children: React.ReactNode;
}

const ThemeConfig = ({ children }: Props) => {
  const themeOptions = React.useMemo(
    () => ({
      palette,
      zIndex,
      typography,
    }),
    [],
  );

  const theme = createTheme(themeOptions as ThemeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { ThemeConfig };
