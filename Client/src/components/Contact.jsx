import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/contact.css';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  const [query, setQuery] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserDetails(user);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetails) {
      setMessage('User details not found. Please log in.');
      return;
    }
    const { username, email } = userDetails;
    try {
      const response = await axios.post('http://localhost:5000/api/contact', {
        username,
        email,
        query
      });
      setMessage(response.data.message);
      setQuery('');
    } catch (error) {
      setMessage('Failed to submit query. Please try again.');
    }
  };

  return (
    <>
    <Header />
    <div className="contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>Query:</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Enter your query'
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default Contact;
