import { countBy, groupBy, maxBy } from "lodash";
import Checkin from "@/types/Checkin";
import { StreakInfo, YearStats } from "@/types/YearStats";
import { monthOrder } from "@/utils/utils";

// Helper function to calculate hours between two UTC dates
const getHoursBetween = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  return diffMs / (1000 * 60 * 60); // Convert ms to hours
};

// Helper function to get time of day category
const getTimeOfDay = (date: Date): string => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

const calculateStreak = (dates: Date[]): StreakInfo => {
  if (dates.length === 0) return { length: 0, startDate: null };

  // Sort dates in ascending order
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());

  let currentStreak = 1;
  let maxStreak = 1;
  let prevDate = sortedDates[0];
  let currentStreakStart = prevDate;
  let maxStreakStart = prevDate;

  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    const diffDays = Math.floor(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
        maxStreakStart = currentStreakStart;
      }
    } else {
      currentStreak = 1;
      currentStreakStart = currentDate;
    }

    prevDate = currentDate;
  }

  return {
    length: maxStreak,
    startDate: maxStreakStart,
  };
};

// Helper type for grouped checkins
type GroupedCheckins = Record<string, Checkin[]>;

// Helper function to get top item from grouped data
const getTopFromGroup = (groups: GroupedCheckins): [string, Checkin[]] | undefined => {
  return maxBy(Object.entries(groups), ([, checkins]) => checkins.length);
};

// Helper function to get notable mentions
const getNotableMentions = (groups: GroupedCheckins, favorite: string): string[] => {
  return Object.entries(groups)
    .filter(([name]) => name !== favorite)
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 3)
    .map(([name]) => name);
};

export const convertToYearStats = (checkins: Checkin[], year: number): YearStats => {
  // Filter checkins for the specified year and CHECKEDIN status
  const validCheckins = checkins.filter((checkin) => {
    const checkinDate = new Date(checkin.course.date);
    return checkinDate.getFullYear() === year && checkin.status === "CHECKEDIN";
  });

  // Separate events and free training
  const events = validCheckins.filter((c) => c.course.serviceType === "event");
  const freeTraining = validCheckins.filter(
    (c) =>
      c.course.serviceType === "free_training" || c.course.serviceType === "hidden_free_training",
  );

  // Calculate total hours
  const eventHours = Math.floor(
    events.reduce((total, event) => {
      return total + getHoursBetween(event.course.startDateTimeUTC, event.course.endDateTimeUTC);
    }, 0),
  );

  // Group by categories
  const categoryCount = new Set(validCheckins.map((c) => c.course.category.id)).size;
  const categoryGroups: GroupedCheckins = groupBy(validCheckins, (c) => c.course.category.name);
  const favoriteCategory = getTopFromGroup(categoryGroups);
  const favoriteCategoryCheckins = favoriteCategory ? favoriteCategory[1].length : 0;

  // Group by courses
  const courseCount = new Set(validCheckins.map((c) => c.course.id)).size;
  const courseGroups: GroupedCheckins = groupBy(validCheckins, (c) => c.course.title);
  const favoriteCourse = getTopFromGroup(courseGroups);

  // Group by venues
  const venueCount = new Set(validCheckins.map((c) => c.course.venueName)).size;
  const venueGroups: GroupedCheckins = groupBy(validCheckins, (c) => c.course.venueName);
  const favoriteVenue = getTopFromGroup(venueGroups);

  // Group by districts
  const districtGroups: GroupedCheckins = groupBy(validCheckins, (c) => c.course.districtName);
  const topDistrict = getTopFromGroup(districtGroups);

  // Time distributions
  const weekDayDist: Record<string, number> = countBy(validCheckins, (c) => {
    return new Date(c.course.date).toLocaleDateString("en-US", { weekday: "long" });
  });

  const timeOfDayDist: Record<string, number> = countBy(validCheckins, (c) => {
    const timestamp = c.course.serviceType === "event" ? c.course.startDateTimeUTC : c.created;
    return getTimeOfDay(new Date(timestamp));
  });

  // Initialize the distribution with all months set to 0
  const monthlyDist = monthOrder.reduce(
    (acc, month) => {
      acc[month] = 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Count the actual checkins
  validCheckins.forEach((c) => {
    const month = new Date(c.course.date).toLocaleDateString("en-US", { month: "long" });
    monthlyDist[month]++;
  });

  // Days of month distribution
  const daysOfMonth: Record<string, number[]> = {};
  validCheckins.forEach((checkin) => {
    const date = new Date(checkin.course.startDateTimeUTC);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    if (!daysOfMonth[month]) daysOfMonth[month] = [];
    daysOfMonth[month].push(date.getDate());
    daysOfMonth[month].sort((a, b) => a - b);
  });

  // Calculate streak
  const checkinDates = validCheckins.map((c) => new Date(c.course.date));
  const streakInfo = calculateStreak(checkinDates);

  return {
    year,
    checkins: {
      total: validCheckins.length,
    },
    events: {
      total: events.length,
      totalHours: eventHours,
    },
    freeTraining: {
      total: freeTraining.length,
    },
    categories: {
      count: categoryCount,
      favorite: favoriteCategory ? favoriteCategory[0] : "",
      favoriteIcon: favoriteCategory ? favoriteCategory[1][0].course.category.icon : "",
      favoriteCheckins: favoriteCategoryCheckins,
      notableMentions: favoriteCategory
        ? getNotableMentions(categoryGroups, favoriteCategory[0])
        : [],
    },
    courses: {
      count: courseCount,
      favorite: favoriteCourse ? favoriteCourse[0] : "",
      favoriteCover:
        favoriteCourse && favoriteCourse[1][0].course.covers?.length
          ? favoriteCourse[1][0].course.covers[0].original
          : "",
      notableMentions: favoriteCourse ? getNotableMentions(courseGroups, favoriteCourse[0]) : [],
    },
    venues: {
      count: venueCount,
      favorite: favoriteVenue ? favoriteVenue[0] : "",
      notableMentions: favoriteVenue ? getNotableMentions(venueGroups, favoriteVenue[0]) : [],
    },
    locations: {
      topDistrict: topDistrict ? topDistrict[0] : "",
      notableMentions: topDistrict ? getNotableMentions(districtGroups, topDistrict[0]) : [],
    },
    weekDayDistribution: weekDayDist,
    timeOfDayDistribution: timeOfDayDist,
    monthlyDistribution: monthlyDist,
    daysOfMonth,
    longestStreak: streakInfo,
  };
};
