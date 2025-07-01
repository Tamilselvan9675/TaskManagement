import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import TaskForm from '../components/TaskForm';

test('adds task on submit', () => {
  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: 'Test Task' },
  });

  fireEvent.change(screen.getByLabelText(/Due Date/i), {
    target: { value: '2025-12-31' },
  });

  fireEvent.click(screen.getByText(/Add Task/i));

  expect(screen.getByDisplayValue(/Test Task/i)).toBeInTheDocument();
});
