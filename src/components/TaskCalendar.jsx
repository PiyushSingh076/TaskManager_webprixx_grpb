
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TaskCalendar({ tasks, onDateClick }) {
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
      />
    </div>
  );
}

export default TaskCalendar;
