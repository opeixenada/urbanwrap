import React from 'react';

interface CardTextProps {
  children: React.ReactNode;
  emphasis?: boolean;
  className?: string;
}

export const CardText: React.FC<CardTextProps> = ({
  children,
  emphasis = false,
  className = '',
}) => {
  return (
    <p
      className={`
      text-lg 
      ${emphasis ? 'font-bold' : 'font-medium'}
      ${className}
    `}
    >
      {children}
    </p>
  );
};
