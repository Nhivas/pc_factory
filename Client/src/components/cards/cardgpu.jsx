import React, { useState } from 'react';
import ModalGpu from '../modals/modalgpu';
import '../../styles/card.css';
import GPUs from '../../data/gpu.json';
import Total from '../total';

export const CardGpu = ({ onSelectComponent }) => {
  const [selectedGPU, setSelectedGPU] = useState(null);

  const handleGPUSelect = (gpu) => {
    setSelectedGPU(gpu);
    onSelectComponent('gpu', {
      ...gpu,
      price: parseInt(gpu.price.replace('$', ''), 10),
    });
  };

  return (
    <div className="container">
      <h2>GPU</h2>
      <div className='select'>
        {selectedGPU ? (
          <img src={selectedGPU.image} alt={selectedGPU.name} />
        ) : (
          <ModalGpu handleGPUSelect={handleGPUSelect} GPUs={GPUs} />
        )}
        <div className='detail'>
          {selectedGPU ? (<>
            <p>
              Selected: {selectedGPU.name}<br></br>
              <b>Price: {selectedGPU.price}</b>
            </p>
            <ModalGpu handleGPUSelect={handleGPUSelect} GPUs={GPUs} isChangeButton={true} />
             </> 
          
          ) : null}
          
        </div>
      </div>
    </div>
  );
}
