import React, { useState } from 'react';
import ModalMb from '../modals/modalmb';
import '../../styles/card.css';
import MBs from '../../data/motherboard.json';

export const CardMb = ({ onSelectComponent }) => {
  const [selectedMB, setSelectedMB] = useState(null);

  const handleMBSelect = (mb) => {
    setSelectedMB(mb);
    onSelectComponent('motherboard', {
      ...mb,
      price: parseInt(mb.price.replace('$', ''), 10),
    });
  };

  return (
    <div className="container">
      <h2>Motherboard</h2>
      <div className='select'>
        {selectedMB ? (
          <img src={selectedMB.image} alt={selectedMB.name} />
        ) : (
          <ModalMb handleMBSelect={handleMBSelect} MBs={MBs} />
        )}
        <div className='detail'>
          {selectedMB ? (
            <>
              <p>
                Selected: {selectedMB.name}<br></br>
                Price: {selectedMB.price}
              </p>
              <ModalMb handleMBSelect={handleMBSelect} MBs={MBs} isChangeButton={true} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
