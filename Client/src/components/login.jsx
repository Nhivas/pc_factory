// LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import '../styles/login.css'


const apiUrl = process.env.REACT_APP_API_URL;
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = '/home';
        } catch (error) {
            setError('Invalid username or password');
        }
    };
    return (
        <>
        <div className="logForm">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign in</button>
            
            {error && <p>{error}</p>}
            {/* Link to signup page */}
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
        </div>
        </>
    );
};

export default LoginPage;
