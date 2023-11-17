import React from 'react';

function PrescriptionSubmit({ onAddEvent }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      title: event.target.title.value,
      startRecur: event.target.startRecur.value,
      endRecur: event.target.endRecur.value,
      startTime: event.target.startTime.value,
      dosage: event.target.dosage.value,
    };
    await onAddEvent(newEvent);
  };

  return (
    <div>
      <h1>Add a New Medication</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Medication Name" required />
        <input type="date" name="startRecur" placeholder="Start Date" required />
        <input type="date" name="endRecur" placeholder="End Date" required />
        <input type="time" name="startTime" placeholder="Time" required />
        <input type="number" name="dosage" placeholder="Dosage" required />
        <button type="submit">Add Medication</button>
      </form>
    </div>
  );
}

export default PrescriptionSubmit;
