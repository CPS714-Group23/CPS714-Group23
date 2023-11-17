import React from 'react';

function PrescriptionSubmit() {
  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      title: event.target.title.value,
      drugStrength: event.target.drugStrength.value,
      dosage: event.target.dosage.value,
      startRecur: '2023-12-01', // Hardcoded for December
      endRecur: '2023-12-31',   // Hardcoded for December
      receiptNumber: event.target.receiptNumber.value,
      dateIssued: event.target.dateIssued.value,
      doctorName: event.target.doctorName.value,
      hospitalName: event.target.hospitalName.value,
      hospitalAddress: event.target.hospitalAddress.value,
    };

    try {
      const response = await fetch('http://localhost:3001/api/scheduler/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      // Handle success here, e.g., show a success message, clear form, etc.
    } catch (error) {
      console.error('Error adding event:', error);
      // Handle error here, e.g., show an error message
    }
  };

  return (
    <div>
      <h1>Add Medication</h1>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="title" placeholder="Drug Name" required />
        <input type="text" name="drugStrength" placeholder="Drug Strength" required />
        <input type="number" name="dosage" placeholder="Dosage" required />
        <input type="number" name="receiptNumber" placeholder="Receipt Number" required />
        <input type="date" name="dateIssued" placeholder="Date Issued" required />
        <input type="text" name="doctorName" placeholder="Doctor's Name" required />
        <input type="text" name="hospitalName" placeholder="Hospital Name" required />
        <input type="text" name="hospitalAddress" placeholder="Hospital Address" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PrescriptionSubmit;
