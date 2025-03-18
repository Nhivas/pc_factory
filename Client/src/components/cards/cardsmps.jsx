import React, { useState } from 'react';
import ModalSmps from '../modals/modalsmps';
import '../../styles/card.css';
import SMPSs from '../../data/smps.json';
import Total from '../total';

export const CardSmps = ({ onSelectComponent }) => {
  const [selectedSMPS, setSelectedSMPS] = useState(null);

  const handleSMPSSelect = (smps) => {
    setSelectedSMPS(smps);
    onSelectComponent('smps', {
      ...smps,
      price: parseInt(smps.price.replace('$', ''), 10),
    });
  };

  return (
    <div className="container">
      <h2>SMPS</h2>
      <div className='select'>
        {selectedSMPS ? (
          <img src={selectedSMPS.image} alt={selectedSMPS.name} />
        ) : (
          <ModalSmps handleSMPSSelect={handleSMPSSelect} SMPSs={SMPSs} />
        )}
        <div className='detail'>
          {selectedSMPS ? (<>
            <p>
              Selected: {selectedSMPS.name}<br></br><br></br>
              Price: {selectedSMPS.price}
            </p>
            <ModalSmps handleSMPSSelect={handleSMPSSelect} SMPSs={SMPSs} isChangeButton={true} />
             </> 
        
          ) : null}
         
        </div>
      </div>
    </div>
  );
}
