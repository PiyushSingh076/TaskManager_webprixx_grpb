// src/components/TaskCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TaskCalendar({ tasks, onDateClick, onTaskClick }) {
  const events = tasks.map((task) => ({
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
    taskId: task.id,
  }));

  const handleDateClick = (date) => {
    const dateString = moment(date).format('YYYY-MM-DD');
    onDateClick(dateString);
  };

  const handleEventClick = (event) => {
    onTaskClick(event.taskId); // Call onTaskClick with taskId to display the task card
  };

  return (
    <div style={{ height: '500px', margin: '20px 0' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleDateClick}
        selectable
        onSelectEvent={handleEventClick} // Handle click on task
      />
    </div>
  );
}

export default TaskCalendar;
