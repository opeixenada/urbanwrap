import React from 'react';

interface WeekdayDistributionProps {
  distribution: { [key: string]: number };
}

export const WeekdayDistribution = ({ distribution }: WeekdayDistributionProps) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const maxPercentage = Math.max(...Object.values(distribution));

  return (
    <div className='space-y-2'>
      <h3 className='text-xl font-bold mb-4'>Distribution by day of week</h3>
      <div className='flex gap-2'>
        {weekdays.map((day) => (
          <div
            key={day}
            className='flex-1 relative group hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors'
          >
            <div
              className='w-full bg-blue-500 rounded-md mb-2'
              style={{
                height: '8px',
                opacity: 0.2 + (0.8 * distribution[day]) / maxPercentage,
              }}
            />
            <p className='text-xs text-center font-medium'>{day.slice(0, 3)}</p>
            <p className='text-xs text-center text-gray-600 dark:text-gray-300'>
              {distribution[day]}%
            </p>

            {/* Tooltip on hover */}
            <div className='absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap'>
              {day}: {distribution[day]}% of classes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
