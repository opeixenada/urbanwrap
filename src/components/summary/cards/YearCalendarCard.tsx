import React from "react";
import { Calendar } from "lucide-react";
import { YearStats } from "@/types/YearStats";
import { StatsCard } from "@/components/summary/StatsCard";
import { CardTitle } from "@/components/summary/CardTitle";
import { CardText } from "@/components/summary/CardText";
import { SummaryCardProps } from "@/components/summary/SummaryCardProps";
import { GlowText } from "@/components/summary/GlowText";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

interface CalendarDayProps {
  day: number;
  isActive: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, isActive }) => {
  if (day === -1) return <div className="invisible h-3 w-3" />;

  return (
    <div
      className={`relative flex h-3 w-3 items-center justify-center text-[0.6rem] ${
        isActive
          ? "font-semibold text-white/70 [text-shadow:0_0_5px_rgba(255,255,255,1),0_0_10px_rgba(255,255,255,0.5)]"
          : "text-white/50"
      } `}
    >
      {day > 0 ? day : ""}
    </div>
  );
};

interface MonthCalendarProps {
  month: string;
  days: number[];
  year: number;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ month, days, year }) => {
  const firstDay = new Date(year, MONTHS.indexOf(month), 1);
  const daysInMonth = new Date(year, firstDay.getMonth() + 1, 0).getDate();
  const startDay = firstDay.getDay();

  const weeks = [];
  let currentWeek = new Array(7).fill(null);

  // Fill in the blank days at the start
  for (let i = 0; i < startDay; i++) {
    currentWeek[i] = -1;
  }

  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const weekDay = (startDay + day - 1) % 7;
    currentWeek[weekDay] = day;

    if (weekDay === 6 || day === daysInMonth) {
      weeks.push([...currentWeek]);
      currentWeek = new Array(7).fill(null);
    }
  }

  return (
    <div className="flex-1">
      <h3 className="mb-1 text-xs font-medium text-white/90">{month}</h3>
      <div className="grid grid-cols-7 gap-px">
        {WEEKDAYS.map((day, i) => (
          <div key={i} className="text-opacity-80 text-center text-xs text-white">
            {day}
          </div>
        ))}
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <CalendarDay
              key={`${weekIndex}-${dayIndex}`}
              day={day || -1}
              isActive={day && days.includes(day)}
            />
          )),
        )}
      </div>
    </div>
  );
};

interface MonthRowProps {
  months: string[];
  yearStats: YearStats;
}

const MonthRow: React.FC<MonthRowProps> = ({ months, yearStats }) => (
  <div className="grid grid-cols-3 gap-4">
    {months.map((month) => (
      <MonthCalendar
        key={month}
        month={month}
        days={yearStats.daysOfMonth[month] || []}
        year={yearStats.year}
      />
    ))}
  </div>
);

export const YearCalendarCard: React.FC<SummaryCardProps> = ({ yearStats, gradientClass }) => {
  const totalDays = Object.values(yearStats.daysOfMonth).reduce(
    (sum, days) => sum + days.length,
    0,
  );

  // Group months into rows of 3
  const monthRows = [
    MONTHS.slice(0, 3), // Jan, Feb, Mar
    MONTHS.slice(3, 6), // Apr, May, Jun
    MONTHS.slice(6, 9), // Jul, Aug, Sep
    MONTHS.slice(9, 12), // Oct, Nov, Dec
  ];

  return (
    <StatsCard gradientClass={gradientClass}>
      <div className="mb-6 flex flex-col items-center">
        <CardTitle icon={<Calendar className="h-6 w-6" />}>Your active days</CardTitle>

        <CardText>
          You used USC on <GlowText>{totalDays}</GlowText> days
        </CardText>
      </div>

      <div className="flex flex-col gap-6">
        {monthRows.map((months, index) => (
          <MonthRow key={index} months={months} yearStats={yearStats} />
        ))}
      </div>
    </StatsCard>
  );
};
