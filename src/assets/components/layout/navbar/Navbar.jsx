// Navbar.jsx (split setup start)
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { MoreVert as MoreIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import axios from "../../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { Waves } from "lucide-react";

import NavUserMenu from "./NavUserMenu";
import NavMobileMenu from "./NavMobileMenu";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [hasRentals, setHasRentals] = useState(false);

  useEffect(() => {
    const checkUserRentals = async () => {
      if (!user) return;

      try {
        const res = await axios.get("/boards/getMyRentedBoards");
        if (Array.isArray(res.data)) {
          const hasActiveRentals = res.data.some((entry) => entry.rental);
          setHasRentals(hasActiveRentals);
        } else {
          console.warn(
            "Unexpected response from /boards/getMyRentedBoards",
            res.data
          );
          setHasRentals(false);
        }
      } catch (err) {
        console.error("❌ Failed to check user rentals:", err.message);
        setHasRentals(false); // fallback to no rentals
      }
    };

    checkUserRentals();
  }, [user]);

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
    setMobileAnchorEl(null);
  };

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
          <div className="flex items-center gap-2 min-w-[140px]">
            <Waves className="text-sky-300" size={28} />
            <Link
              to="/"
              className="text-2xl text-white font-bold hover:text-sky-200"
            >
              QuiverSync
            </Link>
          </div>

          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-white text-sm font-medium hover:text-sky-200"
              >
                Home
              </Link>
              <Link
                to="/myboards"
                className="text-white text-sm font-medium hover:text-sky-200"
              >
                My Boards
              </Link>
              <Link
                to="/match"
                className="text-white text-sm font-medium hover:text-sky-200"
              >
                Match Boards
              </Link>
              <Link
                to="/forecast"
                className="text-white text-sm font-medium hover:text-sky-200"
              >
                Forecast
              </Link>
              <Link
                to="/explore-rentals"
                className="hover:underline text-white"
              >
                Explore Rentals
              </Link>

              {hasRentals && (
                <Link
                  to="/myrentals"
                  className="text-white text-sm font-medium hover:text-sky-200"
                >
                  My Rentals
                </Link>
              )}
            </div>
          )}

          {user ? (
            <Box className="flex items-center gap-2 px-1 sm:px-2">
              <NavUserMenu
                user={user}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleLogout={handleLogout}
              />

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  onClick={(e) => setMobileAnchorEl(e.currentTarget)}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
                <NavMobileMenu
                  user={user}
                  anchorEl={mobileAnchorEl}
                  onClose={handleMenuClose}
                  onLogout={handleLogout}
                />
              </Box>
            </Box>
          ) : (
            <Box className="flex items-center gap-2 px-1 sm:px-2">
              <Link
                to="/signin"
                className="text-white text-sm font-medium hover:text-sky-200"
              >
                sign in
              </Link>
              <Link
                to="/register"
                className="text-white text-sm font-medium hover:text-sky-200"
              >
                sign up
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
