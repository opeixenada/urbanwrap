'use client';

import React, { useState } from 'react';
import StatRow from '@/components/StatRow';
import Checkin from '@/types/Checkin';
import { calculateStats } from '@/utils/stats';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Users,
  Zap,
  LucideIcon,
  Compass,
  Flame,
} from 'lucide-react';

interface CheckinsSummaryProps {
  checkins: Checkin[];
}

interface InsightCardProps {
  children: React.ReactNode;
  icon: LucideIcon;
}

interface CarouselButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  disabled: boolean;
}

const InsightCard = ({ children, icon: Icon }: InsightCardProps) => (
  <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full'>
    <div className='flex items-center gap-2 mb-4'>
      <Icon className='w-6 h-6 text-blue-500' />
    </div>
    {children}
  </div>
);

const CarouselButton = ({ onClick, icon: Icon, disabled }: CarouselButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className='p-2 rounded-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors'
  >
    <Icon className='w-6 h-6' />
  </button>
);

interface Slide {
  icon: LucideIcon;
  content: React.ReactNode;
}

const CheckinsSummary: React.FC<CheckinsSummaryProps> = ({ checkins }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const stats = calculateStats(checkins);

  const slides: Slide[] = [
    {
      icon: Trophy,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>Your Activity Summary</h3>
          <div>
            <p className='text-3xl font-bold text-blue-500'>{stats.insights.totalCheckins}</p>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Total Check-ins</p>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <p className='text-2xl font-bold'>{stats.insights.uniqueClasses}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>Different Classes</p>
            </div>
            <div>
              <p className='text-2xl font-bold'>{stats.insights.uniqueVenues}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>Venues Visited</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Calendar,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>Your Longest Streak</h3>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-3xl font-bold text-blue-500'>{stats.insights.streaks.longest}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>Days</p>
            </div>
          </div>
          <p className='mt-4'>Most active on {stats.insights.timing.busiest.weekday}s</p>
        </div>
      ),
    },
    {
      icon: MapPin,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>Your Locations</h3>
          <p className='text-lg'>
            Most visited area:{' '}
            <span className='font-bold'>{stats.insights.locations.topDistrict}</span>
          </p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <p className='text-2xl font-bold'>{stats.insights.locations.citiesVisited}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>Cities Explored</p>
            </div>
            <div>
              <p className='text-2xl font-bold'>{stats.insights.locations.districtsVisited}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>Districts Visited</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Clock,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>Your Timing</h3>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <p className='text-2xl font-bold'>{stats.insights.timing.totalHoursSpent}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>Total Hours</p>
            </div>
          </div>

          <p className='text-lg'>
            You&#39;re <span className='font-bold'>{stats.insights.timing.favoriteTimeOfDay}</span>
          </p>

          <div className='space-y-4'>
            {Object.entries(stats.insights.timing.distribution).map(([timeSlot, percentage]) => (
              <div key={timeSlot} className='space-y-1'>
                <div className='flex justify-between text-sm'>
                  <span className='capitalize'>{timeSlot.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span>{percentage}%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full'
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: Users,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>Attendance</h3>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <p className='text-3xl font-bold text-green-500'>
                {stats.insights.attendance.percentOnTime}%
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>On Time</p>
            </div>
            <div>
              <p className='text-3xl font-bold text-yellow-500'>{stats.insights.attendance.late}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>Late Cancellations</p>
            </div>
            <div>
              <p className='text-3xl font-bold text-red-500'>{stats.insights.attendance.noShow}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>No Shows</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Zap,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>Class Types</h3>
          <div className='space-y-6'>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <p className='text-lg'>In-Person Classes</p>
                <p className='text-sm text-gray-600'>
                  {stats.insights.online.totalInPerson} classes
                </p>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-green-500 h-2 rounded-full'
                  style={{ width: `${stats.insights.online.percentageInPerson}%` }}
                />
              </div>
              <p className='text-sm text-gray-600 mt-1'>
                {stats.insights.online.percentageInPerson}% of total
              </p>
            </div>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <p className='text-lg'>Online Classes</p>
                <p className='text-sm text-gray-600'>{stats.insights.online.totalOnline} classes</p>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-blue-500 h-2 rounded-full'
                  style={{ width: `${stats.insights.online.percentageOnline}%` }}
                />
              </div>
              <p className='text-sm text-gray-600 mt-1'>
                {stats.insights.online.percentageOnline}% of total
              </p>
            </div>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <p className='text-lg'>Plus Check-ins</p>
                <p className='text-sm text-gray-600'>
                  {stats.insights.plus.totalPlusCheckins} classes
                </p>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-purple-500 h-2 rounded-full'
                  style={{ width: `${stats.insights.plus.percentagePlusCheckins}%` }}
                />
              </div>
              <p className='text-sm text-gray-600 mt-1'>
                {stats.insights.plus.percentagePlusCheckins}% of total
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Flame,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>{stats.insights.categories.favorite} Deep Dive</h3>

          <div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Your favorite category was {stats.insights.categories.favorite}
            </p>
          </div>

          <div className='space-y-4'>
            <div>
              <p className='text-3xl font-bold text-blue-500'>
                {stats.insights.categories.hoursInFavorite}
              </p>
              <p className='text-gray-600 dark:text-gray-300'>Hours Spent</p>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-2xl font-bold'>
                  {stats.insights.categories.percentageInFavorite}%
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>of Total Classes</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>
                  {Math.round(
                    (stats.insights.categories.hoursInFavorite /
                      stats.insights.timing.totalHoursSpent) *
                      100
                  )}
                  %
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>of Total Time</p>
              </div>
            </div>

            <div className='mt-6'>
              <p className='font-medium mb-2'>Your favorite classes in this category:</p>
              <div className='space-y-2'>
                {Object.entries(stats.insights.categories.topClasses).map(([combo, count]) => (
                  <div key={combo} className='text-sm'>
                    <p className='font-medium'>{combo}</p>
                    <p className='text-gray-600 dark:text-gray-300'>{count} classes</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Compass,
      content: (
        <div className='space-y-4'>
          <h3 className='text-xl font-bold mb-4'>Next Year Recommendations</h3>
          <div className='space-y-4'>
            {stats.insights.recommendations.map((recommendation, index) => (
              <div key={index} className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <p className='text-sm font-medium'>{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className='mb-8 space-y-6'>
      <div className='relative'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Your Year in Review</h2>
          <div className='flex gap-2'>
            <CarouselButton
              onClick={() => setCurrentSlide((prev) => prev - 1)}
              icon={ChevronLeft}
              disabled={currentSlide === 0}
            />
            <CarouselButton
              onClick={() => setCurrentSlide((prev) => prev + 1)}
              icon={ChevronRight}
              disabled={currentSlide === slides.length - 1}
            />
          </div>
        </div>
        <InsightCard icon={slides[currentSlide].icon}>{slides[currentSlide].content}</InsightCard>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
        <h2 className='text-xl font-bold mb-6'>Detailed Stats</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <StatRow title='Top Categories' stats={stats.categories} />
          <StatRow title='Most Visited Venues' stats={stats.venues} />
          <StatRow
            title={`Classes at ${Object.keys(stats.venues)[0]}`}
            stats={stats.topVenueClasses}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckinsSummary;
