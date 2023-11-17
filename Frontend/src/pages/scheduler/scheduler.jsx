import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
import "./scheduler.css";

function Scheduler() {
  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      title: "Medication A",
      startRecur: '2023-11-20',
      endRecur: '2023-12-04',
      startTime: '9:00:00',
      dosage: "2"
    },
    {
      id: 'event-2',
      title: "Medication B",
      startRecur: '2023-11-27',
      endRecur: '2023-12-15',
      startTime: '9:00:00',
      dosage: "1"
    }
  ]);

  const addEvent = async (newEvent) => {
    try {
      const response = await fetch("/api/scheduler/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const addedEvent = await response.json();
        setEvents((currentEvents) => [...currentEvents, addedEvent.event]);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };


  function renderEventContent(eventInfo) {
    return (
      <>
        <div>
          <b>9:00am: {eventInfo.event.title}</b>
        </div>
        <div>Dosage: {eventInfo.event.extendedProps.dosage} pill(s)</div>
      </>
    );
  }
  

  // function handleDateClick(info) {
  //   console.log("Date selected:", info.dateStr);
  // }

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      id: `event-${events.length + 1}`, // Generating a new unique ID
      title: event.target.title.value,
      startRecur: event.target.startRecur.value,
      endRecur: event.target.endRecur.value,
      startTime: event.target.startTime.value,
      dosage: event.target.dosage.value,
    };
    await addEvent(newEvent);
  };
  
  
  return (
    <div>
      <h1>
        <b>Scheduler</b>
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin]} //, interactionPlugin]}
        // dateClick={handleDateClick}
        selectable={false} // Set to true to have green bottom border
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent} // Render custom event content
      />

      <form onSubmit={handleAddFormSubmit}>
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

export default Scheduler;
