import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/"); // Redirect to Welcome page
    };

    return (
        <nav className="navbar">
            <h1 className="expman">EXPMAN</h1>
            <div className="all-buttons">
                <button className="home-button" onClick={() => navigate('/')}>Home</button>
                {!isLoggedIn ? (
                    <button className="login-button" onClick={() => navigate('/login')}>Login</button>
                ) : (
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
