import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Error state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset errors before submitting

        try {
            const response = await axios.post("http://localhost:3007/user/login", { email, password });

            if (response.data.token) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", response.data.token); // Store JWT token
                localStorage.setItem("userId", response.data.userId); // Store userId for expenses
                setIsLoggedIn(true);
                navigate("/"); // Redirect to home
            } else {
                setError(response.data.message || "Invalid credentials!");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>} {/* Display error if any */}
                <div>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Enter email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter password"
                        autoComplete="off" 
                        minLength="8"
                        maxLength="12"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
