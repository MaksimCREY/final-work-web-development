// Task.js

import React, { useState } from 'react';

const Task = ({ task, toggleTask }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggle = () => {
    toggleTask(task.id);
    setIsCompleted(prevState => !prevState); // Изменяем состояние isCompleted
  };

  return (
    <div>
      <input type="checkbox" checked={isCompleted} onChange={handleToggle} />
      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{task.title}</span>
    </div>
  );
};

export default Task;