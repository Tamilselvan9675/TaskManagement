export type FilterType = 'All' | 'Completed' | 'Pending';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}
