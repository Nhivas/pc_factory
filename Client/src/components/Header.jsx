import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import '../styles/header.css';


const apiUrl = process.env.REACT_APP_API_URL;
const Header = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserDetails(user);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/api/logout`);
      localStorage.removeItem('user');
      setUserDetails(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/747/223/non_2x/pc-logo-monogram-with-slash-style-design-template-free-vector.jpg"
            alt="logo"
          />
        </div>
        <div className="menu">
          <Link to="/home">Home</Link>
          <Link to="/BuildPc">Build PC</Link>
          <Link to="/contact">Contact</Link>
          <a href="/prebuilt">Pre-Built</a>
        </div>
        <div className="btn">
          {userDetails ? (
            <div className="wel">
              <span>Welcome! {userDetails.name}</span>
              <button id='logout' onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button><Link to="/">Login</Link></button>
              <button><Link to="/signup">Signup</Link></button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
