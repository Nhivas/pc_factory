// src/components/OrderSuccess.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/ordersuccess.css'

const OrderSuccess = () => {
  return (
    <>
      <Header />
      <div className='content'>
        <h2>Order Successful!</h2>
        <p>Your PC build order has been successfully placed.</p>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
