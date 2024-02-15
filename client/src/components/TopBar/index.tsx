// TopBar.tsx
import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";

interface TopBarProps {
  isAuthenticated: boolean;
  user: User | null;
  onSignOut: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  isAuthenticated,
  user,
  onSignOut,
}) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ width: "100vw", height: "8%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Hotel-RC
          </Typography>
        </Box>
        {isAuthenticated ? (
          <>
            <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
              Welcome, {user?.username}
            </Typography>
            <Button color="inherit" onClick={onSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/signin")}>
            Sign In / Sign Up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
