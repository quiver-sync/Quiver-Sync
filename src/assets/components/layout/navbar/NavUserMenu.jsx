// NavUserMenu.jsx
import {
    AccountCircle,
  } from "@mui/icons-material";
  import {
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Typography,
    Box,
    Divider,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  
  export default function NavUserMenu({ user, anchorEl, setAnchorEl, handleLogout }) {
    const navigate = useNavigate();
  
    if (!user) return null;
  
    const handleClose = () => setAnchorEl(null);
  
    return (
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
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => navigate("/profile")}>My Profile</MenuItem>
          <MenuItem onClick={() => navigate("/myboards")}>My Boards</MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </>
    );
  }