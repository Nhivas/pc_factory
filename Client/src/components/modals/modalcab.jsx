import React, { useState } from "react";
import '../../styles/modal.css';

const ModalCab = ({ handleCABSelect, CABs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedCAB, setSelectedCAB] = useState(null); 

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedCAB(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredCABs = CABs.filter(cab =>
    cab.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCAB = (cab) => {
    setSelectedCAB(cab); 
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedCAB) {
      handleCABSelect(selectedCAB); 
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
              placeholder="Search Cabinet..."
              value={searchTerm}
              onChange={handleSearch}
            />

           
            <ul className="cpu">
              {filteredCABs.map(cab => (
                <li
                  key={cab.name}
                  onClick={() => handleSelectCAB(cab)}
                  className={selectedCAB?.name === cab.name ? 'selected' : ''}
                >
                  {cab.name}
                </li>
              ))}
            </ul>
           
            {selectedCAB && (
              
                <div className="details">
                  <img src={selectedCAB.image} alt={selectedCAB.name} />
                  <p>Selected: {selectedCAB.name}<br />Price: {selectedCAB.price}</p>
                </div>
              
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedCAB}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCab;