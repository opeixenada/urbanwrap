import React from 'react';
import { Clock8, LucideIcon, Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { StatsCard } from '@/components/summary/StatsCard';
import { CardTitle } from '@/components/summary/CardTitle';
import { CardText } from '@/components/summary/CardText';
import { GlowText } from '@/components/summary/GlowText';
import { SummaryCardProps } from '@/components/summary/SummaryCardProps';

interface TimeBlockProps {
  icon: LucideIcon;
  label: string;
  count: number;
  total: number;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ icon: Icon, label, count, total }) => {
  const percentage = ((count / total) * 100).toFixed(0);

  return (
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center'>
        <Icon className='w-6 h-6 text-white' />
      </div>
      <div className='flex-1'>
        <div className='flex justify-between items-baseline'>
          <span className='text-sm font-medium text-white/90 capitalize'>{label}</span>
          <span className='text-sm font-bold text-white'>{count}</span>
        </div>
        <div className='mt-1 h-2 bg-white/20 rounded-full overflow-hidden'>
          <div
            className='h-full bg-white/90 rounded-full transition-all duration-500 ease-in-out'
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

interface TimeDistribution {
  label: string;
  icon: LucideIcon;
  count: number;
}

export const TimeOfDayCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  const timeBlocks: TimeDistribution[] = [
    {
      label: 'morning',
      icon: Sunrise,
      count: yearStats.timeOfDayDistribution.morning || 0,
    },
    {
      label: 'afternoon',
      icon: Sun,
      count: yearStats.timeOfDayDistribution.afternoon || 0,
    },
    {
      label: 'evening',
      icon: Sunset,
      count: yearStats.timeOfDayDistribution.evening || 0,
    },
    {
      label: 'night',
      icon: Moon,
      count: yearStats.timeOfDayDistribution.night || 0,
    },
  ];

  const total = Object.values(yearStats.timeOfDayDistribution).reduce((a, b) => a + b, 0);
  const mostActive = timeBlocks.reduce((max, current) =>
    current.count > max.count ? current : max
  );

  return (
    <StatsCard gradientClass={gradientClass}>
      <div className='flex flex-col justify-between h-full'>
        <CardTitle icon={<Clock8 className='w-6 h-6' />}>Activity times</CardTitle>

        <div className='flex flex-col items-center gap-2'>
          <CardText className='text-xl'>
            You were most active in the <GlowText>{mostActive.label}</GlowText>
          </CardText>
          <CardText>
            when you checked in <GlowText>{mostActive.count}</GlowText> times
          </CardText>
        </div>

        <div className='space-y-4 mt-6'>
          {timeBlocks.map((block) => (
            <TimeBlock
              key={block.label}
              icon={block.icon}
              label={block.label}
              count={block.count}
              total={total}
            />
          ))}
        </div>
      </div>
    </StatsCard>
  );
};
