import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { logo, shopping } from "../assets";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Fade, IconButton, Menu, MenuItem } from "@mui/material";
// import { signOutUser } from "../redux/user/userSlice";
import { X } from "@phosphor-icons/react";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false); // Added state for sidebar
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleSidebar = () => {
    const body = document.body;

    setShowSidebar(!showSidebar);

    // Toggle body overflow based on the sidebar visibility
    if (!showSidebar) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  };

  return (
    <div>
      <p>Nav bar</p>
    </div>
  );
}

export default Nav;
