import React, { useState } from 'react';
import { mdiRefresh } from '@mdi/js';
import Icon from '@mdi/react';
import { Task } from '../types/task';

interface TasksListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string, points: number) => void;
  onRefresh?: () => void;
  showFilters?: boolean;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks = [],
  onTaskComplete,
  onRefresh,
  showFilters = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const tasksPerPage = 3;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleEdit = (taskId: string) => {
    const taskToEdit = tasks.find((t) => t.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditedTask(taskToEdit);
      if (!expandedTasks.has(taskId)) {
        setExpandedTasks((prev) => new Set([...prev, taskId]));
      }
    }
  };

  const handleSave = (taskId: string) => {
    // Here you would typically call an API to save the changes
    console.log('Saving task:', taskId, editedTask);
    setEditingTaskId(null);
    setEditedTask({});
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedTask({});
  };

  const handleInputChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          <div>
            <label htmlFor="status" className="block text-xs text-gray-500 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-xs text-gray-500 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-xs text-gray-500 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="Policy Updates">Policy Updates</option>
              <option value="Environmental Cleaning">Environmental Cleaning</option>
              <option value="Sterilization">Sterilization</option>
              <option value="Environmental">Environmental</option>
              <option value="Inventory">Inventory</option>
            </select>
          </div>
          <div>
            <label htmlFor="taskType" className="block text-xs text-gray-500 mb-1">
              Task Type
            </label>
            <select
              id="taskType"
              name="taskType"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
            >
              <option value="all">All Types</option>
              <option value="Training">Training</option>
              <option value="Required">Required</option>
              <option value="Daily">Daily</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div>
            <label htmlFor="search" className="block text-xs text-gray-500 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                name="search"
                placeholder="Search tasks..."
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md pl-8"
              />
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                style={{ width: '1.2rem', height: '1.2rem' }}
              >
                <path
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  style={{ fill: 'currentcolor' }}
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {currentTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mr-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      role="presentation"
                      style={{
                        width: '1.2rem',
                        height: '1.2rem',
                        transform: expandedTasks.has(task.id) ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <path
                        d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                        style={{ fill: 'currentcolor' }}
                      />
                    </svg>
                  </button>
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTask.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-sm font-medium text-gray-700 border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <h3 className="text-sm font-medium text-gray-700">{task.title}</h3>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {editingTaskId === task.id ? (
                    <div className="flex gap-2">
                      <select
                        value={editedTask.type || ''}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Training">Training</option>
                        <option value="Required">Required</option>
                        <option value="Daily">Daily</option>
                        <option value="Custom">Custom</option>
                      </select>
                      <select
                        value={editedTask.category || ''}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Policy Updates">Policy Updates</option>
                        <option value="Environmental Cleaning">Environmental Cleaning</option>
                        <option value="Sterilization">Sterilization</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Inventory">Inventory</option>
                      </select>
                      <input
                        type="date"
                        value={editedTask.dueDate || ''}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  ) : (
                    <>
                      {task.type} - {task.category}
                      <span className="ml-2 text-xs">Due: {task.dueDate}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium whitespace-nowrap text-fuchsia-600">
                  +{task.points} pts
                </span>
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => handleSave(task.id)}
                      className="px-3 py-1 bg-[#4ECDC4] text-white border border-[#4ECDC4] hover:bg-opacity-90 rounded-lg text-xs font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        role="presentation"
                        style={{ width: '1.2rem', height: '1.2rem' }}
                      >
                        <path
                          d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                          style={{ fill: 'currentcolor' }}
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onTaskComplete && onTaskComplete(task.id, task.points || 0)}
                      className="px-3 py-1 bg-white text-[#4ECDC4] border border-[#4ECDC4] hover:bg-[#4ECDC4] hover:bg-opacity-10 rounded-lg text-xs font-medium whitespace-nowrap"
                    >
                      Complete
                    </button>
                  </>
                )}
              </div>
            </div>
            {expandedTasks.has(task.id) && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3">
                  <h4 className="font-medium mb-1">Instructions:</h4>
                  {editingTaskId === task.id ? (
                    <textarea
                      value={editedTask.instructions || ''}
                      onChange={(e) => handleInputChange('instructions', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      rows={3}
                    />
                  ) : (
                    <p>
                      Create training materials to support the implementation of Environmental
                      Cleaning Standards (v2.0). This is a major policy change requiring staff
                      education.
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Estimated Time:</span>
                  {editingTaskId === task.id ? (
                    <input
                      type="number"
                      value={editedTask.estimatedTime || 120}
                      onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                      className="ml-2 border border-gray-300 rounded px-2 py-1 w-20"
                    />
                  ) : (
                    ' 120 minutes'
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <button
          onClick={onRefresh}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:underline flex items-center"
        >
          <Icon path={mdiRefresh} size={0.8} className="mr-1" />
          Refresh tasks
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, tasks.length)} of {tasks.length} tasks
          </div>

          <nav
            className="inline-flex -space-x-px rounded-md shadow-sm isolate"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 border-[#4ECDC4] bg-[#4ECDC4] bg-opacity-10 text-[#4ECDC4]'
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TasksList;
