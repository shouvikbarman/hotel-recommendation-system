import { Theme } from "@mui/system";

const SvgIcon = (theme: Theme) => {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeMedium: {
          fontSize: theme.spacing(3.5),
        },
      },
    },
  };
};

export default SvgIcon;
