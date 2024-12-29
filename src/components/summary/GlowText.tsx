import React from 'react';

interface GlowTextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '7xl';
  className?: string;
}

export const GlowText: React.FC<GlowTextProps> = ({ children, size = 'xl', className = '' }) => {
  return (
    <span
      className={`
      text-${size}
      font-bold 
      text-white 
      [text-shadow:0_0_10px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.3)]
      ${className}
    `}
    >
      {children}
    </span>
  );
};
