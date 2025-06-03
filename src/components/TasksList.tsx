import React, { useState } from 'react';
import { mdiChevronRight, mdiRefresh } from '@mdi/js';
import Icon from '@mdi/react';
import { Task } from '../types/task';

interface TasksListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string, points: number) => void;
  onRefresh?: () => void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks = [],
  onTaskComplete,
  onRefresh,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="space-y-3">
        {currentTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center">
                  <button className="mr-2 text-gray-500 hover:text-gray-700">
                    <Icon path={mdiChevronRight} size={0.8} />
                  </button>
                  <h3 className="text-sm font-medium text-gray-700">{task.title}</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {task.type} - {task.category}
                  <span className="ml-2 text-xs">Due: {task.dueDate}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium whitespace-nowrap text-fuchsia-600">
                  +{task.points} pts
                </span>
                <button
                  onClick={() => onTaskComplete && onTaskComplete(task.id, task.points || 0)}
                  className="px-3 py-1 bg-white text-[#4ECDC4] border border-[#4ECDC4] hover:bg-[#4ECDC4] hover:bg-opacity-10 rounded-lg text-xs font-medium whitespace-nowrap"
                >
                  Complete
                </button>
              </div>
            </div>
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
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
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
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TasksList; 