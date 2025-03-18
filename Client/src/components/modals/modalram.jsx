import React, { useState } from "react";
import '../../styles/modal.css';

const ModalRam = ({ handleRAMSelect, RAMs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedRAM, setSelectedRAM] = useState(null); 

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedRAM(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredRAMs = RAMs.filter(ram =>
    ram.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRAM = (ram) => {
    setSelectedRAM(ram); 
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedRAM) {
      handleRAMSelect(selectedRAM); 
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
              placeholder="Search RAM..."
              value={searchTerm}
              onChange={handleSearch}
            />

           
            <ul className="cpu">
              {filteredRAMs.map(ram => (
                <li
                  key={ram.name}
                  onClick={() => handleSelectRAM(ram)}
                  className={selectedRAM?.name === ram.name ? 'selected' : ''}
                >
                  {ram.name}
                </li>
              ))}
            </ul>

           
            {selectedRAM && (
              <div className="specs">
                
                <ul>
                    <li>DDR: {selectedRAM.ddr}</li>
                    <li>Capacity: {selectedRAM.capacity}</li>
                    <li>Speed: {selectedRAM.speed}</li>
                </ul>
                <div className="details">
                  <img src={selectedRAM.image} alt={selectedRAM.name} />
                  <p>Selected: {selectedRAM.name}<br />Price: {selectedRAM.price}</p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedRAM}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalRam;