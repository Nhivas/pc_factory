import React, { useState } from 'react';
import ModalCab from '../modals/modalcab';
import '../../styles/card.css';
import CABs from '../../data/cabinet.json';
import Total from '../total';

export const CardCab = ({ onSelectComponent }) => {
  const [selectedCAB, setSelectedCAB] = useState(null);

  const handleCABSelect = (cab) => {
    setSelectedCAB(cab);
    onSelectComponent('cab', {
      ...cab,
      price: parseInt(cab.price.replace('$', ''), 10),
    });
  };
  return (
    <div className="container">
      <h2>Cabinet</h2>
      <div className='select'>
        {selectedCAB ? (
          <img src={selectedCAB.image} alt={selectedCAB.name} />
        ) : (
            
          <ModalCab handleCABSelect={handleCABSelect} CABs={CABs} />
        )}
        <div className='detail'>
          {selectedCAB ? (<>
            <p>
              Selected: {selectedCAB.name}<br></br><br></br>
              <b>Price: {selectedCAB.price}</b>
            </p>
            <ModalCab handleCABSelect={handleCABSelect} CABs={CABs} isChangeButton={true} />
             </> 
        
          ) : null}
         
        </div>
      </div>
    </div>
  );
}
