import React from 'react';

interface CardTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, icon, className = '' }) => {
  return (
    <h2
      className={`text-2xl font-bold text-white text-center flex items-center gap-3 justify-center mb-4 ${className}`}
    >
      {icon && <div className='text-white/90'>{icon}</div>}
      {children}
    </h2>
  );
};
