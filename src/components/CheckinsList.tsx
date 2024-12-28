import React from 'react';
import Checkin from '@/types/Checkin';
import { CheckinCard } from '@/components/CheckinCard';

interface CheckinsListProps {
  checkins: Checkin[];
  onJsonView: (checkin: Checkin) => void;
}

export const CheckinsList = ({ checkins, onJsonView }: CheckinsListProps) => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {checkins.map((checkin, index) => (
      <div key={index} className='relative group'>
        <CheckinCard checkin={checkin} />
        <button
          onClick={() => onJsonView(checkin)}
          className='absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity'
        >
          View JSON
        </button>
      </div>
    ))}
  </div>
);
