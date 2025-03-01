import React from "react";

interface CardTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, icon, className = "" }) => {
  return (
    <h2
      className={`mb-4 flex items-center justify-center gap-3 text-center text-2xl font-bold text-white ${className}`}
    >
      {icon && <div className="text-white/90">{icon}</div>}
      {children}
    </h2>
  );
};
