'use client';

import { useState } from 'react';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  tags?: string[];
  completed: boolean;
  onStatusChange?: (id: string, newStatus: 'todo' | 'in-progress' | 'completed') => void;
  onCompleteToggle?: (id: string, completed: boolean) => void;
}

const TaskCard = ({
  id,
  title,
  description,
  status,
  priority,
  dueDate,
  tags = [],
  completed,
  onStatusChange,
  onCompleteToggle
}: TaskCardProps) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckboxChange = () => {
    const newCompletedState = !isChecked;
    setIsChecked(newCompletedState);
    if (onCompleteToggle) {
      onCompleteToggle(id, newCompletedState);
    }
    if (onStatusChange) {
      onStatusChange(id, newCompletedState ? 'completed' : 'todo');
    }
  };

  // Format due date if provided
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Priority badge styling
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Status badge styling
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`border rounded-lg p-4 shadow-sm transition-all duration-200 ${
      completed ? 'bg-gray-50 opacity-75' : 'bg-white hover:shadow-md'
    }`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-medium truncate ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {title}
            </h3>
            <div className="flex space-x-2 ml-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
                {status.replace('-', ' ')}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(priority)}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
            </div>
          </div>
          
          {description && (
            <p className={`mt-2 text-sm ${completed ? 'text-gray-500' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
          
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            {dueDate && (
              <div className="flex items-center text-sm text-gray-500">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Due: {formatDate(dueDate)}
              </div>
            )}
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;