import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3007/register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        <strong>Username</strong>
                    </label>
                    <input type="text" name="username" placeholder="Enter username" required
                        autoComplete="off" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="email" name="email" placeholder="Enter email" required
                        autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" name="password" placeholder="Enter password" required
                        autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Signup;