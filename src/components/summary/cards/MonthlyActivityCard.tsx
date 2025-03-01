import { SummaryCardProps } from "@/components/summary/SummaryCardProps";
import React from "react";
import { StatsCard } from "@/components/summary/StatsCard";
import { CardTitle } from "@/components/summary/CardTitle";
import { CardText } from "@/components/summary/CardText";
import { GlowText } from "@/components/summary/GlowText";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

export const MonthlyActivityCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  const [topMonth, checkins] = Object.entries(yearStats.monthlyDistribution).reduce(
    (max, [month, count]) => (count > max[1] ? [month, count] : max),
    ["", 0],
  );

  return (
    <StatsCard gradientClass={gradientClass}>
      <div className="flex h-full w-full flex-col items-center justify-between">
        <CardTitle>Your most active month</CardTitle>

        <div className="flex flex-col items-center gap-2">
          <GlowText size={"3xl"}>{topMonth}</GlowText>
          <CardText>
            when you checked in <GlowText>{checkins}</GlowText> times
          </CardText>
        </div>
        <div className="relative mt-4 min-h-48 w-full">
          <ResponsiveContainer width="100%" height={192}>
            <BarChart
              data={Object.entries(yearStats.monthlyDistribution).map(([month, count]) => ({
                month,
                checkins: count,
              }))}
              margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
            >
              <Bar dataKey="checkins" fill="rgba(255, 255, 255, 0.9)" radius={[4, 4, 0, 0]} />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 12 }}
                tickFormatter={(value) => value.slice(0, 3)}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.5)" }}
                tickLine={{ stroke: "rgba(255, 255, 255, 0.5)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <CardText className="mt-2">
          Your longest streak was <GlowText>{yearStats.longestStreak.length}</GlowText> days, it
          started on{" "}
          <span className="font-bold">
            {yearStats.longestStreak.startDate?.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </span>
        </CardText>
      </div>
    </StatsCard>
  );
};
