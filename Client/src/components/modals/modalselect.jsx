import React, { useState } from "react";
import '../../styles/modal.css';


const Modal = ({ handleCPUSelect, CPUs, isChangeButton }) => {
  const [modal, setModal] = useState(false);


  
  const toggleModal = () => {
    setModal(!modal);
  };

  

  return (
    <>
      

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            Please select atleast one component.<br></br>
             <button onClick={toggleModal} className="btn-modal">
             <p>OK</p>
             </button>
          </div>
        </div>
        
      )}
    </>
  );
}

export default Modal;
