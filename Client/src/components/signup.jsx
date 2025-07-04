// SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/signup.css'


const apiUrl = import.meta.env.VITE_API_URL;
const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] =useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/signup`, { username, password ,email, name, phone, address });
            console.log(response.data.message);
            // Display success message and clear form
            setSuccess(true);
            setUsername('');
            setPassword('');
            setEmail('');
            setName('');
            setPhone('');
            setAddress('');
        } catch (error) {
            setError('Failed to sign up. Please try again.');
        }
    };

    return (
        <>
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" name="name" placeholder="Name"value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" name="phone" placeholder="Phone number"value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <textarea name="address" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} required></textarea>
            <button type="submit">Signup</button>
            {error && <p className="error">{error}</p>}
            {success && (
                <p className="success">
                    Sign up successful. You can now <Link to="/">login</Link>.
                </p>
            )}
            </form>
        </div>
        </>
    );
};
export default SignupPage;
