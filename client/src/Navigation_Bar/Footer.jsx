import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Expense Manager. All rights reserved.</p>
      <p>Track. Save. Grow.</p>
    </footer>
  );
};

export default Footer;
