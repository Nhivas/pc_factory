import React, { useState } from "react";
import '../../styles/modal.css';

const ModalMb = ({ handleMBSelect, MBs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedMB, setSelectedMB] = useState(null); // Selected MB

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedMB(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  // Filter MBs based on search term
  const filteredMBs = MBs.filter(mb =>
    mb.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle MB selection
  const handleSelectMB = (mb) => {
    setSelectedMB(mb); // Set the selected MB
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedMB) {
      handleMBSelect(selectedMB); // Pass selected MB to parent
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
              {filteredMBs.map(mb => (
                <li
                  key={mb.name}
                  onClick={() => handleSelectMB(mb)}
                  className={selectedMB?.name === mb.name ? 'selected' : ''}
                >
                  {mb.name}
                </li>
              ))}
            </ul>

            {/* Display selected MB details */}
            {selectedMB && (
              <div className="specs">
                
                <ul>
                <li>CPU Compatibility: {selectedMB.specs.CPU_Compatibility}</li>
                    <li>RAM Slots: {selectedMB.specs.RAM_Slots}</li>
                    <li>RAM Capacity: {selectedMB.specs.Max_RAM_Capacity}</li>
                    <li>Form Factors: {selectedMB.specs.Form_Factor}</li>
                    <li>PCIe Slots: {selectedMB.specs.PCIe_Slots}</li>
                    <li>Storage: {selectedMB.specs.Storage}</li>
                    <li>Ethernet: {selectedMB.specs.Ethernet}</li>
                    <li>USB Ports: {selectedMB.specs.USB_Ports}</li>
                </ul>
                <div className="details">
                  <img src={selectedMB.image} alt={selectedMB.name} />
                  <p>Selected: {selectedMB.name}<br />Price: {selectedMB.price}</p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedMB}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalMb;