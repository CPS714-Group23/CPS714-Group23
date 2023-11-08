const express = require('express');
const router = express.Router();

async function insertEventToDatabase(eventData) {
  console.log('Inserting event into the database:', eventData);
  return { id: Date.now(), ...eventData }; // simulate an auto-generated ID
}

router.post('/add', async (req, res) => {
  try {
    const eventData = req.body;
    const addedEvent = await insertEventToDatabase(eventData);

    res.json({ message: "Event added successfully", event: addedEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: "Error adding event", error: error.message });
  }
});

// define the '/remove' and '/edit' routes

module.exports = router;
