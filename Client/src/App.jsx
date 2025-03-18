import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import BuildPC from './components/BuildPc';
import Home from './components/home'
import Contact from './components/Contact';
import ConfirmOrder from './components/confirmOrder';
import OrderSuccess from './components/OrderSuccess.jsx';
import Prebuilt from './components/prebuilt.jsx';
import OrderPC from './components/orderPC.jsx';

const App = () => {
  const handleLogin = (formData) => {
    // Implement login API call here
    console.log('Logging in with:', formData);
    // Redirect to BuildPC page upon successful login (you can modify this logic as needed)
    // For now, always redirect to BuildPC
    // <Redirect to="/buildpc" />
  };

  const handleSignup = (formData) => {
    // Implement signup API call here
    console.log('Signing up with:', formData);
    // Redirect to BuildPC page upon successful signup
    // <Redirect to="/buildpc" />
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/buildpc" element={<BuildPC />} />
          <Route path="/prebuilt" element={<Prebuilt />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-pc" element={<OrderPC />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
