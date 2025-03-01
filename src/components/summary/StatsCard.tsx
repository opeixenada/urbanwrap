import React from "react";

interface StatsCardProps {
  gradientClass: string;
  children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ gradientClass, children }) => {
  return (
    <div
      className={`bg-gradient-to-br ${gradientClass} flex h-full flex-col items-center rounded-xl p-8 text-center text-white shadow-lg`}
    >
      {children}
    </div>
  );
};
