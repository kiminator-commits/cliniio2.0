import React, { useState } from 'react';
import { FaEdit, FaChevronRight } from 'react-icons/fa';
import { HomeTask } from '@/types/home';
import { TASK_STATUSES } from '@/constants/homeTaskConstants';

type TasksListProps = {
  tasks: HomeTask[];
  onTaskComplete?: (id: string) => void;
};

export default function TasksList({ tasks, onTaskComplete }: TasksListProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<HomeTask>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate pagination
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const toggleTask = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const handleEdit = (task: HomeTask) => {
    setEditingTask(task.id);
    setEditedTask(task);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setEditedTask({});
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setEditingTask(null);
    setEditedTask({});
  };

  return (
    <div className="space-y-4">
      {currentTasks.map(task => (
        <div key={task.id} className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-gray-400 hover:text-gray-600"
                aria-label={
                  expandedTasks.has(task.id) ? 'Collapse task details' : 'Expand task details'
                }
              >
                <FaChevronRight
                  className={`transform transition-transform ${expandedTasks.has(task.id) ? 'rotate-90' : ''}`}
                />
              </button>
              <div>
                <div className="font-semibold text-gray-800">{task.title}</div>
                <div className="text-sm text-gray-500">
                  {task.subtitle ||
                    `${task.category || 'General'} - ${task.type || 'Training'} - Due: ${task.dueDate || 'N/A'}`}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="text-violet-600 font-semibold">+{task.points} pts</span>
              <button
                onClick={() => onTaskComplete?.(task.id)}
                className="rounded-full border border-green-500 text-green-500 text-sm px-3 py-1 hover:bg-green-50"
                aria-label={`Complete task: ${task.title}`}
              >
                {TASK_STATUSES.COMPLETE}
              </button>
            </div>
          </div>
          {expandedTasks.has(task.id) && (
            <>
              <hr className="my-3" />
              <div className="text-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`category-${task.id}`}
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Category
                    </label>
                    {editingTask === task.id ? (
                      <input
                        id={`category-${task.id}`}
                        type="text"
                        value={editedTask.category || ''}
                        onChange={e => setEditedTask({ ...editedTask, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    ) : (
                      <div className="text-gray-700">{task.category || 'General'}</div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor={`type-${task.id}`}
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Type
                    </label>
                    {editingTask === task.id ? (
                      <input
                        id={`type-${task.id}`}
                        type="text"
                        value={editedTask.type || ''}
                        onChange={e => setEditedTask({ ...editedTask, type: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    ) : (
                      <div className="text-gray-700">{task.type || 'Training'}</div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor={`dueDate-${task.id}`}
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Due Date
                    </label>
                    {editingTask === task.id ? (
                      <input
                        id={`dueDate-${task.id}`}
                        type="date"
                        value={editedTask.dueDate || ''}
                        onChange={e => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    ) : (
                      <div className="text-gray-700">{task.dueDate || 'N/A'}</div>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`description-${task.id}`}
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Description
                  </label>
                  {editingTask === task.id ? (
                    <textarea
                      id={`description-${task.id}`}
                      value={editedTask.description || ''}
                      onChange={e => setEditedTask({ ...editedTask, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={4}
                      placeholder="Enter task description..."
                    />
                  ) : (
                    <div className="text-gray-700">
                      {task.description || 'No description provided'}
                    </div>
                  )}
                </div>
                {task.instructions && (
                  <div>
                    <label
                      htmlFor={`instructions-${task.id}`}
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Instructions
                    </label>
                    {editingTask === task.id ? (
                      <textarea
                        id={`instructions-${task.id}`}
                        value={editedTask.instructions || ''}
                        onChange={e =>
                          setEditedTask({ ...editedTask, instructions: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                      />
                    ) : (
                      <div className="text-gray-700">{task.instructions}</div>
                    )}
                  </div>
                )}
                {task.estimatedTime && (
                  <div>
                    <label
                      htmlFor={`estimatedTime-${task.id}`}
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Estimated Time
                    </label>
                    {editingTask === task.id ? (
                      <input
                        id={`estimatedTime-${task.id}`}
                        type="text"
                        value={editedTask.estimatedTime || ''}
                        onChange={e =>
                          setEditedTask({ ...editedTask, estimatedTime: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    ) : (
                      <div className="text-gray-700">{task.estimatedTime}</div>
                    )}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  {editingTask === task.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        aria-label="Save changes"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        aria-label="Cancel editing"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Edit task: ${task.title}`}
                    >
                      <FaEdit className="inline-block mr-1" />
                      Edit Task
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-2 text-sm">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            ←
          </button>
          <span className="text-gray-600">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
