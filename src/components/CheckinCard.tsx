'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import Checkin from '@/types/Checkin';

interface CheckinCardProps {
  checkin: Checkin;
}

const CheckinCard: React.FC<CheckinCardProps> = ({ checkin }) => {
  const startTime = new Date(checkin.course.startDateTimeUTC).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = new Date(checkin.course.endDateTimeUTC).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'CHECKEDIN':
        return { text: 'Attended', bgColor: 'bg-green-500' };
      case 'LATE':
        return { text: 'Late Cancel', bgColor: 'bg-yellow-500' };
      case 'NOSHOW':
        return { text: 'No Show', bgColor: 'bg-red-500' };
      default:
        return { text: status, bgColor: 'bg-gray-500' };
    }
  };

  const statusInfo = getStatusDisplay(checkin.status);

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
      <div className='relative h-48'>
        {checkin.course.covers?.[0]?.original ? (
          <img
            src={checkin.course.covers[0].original}
            alt={checkin.course.title}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
            No image available
          </div>
        )}
        <div className='absolute top-2 right-2 flex gap-2'>
          {checkin.course.isOnline ? (
            <span className='bg-blue-500 text-white px-2 py-1 rounded-full text-xs'>Online</span>
          ) : (
            <span className='bg-green-500 text-white px-2 py-1 rounded-full text-xs'>
              In Person
            </span>
          )}
          {checkin.course.isPlusCheckin ? (
            <span className='bg-purple-500 text-white px-2 py-1 rounded-full text-xs'>Plus</span>
          ) : null}
        </div>
        <div className='absolute bottom-2 left-2'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusInfo.bgColor}`}
          >
            {statusInfo.text}
          </span>
        </div>
      </div>

      <div className='p-4'>
        <h3 className='font-bold text-lg mb-2 line-clamp-2'>{checkin.course.title}</h3>

        <div className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4' />
            <span>{new Date(checkin.created).toLocaleDateString()}</span>
          </div>

          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            <span>
              {startTime} - {endTime}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4' />
            <span>
              {checkin.course.venueName}
              <br />
              <span className='text-xs'>
                {checkin.course.cityName}, {checkin.course.districtName}
                <br />
                {checkin.course.venueFullAddress}
              </span>
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <Tag className='h-4 w-4' />
            <span>{checkin.course.category.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinCard;
