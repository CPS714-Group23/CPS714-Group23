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

  const removeEvent = async (eventTitle) => {
    try {
      const response = await fetch(
        `/api/scheduler/remove/${encodeURIComponent(eventTitle)}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Event removed:", result);
        setEvents((currentEvents) =>
          currentEvents.filter((event) => event.title !== eventTitle)
        );
      } else {
        console.error("Failed to remove the event");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const updateEvent = async (eventTitle, updatedEventData) => {
    try {
      const response = await fetch(
        `/api/scheduler/update/${encodeURIComponent(eventTitle)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEventData),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Event updated:", result);
        setEvents((currentEvents) =>
          currentEvents.map((event) =>
            event.title === eventTitle
              ? { ...event, ...updatedEventData }
              : event
          )
        );
      } else {
        console.error("Failed to update the event");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  function renderEventContent(eventInfo) {
    if (eventInfo.event.extendedProps.type === "Appointments") {
      let startTime = new Date(eventInfo.event.start).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
        }
      );
      let endTime = new Date(eventInfo.event.end).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
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
    else if (eventInfo.event.extendedProps.type === "Medications") {
      let time = new Date(eventInfo.event.start).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
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

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      title: event.target.title.value,
      start: event.target.start.value,
      end: event.target.end.value,
      type: event.target.type.value,
      location: event.target.location.value,
    };

    await addEvent(newEvent);
  };

  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault();
    const eventTitle = event.target.title.value;
    const updatedEventData = {
      title: event.target.newTitle ? event.target.newTitle.value : eventTitle,
      start: event.target.start.value,
      end: event.target.end.value,
      type: event.target.type.value,
      location: event.target.location.value,
    };

    await updateEvent(eventTitle, updatedEventData);
  };

  const handleDeleteFormSubmit = async (event) => {
    event.preventDefault();
    const eventTitle = event.target.title.value;

    await removeEvent(eventTitle);
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.title !== eventTitle)
    );
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

      {/* Test event function */}
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="title" placeholder="Event Title" required />
        <input
          type="datetime-local"
          name="start"
          placeholder="Start Time"
          required
        />
        <input
          type="datetime-local"
          name="end"
          placeholder="End Time"
          required
        />
        <input type="text" name="type" placeholder="Event Type" required />
        <input type="text" name="location" placeholder="Location" required />
        <button type="submit">Add Event</button>
      </form>

      {/* Update Event Form */}
      <form onSubmit={handleUpdateFormSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Current Event Title"
          required
        />
        <input type="text" name="newTitle" placeholder="New Event Title" />
        <input type="datetime-local" name="start" placeholder="Start Time" />
        <input type="datetime-local" name="end" placeholder="End Time" />
        <input type="text" name="type" placeholder="Event Type" />
        <input type="text" name="location" placeholder="Location" />
        <button type="submit">Update Event</button>
      </form>

      {/* Delete Event Form */}
      <form onSubmit={handleDeleteFormSubmit}>
        <input type="text" name="title" placeholder="Event Title" required />
        <button type="submit">Delete Event</button>
      </form>
    </div>
  );
}

export default Scheduler;
