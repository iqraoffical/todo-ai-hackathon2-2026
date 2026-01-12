import { getJwtToken } from './auth-client';

// Base API URL - can be configured via environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Define types for our API responses
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string; // ISO date string
  tags?: string[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user_id: string;
}

// Define the API client with JWT token handling
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Generic request method that includes JWT token
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await getJwtToken();

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all tasks for the authenticated user with optional filters
  async getTasks(filters?: {
    search?: string;
    status?: 'all' | 'pending' | 'completed';
    priority?: 'high' | 'medium' | 'low';
    sort_by?: 'created' | 'due_date' | 'priority' | 'title';
    order?: 'asc' | 'desc';
  }): Promise<Task[]> {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';

    return this.request<Task[]>(endpoint);
  }

  // Create a new task
  async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  // Update an existing task
  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    await this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Toggle task completion status
  async toggleComplete(id: string): Promise<Task> {
    // First get the current task to determine its status
    const currentTask = await this.getTaskById(id);

    // Determine the new status
    const newStatus = currentTask.status === 'completed' ? 'todo' : 'completed';

    // Update the task with the new status
    return this.updateTask(id, { status: newStatus });
  }

  // Get a specific task by ID
  async getTaskById(id: string): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`);
  }
}

// Create and export a singleton instance of the API client
export const apiClient = new ApiClient();

// Export the typed methods for direct use
export const { getTasks, createTask, updateTask, deleteTask, toggleComplete, getTaskById } = apiClient;