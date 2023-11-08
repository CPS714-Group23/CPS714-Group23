import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
import "./scheduler.css";

function Scheduler() {
  // Sample events data
  const [events, setEvents] = useState([
    {
      title: "Dr. A",
      start: new Date("2023-11-15T15:00:00"),
      end: new Date("2023-11-15T15:30:00"),
      extendedProps: {
        type: "Appointments",
        location: "10 Fairway Drive, Toronto",
      },
    },
    {
      title: "Medication A",
      start: new Date("2023-11-16T10:00:00"),
      extendedProps: {
        type: "Medications",
      },
    },
    {
      title: "Medication A",
      start: new Date("2023-11-17T10:00:00"),
      extendedProps: {
        type: "Medications",
      },
    },
    {
      title: "Medication B",
      start: new Date("2023-11-17T10:00:00"),
      extendedProps: {
        type: "Medications",
      },
    },
  ]);

  const addEvent = async (newEvent) => {
    try {
      const response = await fetch('/api/scheduler/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
      
      if (response.ok) {
        const addedEvent = await response.json();
        // Add the new event to the current state
        setEvents(currentEvents => [...currentEvents, addedEvent.event]);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  function renderEventContent(eventInfo) {
    // Check if the event is of type "Appointments"
    if (eventInfo.event.extendedProps.type === "Appointments") {
      let startTime = new Date(eventInfo.event.start).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
      let endTime = new Date(eventInfo.event.end).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
      
      return (
        <>
          <div>
            <b>
              {startTime} - {endTime}: Appointment w/ {eventInfo.event.title}
            </b>
          </div>
          <div>@ {eventInfo.event.extendedProps.location}</div>
        </>
      );
    } 
    // Check if the event is of type "Medications"
    else if (eventInfo.event.extendedProps.type === "Medications") {
      let time = new Date(eventInfo.event.start).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
      
      return (
        <>
          <div>
            <b>{time}: Medication</b>
          </div>
          <div>{eventInfo.event.title}</div>
        </>
      );
    }
  }
      
  // function handleDateClick(info) {
  //   console.log("Date selected:", info.dateStr);
  // }

  function handleFormSubmit(event) {
    event.preventDefault();
    // Get form data and create an event object
    const newEvent = {
      title: event.target.title.value,
      start: new Date(event.target.start.value),
      end: new Date(event.target.end.value),
      extendedProps: {
        type: event.target.type.value,
        location: event.target.location.value,
      },
    };
    // Call the addEvent function with the new event object
    addEvent(newEvent);
  }
  

  return (
    <div>
      <h1><b>Scheduler</b></h1>
      <FullCalendar
        plugins={[dayGridPlugin]} //, interactionPlugin]}
        // dateClick={handleDateClick}
        selectable={false} // Set to true to have green bottom border
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent} // Render custom event content
      />

      {/* Test event function */}
      <form onSubmit={handleFormSubmit}>
      <input type="text" name="title" placeholder="Event Title" required />
      <input type="datetime-local" name="start" placeholder="Start Time" required />
      <input type="datetime-local" name="end" placeholder="End Time" required />
      <input type="text" name="type" placeholder="Event Type" required />
      <input type="text" name="location" placeholder="Location" required />
      <button type="submit">Add Event</button>
    </form>

    </div>
  );
}

export default Scheduler;
