import React, { useState } from 'react';
import type { Task } from '../types/Task';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask, editTask } from '../store/taskSlice';

const TaskItem: React.FC<{ task: Task }> = React.memo(({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editTask(editedTask));
    setIsEditing(false);
  };

  return (
    <div
      className={`backdrop-blur-md bg-white/10 dark:bg-white/10 border border-white/10 rounded-xl shadow-md mb-4 p-4 transition-all duration-300 ${
        task.completed ? 'ring-2 ring-green-400' : ''
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-3">
          <input
            className="w-full p-2 rounded-md bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={editedTask.title}
            onChange={e => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            className="w-full p-2 rounded-md bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={editedTask.description}
            onChange={e => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <input
            type="date"
            className="w-full p-2 rounded-md bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={editedTask.dueDate}
            onChange={e => setEditedTask({ ...editedTask, dueDate: e.target.value })}
          />
          <div className="flex gap-4 pt-1">
            <button type="submit" className="text-blue-400 hover:text-blue-600 text-lg">💾 Save</button>
            <button onClick={() => setIsEditing(false)} type="button" className="text-gray-400 hover:text-gray-600 text-lg">✖ Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white">{task.title}</h3>
            {task.description && <p className="text-sm text-gray-300">{task.description}</p>}
            <small className="text-gray-400">Due: {task.dueDate}</small>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-0 text-2xl">
            <button
              onClick={() => dispatch(toggleTask(task.id))}
              title="Toggle Complete"
              className="text-green-400 hover:text-green-600 transition"
            >
              ✔
            </button>
            <button
              onClick={() => setIsEditing(true)}
              title="Edit Task"
              className="text-blue-400 hover:text-blue-600 transition"
            >
              ✏
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              title="Delete Task"
              className="text-red-400 hover:text-red-600 transition"
            >
              🗑
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskItem;
