import React, { useState } from 'react';
import Modal from '../modals/modal';
import '../../styles/card.css';
import CPUs from '../../data/cpu.json';

export const Card = ({ onSelectComponent }) => {
  const [selectedCPU, setSelectedCPU] = useState(null);

  const handleCPUSelect = (cpu) => {
    setSelectedCPU(cpu);
    onSelectComponent('cpu', {
      ...cpu,
      price: parseInt(cpu.price.replace('$', ''), 10),
    });
  };

  return (
    <div className="container">
      <h2>CPU</h2>
      <div className='select'>
        {selectedCPU ? (
          <img src={selectedCPU.image} alt={selectedCPU.name} />
        ) : (
          <div className="popup">
            <Modal handleCPUSelect={handleCPUSelect} CPUs={CPUs} />
          </div>
        )}
        <div className='detail'>
          {selectedCPU ? (
            <>
              <p>
                Selected: {selectedCPU.name}<br /><br />
                <b>Price: {selectedCPU.price}</b>
              </p>
              <div className="popup">
                <Modal handleCPUSelect={handleCPUSelect} CPUs={CPUs} isChangeButton={true} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
