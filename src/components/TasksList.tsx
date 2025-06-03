import React, { useState } from 'react';
import { mdiRefresh } from '@mdi/js';
import Icon from '@mdi/react';
import { Task } from '../types/task';
import ReactConfetti from 'react-confetti';

// Extend the Task interface with additional fields
interface ExtendedTask extends Task {
  instructions?: string;
  estimatedTime?: number;
}

interface TasksListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string, points: number) => void;
  onRefresh: () => void;
  showFilters: boolean;
  onFilter?: () => void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks = [],
  onTaskComplete,
  onRefresh,
  showFilters = false,
  onFilter,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<ExtendedTask>>({});
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) =>
    statusFilter === 'all' ? true : task.status === statusFilter
  );

  const tasksPerPage = 3;
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // Add window resize handler
  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add confetti timeout
  React.useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Stop confetti after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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

  const handleInputChange = (field: keyof ExtendedTask, value: string | number) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTaskComplete = (taskId: string, points: number) => {
    setShowConfetti(true);
    if (onTaskComplete) {
      onTaskComplete(taskId, points);
    }
  };

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div>
            <label htmlFor="status" className="block text-xs text-gray-500 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'completed')}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
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
          <div className="md:col-span-4">
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
                <div className="flex items-center justify-between">
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
                </div>
                <div className="text-xs text-gray-500 mt-1">
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
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => onFilter && onFilter()}
                          className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                        >
                          {task.type}
                        </button>
                        <button
                          onClick={() => onFilter && onFilter()}
                          className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                        >
                          {task.category}
                        </button>
                        <button
                          onClick={() => onFilter && onFilter()}
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            task.priority === 'urgent'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : task.priority === 'high'
                                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {task.priority}
                        </button>
                        <span className="text-sm font-medium whitespace-nowrap text-fuchsia-600">
                          +{task.points} pts
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                  <button
                    onClick={() => handleTaskComplete(task.id, task.points || 0)}
                    className="px-3 py-1 bg-white text-[#4ECDC4] border border-[#4ECDC4] hover:bg-[#4ECDC4] hover:bg-opacity-10 rounded-lg text-xs font-medium whitespace-nowrap"
                  >
                    Complete
                  </button>
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
