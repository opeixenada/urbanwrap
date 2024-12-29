import { Loader2 } from 'lucide-react';

interface SearchFormProps {
  token: string;
  loading: boolean;
  onTokenChange: (token: string) => void;
  onSubmit: () => void;
}

export const SearchForm = ({ token, loading, onTokenChange, onSubmit }: SearchFormProps) => {
  return (
    <form
      className='flex flex-col md:flex-row gap-4 mb-6'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type='password'
        placeholder='Enter your USC token'
        value={token}
        onChange={(e) => onTokenChange(e.target.value)}
        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-600'
      />

      <button
        type='submit'
        disabled={!token || loading}
        className='min-w-[150px] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
      >
        {loading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Loading
          </>
        ) : (
          'Fetch Checkins'
        )}
      </button>
    </form>
  );
};
