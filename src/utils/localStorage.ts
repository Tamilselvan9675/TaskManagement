import type { Task } from '../types/Task';

const TASK_KEY = 'task_data';

export const saveToStorage = (tasks: Task[]) => {
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};

export const loadFromStorage = (): Task[] => {
  const data = localStorage.getItem(TASK_KEY);
  return data ? JSON.parse(data) : [];
};
