import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../styles/confirmorder.css'

const apiUrl = import.meta.env.VITE_API_URL;
const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedComponents } = location.state;

  const handleConfirmOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
      const { totalPrice, ...selectedComponents } = location.state.selectedComponents; // Destructure the data
  
      const orderData = {
        cpu: selectedComponents.cpu ? selectedComponents.cpu.name : '',
        motherboard: selectedComponents.motherboard ? selectedComponents.motherboard.name : '',
        ram: selectedComponents.ram ? selectedComponents.ram.name : '',
        gpu: selectedComponents.gpu ? selectedComponents.gpu.name : '',
        cooler: selectedComponents.cooler ? selectedComponents.cooler.name : '',
        ssd: selectedComponents.ssd ? selectedComponents.ssd.name : '',
        cabinet: selectedComponents.cab ? selectedComponents.cab.name : '',
        smps: selectedComponents.smps ? selectedComponents.smps.name : '',
        price: totalPrice? totalPrice:'',
        ordered_by: {
          username: user.username,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        order_status: 'pending', // Set the order status to 'pending'
      };
  
      const response = await axios.post(`${apiUrl}/api/pc`, orderData);
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
        <div>
          {Object.entries(selectedComponents).map(([key, component]) => (
            key !== 'total' && component && (
              <div className='sel'key={key}>
                <img src={component.image} alt={component.name} />
                <p id='name'>{component.name} </p> <p id='price'>- ${component.price}</p>
              </div>
            )
          ))}
          <div><p>Total Price: ${selectedComponents.total}</p></div>
        </div>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmOrder;
