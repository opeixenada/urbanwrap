'use client';

import React from 'react';
import { X } from 'lucide-react';

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: unknown;
}

export const JsonModal: React.FC<JsonModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col'>
        <div className='p-4 border-b flex justify-between items-center'>
          <h3 className='text-lg font-semibold'>Raw JSON Data</h3>
          <button
            onClick={onClose}
            className='p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        <div className='p-4 overflow-auto'>
          <pre className='text-sm whitespace-pre-wrap font-mono'>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
