import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <div className="mb-6 flex items-center gap-2 rounded bg-red-100 p-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
    <AlertCircle className="h-4 w-4" />
    {error}
  </div>
);
