import React, { useState } from 'react';
import ModalCooler from '../modals/modalcooler';
import '../../styles/card.css';
import COOLERs from '../../data/cooler.json';
import Total from '../total';

export const CardCooler = ({ onSelectComponent }) => {
  const [selectedCOOLER, setSelectedCOOLER] = useState(null);

const handleCOOLERSelect = (cooler) => {
    setSelectedCOOLER(cooler);
    onSelectComponent('cooler', {
      ...cooler,
      price: parseInt(cooler.price.replace('$', ''), 10),
    });
  };
  return (
    <div className="container">
      <h2>COOLER</h2>
      <div className='select'>
        {selectedCOOLER ? (
          <img src={selectedCOOLER.image} alt={selectedCOOLER.name} />
        ) : (
          <ModalCooler handleCOOLERSelect={handleCOOLERSelect} COOLERs={COOLERs} />
        )}
        <div className='detail'>
          {selectedCOOLER ? (<>
            <p>
              Selected: {selectedCOOLER.name}<br></br>
              <b>Price: {selectedCOOLER.price}</b>
            </p>
            <ModalCooler handleCOOLERSelect={handleCOOLERSelect} COOLERs={COOLERs} isChangeButton={true} />
             </> 
        
          ) : null}
          
        </div>
      </div>
    </div>
  );
}
