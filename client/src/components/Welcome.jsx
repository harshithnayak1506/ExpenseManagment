import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
    return (
        <div className="welcome-container">
            <h2>Welcome to Expense Manager</h2>
            <p>Please Login, if you haven't registered please register.</p>
            <div className="buttons">
                <Link to="/login" className="btn login-btn">Login</Link>
                <Link to="/register" className="btn register-btn">Register</Link>
            </div>
        </div>
    );
}

export default Welcome;
