import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    if (open) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full relative'>
        <button
          onClick={() => onOpenChange(false)}
          className='absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        >
          <X size={20} />
        </button>

        <div className='px-6 py-8'>
          <h2 className='text-2xl font-bold mb-6 dark:text-white'>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
