import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/taskSlice';
import type { RootState } from '../store';
import type { FilterType } from '../types/Task';

const FilterBar: React.FC = React.memo(() => {
  const filter = useSelector((state: RootState) => state.task.filter);
  const dispatch = useDispatch();

  const filters: FilterType[] = ['All', 'Completed', 'Pending'];

  return (
    <div className="flex gap-2 justify-center mb-4">
      {filters.map(f => (
        <button
          key={f}
          className={`px-4 py-1 rounded ${filter === f ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
          onClick={() => dispatch(setFilter(f))}
        >
          {f}
        </button>
      ))}
    </div>
  );
});

export default FilterBar;
