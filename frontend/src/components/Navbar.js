import React, { useState } from "react";
import Logo from "../assets/homePhotos/img2.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <nav className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="Logo" />
      </div>
      <div className={`rightSide ${openLinks ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/leasingcalculator">Leasing Calculator</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <button className="menuButton" onClick={toggleNavbar}>
        <ReorderIcon />
      </button>
    </nav>
  );
}

export default Navbar;
