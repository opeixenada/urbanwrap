import React from 'react';
import Checkin from '@/types/Checkin';
import { convertToYearStats } from '@/utils/yearStats';
import { YearCalendarCard } from '@/components/summary/cards/YearCalendarCard';
import { TimeOfDayCard } from '@/components/summary/cards/TimeOfDayCard';
import { OverviewCard } from '@/components/summary/cards/OverviewCard';
import { ActivitySummaryCard } from '@/components/summary/cards/ActivitySummaryCard';
import { FavoriteActivitiesCard } from '@/components/summary/cards/FavoriteActivitiesCard';
import { MonthlyActivityCard } from '@/components/summary/cards/MonthlyActivityCard';
import { VenuesCard } from '@/components/summary/cards/VenuesCard';
import { CoursesCard } from '@/components/summary/cards/CoursesCard';
import { GeographyCard } from '@/components/summary/cards/GeographyCard';
import { getGradient } from '@/utils/gradients';
import { APP_CONFIG } from '@/config/constants';

interface YearSummaryProps {
  checkins: Checkin[];
}

export const YearSummary: React.FC<YearSummaryProps> = ({ checkins }) => {
  const yearStats = convertToYearStats(checkins, APP_CONFIG.summaryYear);

  return (
    <div className='grid gap-6 xl:grid-cols-3 lg:grid-cols-2 mx-auto'>
      <OverviewCard yearStats={yearStats} gradientClass={getGradient(0)} />
      <ActivitySummaryCard yearStats={yearStats} gradientClass={getGradient(1)} />
      <FavoriteActivitiesCard yearStats={yearStats} gradientClass={getGradient(2)} />
      <MonthlyActivityCard yearStats={yearStats} gradientClass={getGradient(3)} />
      <TimeOfDayCard yearStats={yearStats} gradientClass={getGradient(4)} />
      <YearCalendarCard yearStats={yearStats} gradientClass={getGradient(5)} />
      <VenuesCard yearStats={yearStats} gradientClass={getGradient(6)} />
      <CoursesCard yearStats={yearStats} gradientClass={getGradient(7)} />
      <GeographyCard yearStats={yearStats} gradientClass={getGradient(8)} />
    </div>
  );
};
