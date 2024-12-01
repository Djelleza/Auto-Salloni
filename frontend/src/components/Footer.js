import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        {/* Lista e linkeve */}
        <div className="links">
          <ul>
            <li>Home</li>
            <li>Veturat</li>
            <li>Kontakti</li>
          </ul>
        </div>
        {/* Informacioni i kontaktit */}
        <div className="contact-info">
          <h3>Na kontaktoni</h3>
          <p>Magjistralja Prishtinë - Ferizaj, Rr. Çagllavicë</p>
          <p>📞 +383 44 435 435</p>
          <p>📧 info@autosallonialberti.net</p>
        </div>
      </div>
      {/* Pjesa e rrjeteve sociale */}
      <div className="footer-content">
        <div className="socialMedia">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
        </div>
        <p> &copy; 2024 autocarluxury.com | All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
