import { Task } from '../types/task';

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare training materials for Environmental Cleaning Standards',
    completed: false,
    points: 61,
    type: 'Training Task',
    category: 'Policy Updates',
    dueDate: '10/16/2023',
  },
  {
    id: '2',
    title: 'Environmental Cleaning Standards: Update cleaning checklists and logs',
    completed: false,
    points: 93,
    type: 'Required Task',
    category: 'Policy Updates',
    dueDate: '10/21/2023',
  },
  {
    id: '3',
    title: 'Patient Privacy Guidelines: Update privacy notice signage',
    completed: false,
    points: 147,
    type: 'Required Task',
    category: 'Policy Updates',
    dueDate: '10/24/2023',
  },
];
