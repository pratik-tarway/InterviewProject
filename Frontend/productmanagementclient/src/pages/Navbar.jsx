import React from "react";
import {
  SvgIcon,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const CustomShopIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" width="24" height="24">
      <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 18c0 1.1.9 2 1.99 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm0 2h12v14H6V4zm3 7h6v2H9v-2z" />
    </SvgIcon>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to sign-in page after logging out
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
          onClick={() => navigate("/home")}
        >
          <CustomShopIcon sx={{ color: "#1976d2" }} />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#1976d2" }}>
          The Shop
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          <LogoutIcon sx={{ color: "#1976d2" }} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
