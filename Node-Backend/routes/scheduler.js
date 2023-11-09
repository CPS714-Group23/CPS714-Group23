const express = require('express');
const router = express.Router();

// mock database storage
let events = [];

async function insertEventToDatabase(eventData) {
  const newEvent = { id: eventData.title, ...eventData };
  events.push(newEvent);
  return newEvent;
}

async function removeEventFromDatabase(eventId) {
  events = events.filter(event => event.id !== eventId);
  return { id: eventId };
}

async function updateEventInDatabase(eventId, updatedEventData) {
  events = events.map(event => {
    if (event.id === eventId) {
      return { ...event, ...updatedEventData };
    }
    return event;
  });
  return { id: eventId, ...updatedEventData };
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

router.delete('/remove/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const removedEvent = await removeEventFromDatabase(eventId);
  
      res.json({ message: "Event removed successfully", event: removedEvent });
    } catch (error) {
      console.error('Error removing event:', error);
      res.status(500).json({ message: "Error removing event", error: error.message });
    }
  });
  
  router.put('/update/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const eventData = req.body;
      const updatedEvent = await updateEventInDatabase(eventId, eventData);
  
      res.json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: "Error updating event", error: error.message });
    }
  });
  
module.exports = router;
