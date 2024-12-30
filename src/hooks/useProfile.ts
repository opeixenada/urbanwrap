import { useState } from 'react';
import { Profile } from '@/types/Profile';

interface ApiResponse {
  success: string;
  data: Profile;
  error?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async (token: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || `HTTP error! Status: ${response.status}`);
        return;
      }

      setProfile(data.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { profile, isLoading: loading, error, fetchProfile };
};
