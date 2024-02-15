import { Theme } from "@mui/system";

const Chip = (theme: Theme) => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "25.5px",
        },
        colorPrimary: {
          backgroundColor: theme.palette.primary.light,
          "& .MuiChip-label": {
            fontWeight: 600,
            color: theme.palette.primary.main,
          },
          "& .MuiChip-deleteIcon": {
            marginRight: theme.spacing(1.5),
            color: theme.palette.primary.main,
          },
          "& .MuiChip-icon": {
            marginLeft: theme.spacing(1),
            color: theme.palette.primary.main,
          },
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        },
      },
    },
  };
};

export default Chip;
