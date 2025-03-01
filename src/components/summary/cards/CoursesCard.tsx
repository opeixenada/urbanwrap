import React from "react";
import { formatNotableMentions } from "@/components/summary/utils";
import { SummaryCardProps } from "@/components/summary/SummaryCardProps";
import { StatsCard } from "@/components/summary/StatsCard";
import { CardTitle } from "@/components/summary/CardTitle";
import { CardText } from "@/components/summary/CardText";
import { GlowText } from "@/components/summary/GlowText";

export const CoursesCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  return (
    <StatsCard gradientClass={gradientClass}>
      <div className="flex h-full flex-col items-center justify-between">
        <CardTitle>Your classes</CardTitle>

        <CardText>
          You attended <GlowText>{yearStats.courses.count}</GlowText> different classes and sessions
        </CardText>

        <div className="mt-6 flex flex-col items-center gap-4">
          <GlowText size={"3xl"}>{yearStats.courses.favorite}</GlowText>
          <CardText>was your favorite</CardText>
        </div>

        {yearStats.courses.notableMentions && yearStats.courses.notableMentions.length > 0 && (
          <CardText className="mt-6">
            You also loved {formatNotableMentions(yearStats.courses.notableMentions)}
          </CardText>
        )}
      </div>
    </StatsCard>
  );
};
