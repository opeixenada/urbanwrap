import React from 'react';

interface StatsCardProps {
  gradientClass: string;
  children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ gradientClass, children }) => {
  return (
    <div
      className={`
        bg-gradient-to-br 
        ${gradientClass}
        rounded-xl p-8 shadow-lg 
        flex flex-col items-center text-center h-full
        text-white
      `}
    >
      {children}
    </div>
  );
};
