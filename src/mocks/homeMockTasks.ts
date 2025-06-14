import { TASK_POINT_TIERS, ESTIMATED_TIME } from '@/constants/homeTaskConstants';

export const taskData = [
  {
    id: 'task-001',
    title: 'Wipe down counters',
    status: 'pending',
    completed: false,
    type: 'Daily Task',
    category: 'Environmental Cleaning',
    priority: 'medium',
    dueDate: '06/14/2025',
    points: 50,
    assignedTo: 'Sarah',
    estimatedTime: ESTIMATED_TIME.LONG,
  },
  {
    id: 'task-002',
    title: 'Sterilize instruments',
    status: 'pending',
    completed: false,
    type: 'Required Task',
    category: 'Sterilization',
    priority: 'high',
    dueDate: '06/14/2025',
    points: TASK_POINT_TIERS.HIGH,
    assignedTo: 'James',
  },
  {
    id: 'task-003',
    title: 'Restock gloves',
    status: 'completed',
    completed: true,
    type: 'Daily Task',
    category: 'Inventory',
    priority: 'medium',
    dueDate: '06/15/2025',
    points: 30,
    assignedTo: 'Liam',
  },
  {
    id: 'task-004',
    title: 'Check inventory levels',
    status: 'pending',
    completed: false,
    type: 'Weekly Task',
    category: 'Inventory',
    priority: 'high',
    dueDate: '06/16/2025',
    points: 60,
    assignedTo: 'Emma',
  },
  {
    id: 'task-005',
    title: 'Update patient records',
    status: 'pending',
    completed: false,
    type: 'Daily Task',
    category: 'Administrative',
    priority: 'medium',
    dueDate: '06/14/2025',
    points: 45,
    assignedTo: 'Michael',
  },
  {
    id: 'task-006',
    title: 'Schedule follow-ups',
    status: 'pending',
    completed: false,
    type: 'Daily Task',
    category: 'Administrative',
    priority: 'low',
    dueDate: '06/14/2025',
    points: 35,
    assignedTo: 'Olivia',
  },
];
