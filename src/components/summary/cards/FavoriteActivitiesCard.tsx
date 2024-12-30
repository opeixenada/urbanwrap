import { SummaryCardProps } from '@/components/summary/SummaryCardProps';
import React from 'react';
import { StatsCard } from '@/components/summary/StatsCard';
import { CardTitle } from '@/components/summary/CardTitle';
import { CardText } from '@/components/summary/CardText';
import { GlowText } from '@/components/summary/GlowText';
import NextImage from 'next/image';
import { formatNotableMentions } from '@/components/summary/utils';

export const FavoriteActivitiesCard: React.FC<SummaryCardProps> = ({
  yearStats,
  gradientClass,
}) => {
  return (
    <StatsCard gradientClass={gradientClass}>
      <div className='flex flex-col justify-between items-center h-full'>
        <CardTitle>Your favorite activity</CardTitle>

        <div className='flex flex-col items-center gap-4'>
          <NextImage
            src={yearStats.categories.favoriteIcon}
            alt={yearStats.categories.favorite}
            width={64}
            height={64}
            style={{ objectFit: 'contain' }}
          />
          <GlowText size={'3xl'}>{yearStats.categories.favorite}</GlowText>
        </div>

        <CardText className='mt-6'>
          You did {yearStats.categories.favorite}{' '}
          <GlowText>{yearStats.categories.favoriteCheckins}</GlowText> times
        </CardText>

        <CardText className='mt-6'>
          You were also into {formatNotableMentions(yearStats.categories.notableMentions)}
        </CardText>
      </div>
    </StatsCard>
  );
};
