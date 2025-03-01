import { SummaryCardProps } from "@/components/summary/SummaryCardProps";
import React from "react";
import { StatsCard } from "@/components/summary/StatsCard";
import { CardTitle } from "@/components/summary/CardTitle";
import { CardText } from "@/components/summary/CardText";
import { GlowText } from "@/components/summary/GlowText";
import { formatNotableMentions } from "@/components/summary/utils";

export const VenuesCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  return (
    <StatsCard gradientClass={gradientClass}>
      <div className="flex h-full flex-col items-center justify-between">
        <CardTitle>Your venues</CardTitle>

        <CardText>
          You visited <GlowText>{yearStats.venues.count}</GlowText> venues this year
        </CardText>

        <div className="mt-6 flex flex-col items-center gap-4">
          <GlowText size={"3xl"}>{yearStats.venues.favorite}</GlowText>
          <CardText>was your favorite</CardText>
        </div>

        {yearStats.venues.notableMentions && yearStats.venues.notableMentions.length > 0 && (
          <CardText className="mt-6">
            You were also a regular at {formatNotableMentions(yearStats.venues.notableMentions)}
          </CardText>
        )}
      </div>
    </StatsCard>
  );
};
