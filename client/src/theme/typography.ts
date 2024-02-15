import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

const typography = {
  h6: {
    fontWeight: 600,
    fontSize: defaultTheme.spacing(2.25),
  },
};

export default typography;
