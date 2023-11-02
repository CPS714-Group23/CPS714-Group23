import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
import "./scheduler.css";

function Scheduler() {
  // Sample events data
  const events = [
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
  ];

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
    </div>
  );
}

export default Scheduler;
