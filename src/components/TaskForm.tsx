import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

const TaskForm: React.FC = React.memo(() => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (title && dueDate) {
      dispatch(addTask({ title, description, dueDate }));
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [title, description, dueDate, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 dark:bg-white/10 p-6 rounded-xl shadow-lg mb-6 border border-white/10"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full mb-3 px-4 py-2 rounded-md bg-white/10 dark:bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mb-3 px-4 py-2 rounded-md bg-white/10 dark:bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 rounded-md bg-white/10 dark:bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
});

export default TaskForm;
