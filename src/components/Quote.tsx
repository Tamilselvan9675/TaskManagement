import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const Quote: React.FC = React.memo(() => {
  const quote = useSelector((state: RootState) => state.task.quote);
  

  return (
    <div className="bg-blue-100 dark:bg-blue-900 text-center p-3 rounded mb-4">
      <p className="italic text-gray-700 dark:text-gray-200">"{quote || 'Loading inspirational quote...'}"</p>
    </div>
  );
});

export default Quote;
