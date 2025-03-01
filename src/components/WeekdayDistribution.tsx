import React from "react";

interface WeekdayDistributionProps {
  distribution: { [key: string]: number };
}

export const WeekdayDistribution = ({ distribution }: WeekdayDistributionProps) => {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const maxPercentage = Math.max(...Object.values(distribution));

  return (
    <div className="space-y-2">
      <h3 className="mb-4 text-xl font-bold">Distribution by day of week</h3>
      <div className="flex gap-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="group relative flex-1 rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div
              className="mb-2 w-full rounded-md bg-blue-500"
              style={{
                height: "8px",
                opacity: 0.2 + (0.8 * distribution[day]) / maxPercentage,
              }}
            />
            <p className="text-center text-xs font-medium">{day.slice(0, 3)}</p>
            <p className="text-center text-xs text-gray-600 dark:text-gray-300">
              {distribution[day]}%
            </p>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
              {day}: {distribution[day]}% of classes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
