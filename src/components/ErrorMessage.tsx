import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <div className='flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded mb-6'>
    <AlertCircle className='h-4 w-4' />
    {error}
  </div>
);
