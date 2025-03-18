import React from 'react';
import { useNavigate } from 'react-router-dom';
import pcsData from '../data/pcs.json';
import '../styles/prebuilt.css';
import Header from './Header';

const Prebuilt = () => {
  const navigate = useNavigate();

  const handleSelectPC = (pc) => {
    navigate('/order-pc', { state: { pc } });
  };

  return (
    <>
      <Header />
      <div className="prebuilt-container">
        <h1>Prebuilt PCs</h1>
        <div className="prebuilt-cards">
          {pcsData.map((pc, index) => (
            <div key={index} className="prebuilt-card">
              <img src={pc.image} alt={`${pc.name} image`} className="prebuilt-card-image" />
              <h2>{pc.name}</h2>
              <p>Purpose: {pc.purpose}</p>
              <p>Price: {pc.price}</p>
              <button onClick={() => handleSelectPC(pc)}>Order Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Prebuilt;
