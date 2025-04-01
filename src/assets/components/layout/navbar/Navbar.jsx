import React, { useEffect, useState } from "react";
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
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { Waves } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import axios from "../../../../utils/axiosInstance";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const hasMessages = true;
  const hasNotifications = true;

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

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #00b4d8, #0077b6)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar className="flex flex-wrap w-full justify-between items-center px-2 md:px-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 min-w-[140px]">
            <Waves className="text-sky-600" size={28} />
            <Link
              to="/"
              className="text-2xl text-white font-bold hover:text-sky-200"
            >
              QuiverSync
            </Link>
          </div>

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
                to="/match"
                className="text-white text-sm font-medium hover:text-sky-200 transition"
              >
                Match Boards
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
          <Box className="flex items-center gap-2 px-1 sm:px-2">
            {user ? (
              <>
                <Typography
                  variant="body2"
                  className="hidden sm:inline text-white font-medium mr-2"
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
                    {user?.picture && user.picture !== "/broken-image.jpg" ? (
                      <img
                        src={user.picture}
                        alt="avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                    ) : (
                      <AccountCircle fontSize="large" />
                    )}
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
                    <MenuItem onClick={() => navigate("/myboards")}>
                      My Boards
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/forecast")}>
                      forecase
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/match")}>
                      match a board
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
