import { Loader2 } from 'lucide-react';

interface SearchFormProps {
  token: string;
  year: string;
  loading: boolean;
  onTokenChange: (token: string) => void;
  onYearChange: (year: string) => void;
  onSubmit: () => void;
}

export const SearchForm = ({
  token,
  year,
  loading,
  onTokenChange,
  onYearChange,
  onSubmit,
}: SearchFormProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='flex flex-col md:flex-row gap-4 mb-6'>
      <input
        type='password'
        placeholder='Enter your USC token'
        value={token}
        onChange={(e) => onTokenChange(e.target.value)}
        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-600'
      />
      <input
        type='number'
        placeholder='Year'
        min='2020'
        max={currentYear}
        value={year}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          if (!isNaN(val) && val >= 2020 && val <= currentYear) {
            onYearChange(val.toString());
          }
        }}
        className='w-full md:w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-600'
      />
      <button
        onClick={onSubmit}
        disabled={!token || !year || loading}
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
    </div>
  );
};
