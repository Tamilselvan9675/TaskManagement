import React, { useEffect, lazy, Suspense } from 'react';
import { fetchQuote } from './store/taskSlice';
import { useAppDispatch } from './store/hooks'; 

const TaskList = lazy(() => import('./components/TaskList'));
const TaskForm = lazy(() => import('./components/TaskForm'));
const FilterBar = lazy(() => import('./components/FilterBar'));
const Quote = lazy(() => import('./components/Quote'));
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
  dispatch(fetchQuote());
}, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <div className="max-w-4xl mx-auto">
        <ThemeToggle />
        <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>
        <Suspense fallback={<div className='mt-10 mb-10 text-center'>Loading...</div>}>
          <Quote />
          <TaskForm />
          <FilterBar />
          <TaskList />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
