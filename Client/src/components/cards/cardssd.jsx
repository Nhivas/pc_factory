import React, { useState } from 'react';
import ModalSsd from '../modals/modalssd';
import Total from '../total'; // Import Total component
import '../../styles/card.css';
import SSDs from '../../data/ssd.json';

export const CardSsd = ({ onSelectComponent }) => {
  const [selectedSSD, setSelectedSSD] = useState(null);

  const handleSSDSelect = (ssd) => {
    setSelectedSSD(ssd);
    onSelectComponent('ssd', {
      ...ssd,
      price: parseInt(ssd.price.replace('$', ''), 10),
    });
  };
  

  return (
    <div className="container">
      <h2>SSD</h2>
      <div className='select'>
        {selectedSSD ? (
          <img src={selectedSSD.image} alt={selectedSSD.name} />
        ) : (
          <ModalSsd handleSSDSelect={handleSSDSelect} SSDs={SSDs} />
        )}
        <div className='detail'>
          {selectedSSD ? (
            <>
              <p>
                Selected: {selectedSSD.name}<br></br><br></br>
                Price: {selectedSSD.price}
              </p>
              <ModalSsd handleSSDSelect={handleSSDSelect} SSDs={SSDs} isChangeButton={true} />
            </>
          ) : null}
          
        </div>
      </div>
    </div>
  );
};
