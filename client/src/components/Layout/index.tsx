import { Outlet } from "react-router-dom";
import { Box, Grid, SxProps, Theme } from "@mui/material";
import TopBar from "../TopBar";
import { User } from "../../models/user";

interface LayoutProps {
  sx?: SxProps<Theme>;
  isAuthenticated: boolean;
  user: User | null;
  onSignOut: () => void;
}

const Layout = ({ sx, isAuthenticated, user, onSignOut }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fffff7",
        ...(sx ? sx : {}),
      }}
    >
      <TopBar
        isAuthenticated={isAuthenticated}
        user={user}
        onSignOut={onSignOut}
      />
      <Grid margin={5} display={"flex"} height={"100%"}>
        <Outlet />
      </Grid>
    </Box>
  );
};

export { Layout };
