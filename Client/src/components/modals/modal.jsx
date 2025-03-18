import React, { useState } from "react";
import '../../styles/modal.css';

const Modal = ({ handleCPUSelect, CPUs, isChangeButton }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [selectedCPU, setSelectedCPU] = useState(null); // Selected CPU

  // Open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset states when opening the modal
    if (!isOpen) {
      setSearchTerm('');
      setSelectedCPU(null);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  // Filter CPUs based on search term
  const filteredCPUs = CPUs.filter(cpu =>
    cpu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle CPU selection
  const handleSelectCPU = (cpu) => {
    setSelectedCPU(cpu); // Set the selected CPU
  };

  // Confirm selection and pass data to parent
  const handleConfirm = () => {
    if (selectedCPU) {
      handleCPUSelect(selectedCPU); // Pass selected CPU to parent
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
              placeholder="Search CPU..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {/* List of CPUs */}
            <ul className="cpu">
              {filteredCPUs.map(cpu => (
                <li
                  key={cpu.name}
                  onClick={() => handleSelectCPU(cpu)}
                  className={selectedCPU?.name === cpu.name ? 'selected' : ''}
                >
                  {cpu.name}
                </li>
              ))}
            </ul>

            {/* Display selected CPU details */}
            {selectedCPU && (
              <div className="specs">
                
                <ul>
                  <li>Socket: {selectedCPU.specs.socket}</li>
                  <li>Cores: {selectedCPU.specs.cores}</li>
                  <li>Threads: {selectedCPU.specs.threads}</li>
                  <li>Base Clock: {selectedCPU.specs.base_clock}</li>
                  <li>Boost Clock: {selectedCPU.specs.boost_clock}</li>
                  <li>Cache: {selectedCPU.specs.cache}</li>
                  <li>Voltage: {selectedCPU.specs.voltage}</li>
                  <li>TDP: {selectedCPU.specs.tdp}</li>
                </ul>
                <div className="details">
                  <img src={selectedCPU.image} alt={selectedCPU.name} />
                  <p>Selected: {selectedCPU.name}<br />Price: {selectedCPU.price}</p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              className="close-modal"
              onClick={handleConfirm}
              disabled={!selectedCPU}
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