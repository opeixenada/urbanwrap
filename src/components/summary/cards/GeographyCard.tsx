import { SummaryCardProps } from "@/components/summary/SummaryCardProps";
import React from "react";
import { StatsCard } from "@/components/summary/StatsCard";
import { CardTitle } from "@/components/summary/CardTitle";
import { CardText } from "@/components/summary/CardText";
import { GlowText } from "@/components/summary/GlowText";
import { MapPin } from "lucide-react";
import { formatNotableMentions } from "@/components/summary/utils";

export const GeographyCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  return (
    <StatsCard gradientClass={gradientClass}>
      <div className="flex h-full flex-col items-center justify-between">
        <CardTitle>Your geography</CardTitle>

        <div className="mt-2 flex flex-col items-center gap-4">
          <MapPin className="h-12 w-12 text-white/90" />
          <CardText>You spent a lot of time in</CardText>
          <GlowText size={"3xl"}>{yearStats.locations.topDistrict}</GlowText>
        </div>

        {yearStats.locations.notableMentions && yearStats.locations.notableMentions.length > 0 && (
          <CardText className="mt-6">
            You also traveled to {formatNotableMentions(yearStats.locations.notableMentions)}
          </CardText>
        )}
      </div>
    </StatsCard>
  );
};
