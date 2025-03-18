import React, { useState } from "react";
import '../../styles/modal.css';

const ModalSsd = ({ handleSSDSelect, SSDs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedSSD, setSelectedSSD] = useState(null); 

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedSSD(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredSSDs = SSDs.filter(ssd =>
    ssd.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSSD = (ssd) => {
    setSelectedSSD(ssd); 
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedSSD) {
      handleSSDSelect(selectedSSD); 
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
              placeholder="Search SSD..."
              value={searchTerm}
              onChange={handleSearch}
            />

           
            <ul className="cpu">
              {filteredSSDs.map(ssd => (
                <li
                  key={ssd.name}
                  onClick={() => handleSelectSSD(ssd)}
                  className={selectedSSD?.name === ssd.name ? 'selected' : ''}
                >
                  {ssd.name}
                </li>
              ))}
            </ul>

           
            {selectedSSD && (
              <div className="specs">
                
                <ul>
                <li>Type: {selectedSSD.specs.type}</li>
                <li>Read: {selectedSSD.specs.read_speed}</li>
                <li>Write: {selectedSSD.specs.write_speed}</li>
                </ul>
                <div className="details">
                  <img src={selectedSSD.image} alt={selectedSSD.name} />
                  <p>Selected: {selectedSSD.name}<br />Price: {selectedSSD.price}</p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedSSD}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSsd;