import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3007/login", { email, password })
            .then(result => {
                if (result.data === "Successful Login") {
                    localStorage.setItem("isLoggedIn", "true");
                    setIsLoggedIn(true); // Update state dynamically
                    navigate("/");
                } else {
                    alert("Invalid credentials!");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-container">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="email" placeholder="Enter email"
                        autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Enter password"
                        autoComplete="off" 
                        minLength="8"
                        maxLength="12"
                        onChange={(e) => setPassword(e.target.value)} />
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
