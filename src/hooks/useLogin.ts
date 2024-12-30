import { useState } from 'react';

interface LoginCredentials {
  username: string;
  password: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const authResponse = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const authData = await authResponse.json();

      if (!authData.success) {
        setError(authData.error || 'Authentication failed');
        return;
      }

      return authData.data.access_token;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
