import React, { useState } from "react";
import '../../styles/modal.css';

const ModalSmps = ({ handleSMPSSelect, SMPSs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedSMPS, setSelectedSMPS] = useState(null); // Selected SMPS

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedSMPS(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  // Filter SMPSs based on search term
  const filteredSMPSs = SMPSs.filter(smps =>
    smps.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle SMPS selection
  const handleSelectSMPS = (smps) => {
    setSelectedSMPS(smps); // Set the selected SMPS
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedSMPS) {
      handleSMPSSelect(selectedSMPS); // Pass selected SMPS to parent
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
              placeholder="Search Motherboard..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {/* List of CPUs */}
            <ul className="cpu">
              {filteredSMPSs.map(smps => (
                <li
                  key={smps.name}
                  onClick={() => handleSelectSMPS(smps)}
                  className={selectedSMPS?.name === smps.name ? 'selected' : ''}
                >
                  {smps.name}
                </li>
              ))}
            </ul>

            {/* Display selected SMPS details */}
            {selectedSMPS && (
              <div className="specs">
                
                <ul>
                <li>{selectedSMPS.specs.wattage}</li>
                <li>{selectedSMPS.specs.certification}</li>
                <li>{selectedSMPS.specs.modularity}</li>
                <li>{selectedSMPS.specs.fan_mode}</li>
                </ul>
                <div className="details">
                  <img src={selectedSMPS.image} alt={selectedSMPS.name} />
                  <p>Selected: {selectedSMPS.name}<br />Price: {selectedSMPS.price}</p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedSMPS}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSmps;