import { Menu, MenuItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavMobileMenu({ user, anchorEl, onClose, onLogout }) {
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {user ? (
        <>
          <MenuItem onClick={() => navigate("/profile")}>My Profile</MenuItem>
          <MenuItem onClick={() => navigate("/myboards")}>My Boards</MenuItem>
          <MenuItem onClick={() => navigate("/forecast")}>Forecast</MenuItem>
          <MenuItem onClick={() => navigate("/match")}>Match a Board</MenuItem>
          <Divider />
          <MenuItem onClick={onLogout}>Sign Out</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => navigate("/signin")}>Sign In</MenuItem>
          <MenuItem onClick={() => navigate("/register")}>Sign Up</MenuItem>
        </>
      )}
    </Menu>
  );
}
