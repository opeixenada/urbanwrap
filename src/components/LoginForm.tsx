import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface LoginFormProps {
  loading: boolean;
  onSubmit: (credentials: { username: string; password: string }) => void;
}

export const LoginForm = ({ loading, onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className='flex flex-col gap-4 mb-6 max-w-md'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ username, password });
      }}
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='username' className='text-sm font-medium'>
          Email
        </label>
        <input
          id='username'
          type='email'
          placeholder='Enter your USC email'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-600'
          required
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='password' className='text-sm font-medium'>
          Password
        </label>
        <input
          id='password'
          type='password'
          placeholder='Enter your USC password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-600'
          required
        />
      </div>

      <button
        type='submit'
        disabled={!username || !password || loading}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
      >
        {loading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};
