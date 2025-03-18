import React, { useState } from "react";
import '../../styles/modal.css';

const Modal = ({ handleCOOLERSelect, COOLERs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedCOOLER, setSelectedCOOLER] = useState(null); 

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedCOOLER(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredCOOLERs = COOLERs.filter(cooler =>
    cooler.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCOOLER = (cooler) => {
    setSelectedCOOLER(cooler); 
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedCOOLER) {
      handleCOOLERSelect(selectedCOOLER); 
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
              placeholder="Search COOLER..."
              value={searchTerm}
              onChange={handleSearch}
            />

           
            <ul className="cpu">
              {filteredCOOLERs.map(cooler => (
                <li
                  key={cooler.name}
                  onClick={() => handleSelectCOOLER(cooler)}
                  className={selectedCOOLER?.name === cooler.name ? 'selected' : ''}
                >
                  {cooler.name}
                </li>
              ))}
            </ul>

           
            {selectedCOOLER && (
              <div className="specs">
                
                <ul>
                  <li>Heatpipes:{selectedCOOLER.specs.heatpipes}</li>
                  <li>Fans:{selectedCOOLER.specs.fans}</li>
                  <li>System:{selectedCOOLER.specs.system}</li>
                </ul>
                <div className="details">
                  <img src={selectedCOOLER.image} alt={selectedCOOLER.name} />
                  <p>Selected: {selectedCOOLER.name}<br />Price: {selectedCOOLER.price}</p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedCOOLER}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;