'use client';

import { useState, useEffect } from 'react';
import apiClient from './api-client';

// Custom authentication functions to work with our backend API
export const signIn = async (provider: string, credentials: { email: string; password: string; redirectTo?: string }) => {
  try {
    const response = await apiClient.post('/api/auth/sign-in', {
      email: credentials.email,
      password: credentials.password,
    });

    // Store the token in localStorage or sessionStorage
    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);

      // Also store in a cookie for middleware compatibility
      document.cookie = `access_token=${response.data.access_token}; path=/;`;
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Sign in error:', error);

    let errorMessage = 'An unexpected error occurred';
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data.detail || error.response.data.message || 'Sign in failed';
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Network error: Unable to connect to server. Please check if the backend is running.';
    } else {
      // Something else happened
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }
};

export const signOut = async () => {
  try {
    // Clear the stored token
    localStorage.removeItem('auth_token');

    // Remove the cookie as well
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
};

export const signUp = async (userData: { email: string; password: string; name: string }) => {
  try {
    const response = await apiClient.post('/api/auth/sign-up', userData);

    // Store the token in localStorage or sessionStorage
    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);

      // Also store in a cookie for middleware compatibility
      document.cookie = `access_token=${response.data.access_token}; path=/;`;
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Sign up error:', error);

    let errorMessage = 'An unexpected error occurred';
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data.detail || error.response.data.message || 'Sign up failed';
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Network error: Unable to connect to server. Please check if the backend is running.';
    } else {
      // Something else happened
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }
};

// Custom hook to manage session state
export const useSessionWithHydration = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [sessionState, setSessionState] = useState({
    data: null,
    isLoading: true,
    isError: false,
    error: null
  });

  // Check for token in localStorage to determine session status
  useEffect(() => {
    setIsMounted(true);

    const token = localStorage.getItem('auth_token');
    if (token) {
      // In a real implementation, you might want to validate the token with an API call
      setSessionState({
        data: { user: { token } }, // Simplified user object
        isLoading: false,
        isError: false,
        error: null
      });
    } else {
      setSessionState({
        data: null,
        isLoading: false,
        isError: false,
        error: null
      });
    }
  }, []);

  // Return empty session during SSR/hydration
  if (!isMounted) {
    return { data: null, isLoading: true, isError: false, error: null };
  }

  return sessionState;
};

// Helper function to get the JWT token from storage
export const getJwtToken = async (): Promise<string | null> => {
  try {
    const token = localStorage.getItem('auth_token');
    return token || null;
  } catch (error) {
    console.error('Error getting JWT token:', error);
    return null;
  }
};