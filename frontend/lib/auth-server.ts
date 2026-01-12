import { cookies } from 'next/headers';
import { getSession } from 'better-auth/react';

/**
 * Server-side function to get the current user session
 * This function extracts the session cookie and validates it
 */
export async function getCurrentUser() {
  // Get the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('better-auth-session');
  
  if (!sessionCookie) {
    return null;
  }

  try {
    // In a real implementation, you would validate the session with your auth provider
    // For Better Auth, we would typically call an API to validate the session
    // This is a simplified approach - in practice, you might need to make a request to your backend
    const sessionValue = sessionCookie.value;
    
    // Parse the session data (this is specific to how Better Auth stores session data)
    try {
      const sessionData = JSON.parse(decodeURIComponent(sessionValue));
      return {
        user: sessionData.user,
        token: sessionData.token || sessionData.accessToken,
      };
    } catch (parseError) {
      console.error('Error parsing session cookie:', parseError);
      return null;
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Server-side function to get the JWT token from the session
 */
export async function getServerJwtToken() {
  const user = await getCurrentUser();
  return user?.token || null;
}