import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import axios from "../../../utils/axiosInstance";

export default function PrimarySearchAppBar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setAnchorElMessages(null);
    setAnchorElNotifications(null);
  };

  const menuId = "primary-account-menu";
  const mobileMenuId = "primary-mobile-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Boards</MenuItem>
      <Divider />
      <MenuItem onClick={() => {
        handleMenuClose();
        handleLogout();
      }}>
        Sign Out
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMenuClose}
    >
      {user ? (
        <>
          <MenuItem onClick={() => setAnchorElMessages(true)}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={2} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem onClick={() => setAnchorElNotifications(true)}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={(e) => setAnchorEl(e.currentTarget)}>
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={Link} to="/SignIn">Sign In</MenuItem>
          <MenuItem component={Link} to="/register">Sign Up</MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #0077b6, #00b4d8)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar>
          {/* Hamburger for Mobile */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontFamily: `'Pacifico', cursive`,
              color: "#fff",
              textDecoration: "none",
              letterSpacing: 1,
            }}
          >
            SurfSync
          </Typography>

          {/* Desktop Actions */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {user ? (
              <>
                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "500" }}>
                  Welcome, {user.username} 👋
                </Typography>
                <IconButton size="large" color="inherit" onClick={() => setAnchorElMessages(true)}>
                  <Badge badgeContent={2} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton size="large" color="inherit" onClick={() => setAnchorElNotifications(true)}>
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton size="large" edge="end" color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Link to="/SignIn" className="text-white hover:text-sky-300 font-medium text-sm">
                  Sign In
                </Link>
                <Link to="/register" className="text-white hover:text-sky-300 font-medium text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </Box>

          {/* Mobile More Button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
