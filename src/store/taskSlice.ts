import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, FilterType } from '../types/Task';
import { saveToStorage, loadFromStorage } from '../utils/localStorage';

interface TaskState {
  tasks: Task[];
  filter: FilterType;
  quote: string | null;
}

const initialState: TaskState = {
  tasks: loadFromStorage(),
  filter: 'All',
  quote: null,
};


export const fetchQuote = createAsyncThunk('task/fetchQuote', async () => {
  const res = await fetch('https://api.quotable.io/random');
  const data = await res.json();
  return data.content;
});

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.tasks.push(action.payload);
        saveToStorage(state.tasks);
      },
      prepare({ title, description, dueDate }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            dueDate,
            completed: false,
          } as Task,
        };
      },
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveToStorage(state.tasks);
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToStorage(state.tasks);
      }
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveToStorage(state.tasks);
      }
    },
    reorderTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      saveToStorage(state.tasks);
    },
    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchQuote.fulfilled, (state, action) => {
      state.quote = action.payload;
    });
  }
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  reorderTasks,
  setFilter
} = taskSlice.actions;

export default taskSlice.reducer;
