import React, { useEffect, useState } from 'react';

const Total = ({ selectedCPU, selectedCAB, selectedGPU, selectedCOOLER, selectedMB, selectedRAM, selectedSMPS, selectedSSD }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;

    if (selectedCPU) total += parseFloat(selectedCPU.price.replace('$', ''));
    if (selectedCAB) total += parseFloat(selectedCAB.price.replace('$', ''));
    if (selectedGPU) total += parseFloat(selectedGPU.price.replace('$', ''));
    if (selectedCOOLER) total += parseFloat(selectedCOOLER.price.replace('$', ''));
    if (selectedMB) total += parseFloat(selectedMB.price.replace('$', ''));
    if (selectedRAM) total += parseFloat(selectedRAM.price.replace('$', ''));
    if (selectedSMPS) total += parseFloat(selectedSMPS.price.replace('$', ''));
    if (selectedSSD) total += parseFloat(selectedSSD.price.replace('$', ''));

    setTotalPrice(total);
  }, [selectedCPU, selectedCAB, selectedGPU, selectedCOOLER, selectedMB, selectedRAM, selectedSMPS, selectedSSD]);

  return (
    <div className="total">
      <h2>Total Price</h2>
      <p>{totalPrice.toFixed(2)}</p>
      <button>Add Parts</button>
    </div>
  );
};

export default Total;
