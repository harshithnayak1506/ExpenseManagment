import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const [success, setSuccess] = useState(""); // State for success message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset errors before submitting
        setSuccess(""); // Reset success message

        // Simple client-side validation
        if (!name || !email || !password) {
            setError("All fields are required!");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3007/user/register", { name, email, password });

            if (response.status === 201) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
            } else {
                setError(response.data.message || "Registration failed.");
            }
        } catch (err) {
            setError("User already exists or something went wrong.");
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>} {/* Show error message */}
                {success && <p className="success-message">{success}</p>} {/* Show success message */}

                <div>
                    <label htmlFor="name">
                        <strong>Full Name</strong>
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter full name" 
                        autoComplete="off" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter email" 
                        autoComplete="off" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter password" 
                        autoComplete="off" 
                        minLength="8"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Signup;
