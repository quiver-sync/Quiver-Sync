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

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // Simulated badge logic
  const hasMessages = true; // Replace with real message state
  const hasNotifications = true; // Replace with real notification state

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
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #00b4d8, #0077b6)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Typography
            component={Link}
            to="/"
            variant="h5"
            sx={{
              fontFamily: `'Pacifico', cursive`,
              color: "#fff",
              textDecoration: "none",
              letterSpacing: 1,
              mr: 4,
            }}
          >
            SurfSync
          </Typography>

          {/* Center: Nav Links */}
          {user && (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Link
                to="/"
                className="text-white text-sm font-medium hover:text-sky-200 transition"
              >
                Home
              </Link>
              <Link
                to="/myboards"
                className="text-white text-sm font-medium hover:text-sky-200 transition"
              >
                My Boards
              </Link>
              <Link
                to="/forecast"
                className="text-white text-sm font-medium hover:text-sky-200 transition"
              >
                Forecast
              </Link>
            </Box>
          )}

          {/* Right: Profile / Auth */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", fontWeight: 500, mr: 2 }}
                >
                  Hey, {user.username} 👋
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <Badge
                    variant="dot"
                    color="error"
                    overlap="circular"
                    invisible={!hasMessages && !hasNotifications}
                  >
                    <AccountCircle />
                  </Badge>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/my-boards")}>
                    My Boards
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/messages")}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MailIcon fontSize="small" />
                      Messages
                      {hasMessages && (
                        <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/notifications")}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <NotificationsIcon fontSize="small" />
                      Notifications
                      {hasNotifications && (
                        <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </Box>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-white text-sm font-medium hover:text-sky-200 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-white text-sm font-medium hover:text-sky-200 transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMoreAnchorEl}
                open={Boolean(mobileMoreAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {user ? (
                  <>
                    <MenuItem onClick={() => navigate("/profile")}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/my-boards")}>
                      My Boards
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/messages")}>
                      Messages
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/notifications")}>
                      Notifications
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => navigate("/signin")}>
                      Sign In
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/register")}>
                      Sign Up
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
