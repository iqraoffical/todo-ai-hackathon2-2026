import { createAuthClient, type Session } from "better-auth/react";

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:8000",
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});

// Helper function to get the JWT token from the session
export const getJwtToken = async (): Promise<string | null> => {
  // Note: In a real implementation, we would get the JWT token from Better Auth session
  // This is a simplified approach - in practice, you might need to access the token differently
  if (typeof window !== 'undefined') {
    // Client-side code
    const sessionData = localStorage.getItem('better-auth-session');
    if (sessionData) {
      try {
        const session: Session = JSON.parse(sessionData);
        return session.token || session.accessToken || null;
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    }
  }
  return null;
};