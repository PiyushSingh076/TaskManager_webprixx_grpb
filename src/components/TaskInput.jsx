import React, { useState } from 'react';
import './TaskInput.css';

function TaskInput({ addTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      const subparts = newTaskDescription
        .split('\n')
        .map((subpart) => ({ text: subpart.trim(), completed: false }));
      const newTaskObj = {
        id: Date.now(),
        title: newTaskTitle,
        subparts,
        priority,
        status: 'pending',
        dueDate,
        completionPercentage: 0,
      };
      addTask(newTaskObj);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setDueDate('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="input-task"
        placeholder="Task Title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <textarea
        className="input-description"
        placeholder="Task Description (Separate subparts with new lines)"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      ></textarea>
      <select
        className="select-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        className="input-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="add-task-btn" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
