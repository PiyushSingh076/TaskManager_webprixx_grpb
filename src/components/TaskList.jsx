import React from 'react';
import './TaskList.css';

function TaskList({ tasks, deleteTask, updateTaskSubparts }) {
  const handleSubpartCompletion = (taskId, subpartIndex) => {
    tasks.forEach((task) => {
      if (task.id === taskId) {
        const updatedSubparts = task.subparts.map((subpart, index) =>
          index === subpartIndex ? { ...subpart, completed: !subpart.completed } : subpart
        );
        const completedSubparts = updatedSubparts.filter((s) => s.completed).length;
        const totalSubparts = updatedSubparts.length;
        const newCompletionPercentage = Math.round((completedSubparts / totalSubparts) * 100);
        const newStatus = completedSubparts === totalSubparts ? 'completed' : 'pending';

        updateTaskSubparts({
          ...task,
          subparts: updatedSubparts,
          completionPercentage: newCompletionPercentage,
          status: newStatus,
        });
      }
    });
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3 className="task-title">{task.title}</h3>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${task.completionPercentage}%` }}
            ></div>
          </div>
          <div className="task-detail">Priority: {task.priority}</div>
          <div className="task-detail">Status: {task.status}</div>
          <div className="task-detail">
            Due Date: {task.dueDate || 'N/A'}
          </div>
          <div className="task-detail">Completion: {task.completionPercentage}%</div>
          <div className="task-subparts">
            {task.subparts.map((subpart, index) => (
              <div key={index} className="subpart">
                <input
                  type="checkbox"
                  checked={subpart.completed}
                  onChange={() => handleSubpartCompletion(task.id, index)}
                />
                <span>{subpart.text}</span>
              </div>
            ))}
          </div>
          <button
            className="task-btn delete-btn"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
