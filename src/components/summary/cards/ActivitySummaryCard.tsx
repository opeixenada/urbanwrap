import React from "react";
import { StatsCard } from "@/components/summary/StatsCard";
import { CardTitle } from "@/components/summary/CardTitle";
import { CardText } from "@/components/summary/CardText";
import { GlowText } from "@/components/summary/GlowText";
import { Clock } from "lucide-react";
import { SummaryCardProps } from "@/components/summary/SummaryCardProps";

export const ActivitySummaryCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  return (
    <StatsCard gradientClass={gradientClass}>
      <CardTitle>Your totals</CardTitle>

      <div className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <CardText>You attended</CardText>
          <GlowText size={"4xl"}>{yearStats.events.total}</GlowText>
          <CardText emphasis>events</CardText>
          {yearStats.events.total > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <CardText>
                Which took you <GlowText>{yearStats.events.totalHours}</GlowText> hours
              </CardText>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-6 pt-4">
        <div className="flex flex-col items-center gap-3">
          <CardText>and completed</CardText>
          <GlowText size={"4xl"}>{yearStats.freeTraining.total}</GlowText>
          <CardText emphasis>free training sessions</CardText>
        </div>
      </div>
    </StatsCard>
  );
};
