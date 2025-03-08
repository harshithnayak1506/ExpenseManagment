import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
    return (
        <div className="welcome-container">
            <div className="left-content">
                <h1 className="animated-quote">
                    "Don't tell me what you value, show me your budget, and I'll tell you what you value."
                </h1>
                <p>Managing expenses is managing your life. Start tracking now!</p>
            </div>
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
