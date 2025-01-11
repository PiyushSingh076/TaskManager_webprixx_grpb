import React from 'react';
import './TaskFilter.css';

function TaskFilter({ filterStatus, setFilterStatus, filterPriority, setFilterPriority }) {
  return (
    <div className="filter-container">
      <select className='filter-dropdown' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <select className='filter-dropdown' value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default TaskFilter;
