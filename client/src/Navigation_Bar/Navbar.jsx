import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="expman" onClick={() => navigate("/")}>EXPMAN</h1>

      <div className="center-section">
        <button className="home-button" onClick={() => navigate('/')}>Home</button>
        {isLoggedIn && (
          <div className="profile-dropdown">
            <FaUserCircle size={30} className="profile-icon" onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {!isLoggedIn && (
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
}

export default Navbar;










