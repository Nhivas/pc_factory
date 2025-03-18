import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../styles/orderpc.css';
import Header from './Header';
import Footer from './Footer';

const OrderPC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pc } = location.state;

  const handleConfirmOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
      const orderData = {
        cpu: pc.cpu ? pc.cpu : '',
        motherboard: pc.motherboard ? pc.motherboard : '',
        ram: pc.ram ? pc.ram : '',
        gpu: pc.gpu ? pc.gpu : '',
        cooler: pc.cooler ? pc.cooler : '',
        ssd: pc.ssd ? pc.ssd : '',
        cabinet: pc.cabinet ? pc.cabinet : '',
        smps: pc.smps ? pc.smps : '',
        price: pc.price ? pc.price : '',
        ordered_by: {
          username: user.username,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        order_status: 'pending', // Set the order status to 'pending'
      };

      const response = await axios.post('http://localhost:5000/api/pc', orderData);
      console.log(response.data);
      navigate('/order-success');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='fully'>
        <h2 id='confirm'>Confirm Your Order</h2>
        <div className='orderpc-container'>
          <h1>{pc.name}</h1>
          <div className="orderpc-details">
            <p>CPU: {pc.cpu}</p>
            <p>Motherboard: {pc.motherboard}</p>
            <p>RAM: {pc.ram}</p>
            <p>SSD: {pc.ssd}</p>
            <p>GPU: {pc.gpu}</p>
            <p>Cooler: {pc.cooler}</p>
            <p>Cabinet: {pc.cabinet}</p>
            <p>SMPS: {pc.smps}</p>
            <p>Price: {pc.price}</p>
          </div>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPC;
