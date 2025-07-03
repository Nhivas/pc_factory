import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Card } from './cards/card';
import { CardRam } from './cards/cardram';
import { CardMb } from './cards/cardmb';
import { CardGpu } from './cards/cardgpu';
import { CardCooler } from './cards/cardcool';
import { CardSsd } from './cards/cardssd';
import { CardCab } from './cards/cardcab';
import { CardSmps } from './cards/cardsmps';
import '../styles/buildpc.css';

const BuildPC = () => {
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    cooler: null,
    ssd: null,
    cabinet: null,
    smps: null,
    total: 0,
  });

  const navigate = useNavigate();

  const handleSelectComponent = (componentName, value) => {
    setSelectedComponents(prevState => {
      const previousPrice = prevState[componentName]?.price || 0;
      const newTotal = prevState.total - previousPrice + value.price;
      return {
        ...prevState,
        [componentName]: value,
        total: newTotal,
      };
    });
  };

  const handleAddParts = () => {
    // Check if any components are selected
    const { cpu, motherboard, ram, gpu, cooler, ssd, cabinet, smps } = selectedComponents;
    if (!cpu && !motherboard && !ram && !gpu && !cooler && !ssd && !cabinet && !smps) {
      alert('Please select at least one component before proceeding.');
      return;
    }
    navigate('/confirm-order', { state: { selectedComponents } });
  };

  return (
    <div className="build-pc-container">
      <Header />
      <div className="cards">
        <Card onSelectComponent={handleSelectComponent} />
        <CardMb onSelectComponent={handleSelectComponent} />
        <CardRam onSelectComponent={handleSelectComponent} />
        <CardGpu onSelectComponent={handleSelectComponent} />
        <CardCooler onSelectComponent={handleSelectComponent} />
        <CardSsd onSelectComponent={handleSelectComponent} />
        <CardCab onSelectComponent={handleSelectComponent} />
        <CardSmps onSelectComponent={handleSelectComponent} />
      </div>
      <div className='total'>
        <div className="price">Total Price: ${selectedComponents.total}</div>
        <div className="addp"><button onClick={handleAddParts}>+ Add Parts</button></div>
      </div>
    </div>
  );
};

export default BuildPC;
