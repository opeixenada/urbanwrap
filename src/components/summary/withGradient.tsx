import React from 'react';
import { SummaryCardProps } from '@/components/summary/SummaryCardProps';
import { StatsCard } from '@/components/summary/StatsCard';

export const withGradient = (
  WrappedComponent: React.FC<Omit<SummaryCardProps, 'gradientClass'>>,
  gradientClass: string
) => {
  return function GradientCard(props: Omit<SummaryCardProps, 'gradientClass'>) {
    return (
      <StatsCard gradientClass={gradientClass}>
        <WrappedComponent {...props} />
      </StatsCard>
    );
  };
};
