import { Theme } from "@mui/system";

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: theme.spacing(1.75),
          borderRadius: theme.spacing(1.25),
          textTransform: "capitalize" as const,
          // fontSize: 17,
          // fontWeight: 700,
          // padding: theme.spacing(0.5, 3),
        },
        // outlinedPrimary: {
        //   padding: theme.spacing(0.5, 2),
        //   backgroundColor: theme.palette.primary.light,
        // },
        // containedPrimary: {
        //   color: "#ffffff",
        //   "&:hover": {
        //     backgroundColor: theme.palette.primary.light,
        //   },
        //   "&:active": {
        //     backgroundColor: theme.palette.primary.dark,
        //   },
        // },
        // disabled: {
        //   color: theme.palette.primary.light,
        // },
      },
    },
  };
};

export default Button;
