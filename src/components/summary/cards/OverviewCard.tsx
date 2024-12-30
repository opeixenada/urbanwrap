import { Medal } from 'lucide-react';
import { SummaryCardProps } from '@/components/summary/SummaryCardProps';
import React from 'react';
import { StatsCard } from '@/components/summary/StatsCard';
import { CardTitle } from '@/components/summary/CardTitle';
import { CardText } from '@/components/summary/CardText';
import { GlowText } from '@/components/summary/GlowText';

export const OverviewCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  return (
    <StatsCard gradientClass={gradientClass}>
      <div className='flex flex-col justify-between items-center h-full'>
        <CardTitle icon={<Medal className='w-12 h-12' />} className={'flex-col'}>
          Your {yearStats.year} @ Urban Sports Club
        </CardTitle>

        <div className='flex flex-col items-center gap-2'>
          <CardText>Congratulations! You checked in...</CardText>
          <GlowText size='7xl'>{yearStats.checkins.total}</GlowText>
          <CardText emphasis>times</CardText>
        </div>

        <CardText className='mt-6'>Well done!</CardText>
      </div>
    </StatsCard>
  );
};
