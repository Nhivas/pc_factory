import React, { useState } from "react";
import '../../styles/modal.css';

const ModalGpu = ({ handleGPUSelect, GPUs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedGPU, setSelectedGPU] = useState(null); 

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedGPU(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredGPUs = GPUs.filter(gpu =>
    gpu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectGPU = (gpu) => {
    setSelectedGPU(gpu); 
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedGPU) {
      handleGPUSelect(selectedGPU); 
      toggleModal(); // Close the modal
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button onClick={toggleModal} className={`btn-modal ${isChangeButton ? 'small' : ''}`}>
        <p>{isChangeButton ? 'Change..' : '+'}</p>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search GPU..."
              value={searchTerm}
              onChange={handleSearch}
            />

           
            <ul className="cpu">
              {filteredGPUs.map(gpu => (
                <li
                  key={gpu.name}
                  onClick={() => handleSelectGPU(gpu)}
                  className={selectedGPU?.name === gpu.name ? 'selected' : ''}
                >
                  {gpu.name}
                </li>
              ))}
            </ul>

           
            {selectedGPU && (
              <div className="specs">
                
                <ul>
                  <li>VRAM: {selectedGPU.specs.VRAM}</li>
                  <li>Memory Bus: {selectedGPU.specs.Memory_Bus}</li>
                </ul>
                <div className="details">
                  <img src={selectedGPU.image} alt={selectedGPU.name} />
                  <p>Selected: {selectedGPU.name}<br />Price: {selectedGPU.price}</p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedGPU}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalGpu;