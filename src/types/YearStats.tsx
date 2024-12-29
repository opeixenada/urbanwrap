'use client';

export interface StreakInfo {
  length: number;
  startDate: Date | null;
}

export interface YearStats {
  year: number;
  checkins: {
    total: number;
  };
  events: {
    total: number;
    totalHours: number;
  };
  freeTraining: {
    total: number;
  };
  categories: {
    count: number;
    favorite: string;
    favoriteIcon: string;
    favoriteCheckins: number;
    notableMentions: string[];
  };
  courses: {
    count: number;
    favorite: string;
    favoriteCover: string;
    notableMentions: string[];
  };
  venues: {
    count: number;
    favorite: string;
    notableMentions: string[];
  };
  locations: {
    topDistrict: string;
    notableMentions: string[];
  };
  weekDayDistribution: {
    [key: string]: number;
  };
  timeOfDayDistribution: {
    [key: string]: number;
  };
  monthlyDistribution: {
    [key: string]: number;
  };
  daysOfMonth: {
    [key: string]: number[];
  };
  longestStreak: StreakInfo;
}
