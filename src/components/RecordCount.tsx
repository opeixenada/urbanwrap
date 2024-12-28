interface RecordCountProps {
  count: number;
}

export const RecordCount = ({ count }: RecordCountProps) => (
  <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>Found {count} check-ins</div>
);
