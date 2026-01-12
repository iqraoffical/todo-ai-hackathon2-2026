'use client';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import TaskCard from './TaskCard';
import { apiClient } from '@/lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  tags?: string[];
  completed: boolean;
  createdAt: string;
}

export interface TaskListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface TaskListRef {
  refetch: () => void;
}

const TaskList = forwardRef<TaskListRef, TaskListProps>(({ searchParams }, ref) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract filters from URL params
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const status = typeof searchParams.status === 'string' ? searchParams.status : '';
  const priority = typeof searchParams.priority === 'string' ? searchParams.priority : '';
  const sortBy = typeof searchParams.sort_by === 'string' ? searchParams.sort_by : 'createdAt';
  const order = typeof searchParams.order === 'string' ? searchParams.order : 'desc';

  // Expose refetch function to parent component
  useImperativeHandle(ref, () => ({
    refetch
  }));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        // Prepare filters object
        const filters: Record<string, string> = {};
        if (search) filters.search = search;
        if (status) filters.status = status;
        if (priority) filters.priority = priority;
        if (sortBy) filters.sortBy = sortBy;
        if (order) filters.order = order;

        // Fetch tasks from API
        const response = await apiClient.get('/tasks', { params: filters });
        setTasks(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [search, status, priority, sortBy, order]);

  const handleStatusChange = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      // Optimistically update the UI
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: newStatus, completed: newStatus === 'completed' } 
            : task
        )
      );

      // Update the task on the backend
      await apiClient.patch(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      console.error('Error updating task status:', err);
      // Revert the optimistic update if the API call fails
      const originalTask = tasks.find(task => task.id === taskId);
      if (originalTask) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId ? originalTask : task
          )
        );
      }
    }
  };

  const handleCompleteToggle = async (taskId: string, completed: boolean) => {
    try {
      // Find the task to determine its current status
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      // Determine the new status based on completion state
      const newStatus = completed ? 'completed' : 'todo';

      // Optimistically update the UI
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId 
            ? { ...t, completed, status: newStatus } 
            : t
        )
      );

      // Update the task on the backend
      await apiClient.patch(`/tasks/${taskId}`, { 
        status: newStatus,
        completed
      });
    } catch (err) {
      console.error('Error updating task completion:', err);
      // Revert the optimistic update if the API call fails
      const originalTask = tasks.find(task => task.id === taskId);
      if (originalTask) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId ? originalTask : task
          )
        );
      }
    }
  // Expose refetch function via imperative handle or similar mechanism
  // For now, we'll just return the refetch function as part of the component
  const refetch = async () => {
    try {
      setLoading(true);

      // Prepare filters object
      const filters: Record<string, string> = {};
      if (search) filters.search = search;
      if (status) filters.status = status;
      if (priority) filters.priority = priority;
      if (sortBy) filters.sortBy = sortBy;
      if (order) filters.order = order;

      // Fetch tasks from API
      const response = await apiClient.get('/tasks', { params: filters });
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again later.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          priority={task.priority}
          dueDate={task.dueDate}
          tags={task.tags}
          completed={task.completed}
          onStatusChange={handleStatusChange}
          onCompleteToggle={handleCompleteToggle}
        />
      ))}
    </div>
  );
});

export { TaskList, type TaskListProps, type TaskListRef };