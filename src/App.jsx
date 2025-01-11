// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskCalendar from './components/TaskCalendar';
import moment from 'moment';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State to toggle calendar visibility

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const updateTaskSubparts = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      if (filterStatus === 'all' && filterPriority === 'all') return true;
      if (filterStatus !== 'all' && filterPriority === 'all') return task.status === filterStatus;
      if (filterStatus === 'all' && filterPriority !== 'all') return task.priority === filterPriority;
      return task.status === filterStatus && task.priority === filterPriority;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTaskClick = (taskId) => {
    const taskElement = document.getElementById(taskId);
    taskElement && taskElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tasksDueOnSelectedDate = tasks.filter((task) => {
    if (!selectedDate) return false;
    return moment(task.dueDate).format('YYYY-MM-DD') === selectedDate;
  });

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible); // Toggle calendar visibility
  };

  return (
    <div className="container">
      <h1 className="app-title">Task Management App</h1>
      <TaskInput addTask={addTask} />
      <TaskFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
      />
      <button onClick={toggleCalendar} className="calendar-toggle-btn">
        {isCalendarVisible ? 'Hide Calendar' : 'Show Calendar'} {/* Toggle text */}
      </button>
      {isCalendarVisible && (
        <TaskCalendar tasks={tasks} onDateClick={handleDateClick} onTaskClick={handleTaskClick} />
      )}
      <TaskList
        tasks={getFilteredTasks()}
        deleteTask={deleteTask}
        updateTaskSubparts={updateTaskSubparts}
        onTaskClick={handleTaskClick}
      />
      {selectedDate && (
        <div>
          <h3>Tasks Due on {selectedDate}</h3>
          <TaskList
            tasks={tasksDueOnSelectedDate}
            deleteTask={deleteTask}
            updateTaskSubparts={updateTaskSubparts}
            onTaskClick={handleTaskClick}
          />
        </div>
      )}
    </div>
  );
}

export default App;
