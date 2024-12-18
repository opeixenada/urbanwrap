import Checkin from '@/types/Checkin';
import CheckinStats from '@/types/CheckinStats';

const countTop = (
  items: Checkin[],
  getKey: (item: Checkin) => string
): { [key: string]: number } => {
  const counts = items.reduce(
    (acc, item) => {
      const key = getKey(item);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return Object.fromEntries(
    Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
  );
};

const getClassesForVenue = (checkins: Checkin[], venueName: string): { [key: string]: number } => {
  const venueCheckins = checkins.filter((checkin) => checkin.course.venueName === venueName);
  return countTop(venueCheckins, (checkin) => checkin.course.title);
};

const getTimeOfDay = (utcDateStr: string): string => {
  // Convert UTC to local time for accurate time-of-day classification
  const localDate = new Date(utcDateStr);
  const hour = localDate.getHours();

  if (hour < 6) return 'Night Owl (12AM-6AM)';
  if (hour < 12) return 'Early Bird (6AM-12PM)';
  if (hour < 17) return 'Afternoon Enthusiast (12PM-5PM)';
  return 'Evening Warrior (5PM-12AM)';
};

const calculateStreaks = (checkins: Checkin[]): { current: number; longest: number } => {
  if (checkins.length === 0) return { current: 0, longest: 0 };

  const sortedDates = checkins
    .map((checkin) => new Date(checkin.course.date).toISOString().split('T')[0])
    .sort()
    .filter((date, index, array) => array.indexOf(date) === index);

  if (sortedDates.length === 1) return { current: 1, longest: 1 };

  let currentStreak = 0;
  let longestStreak = 0;
  let currentCount = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      currentCount = 1;
      continue;
    }

    const prev = new Date(sortedDates[i - 1]);
    const curr = new Date(sortedDates[i]);
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 3600 * 24);

    if (diffDays === 1) {
      currentCount++;
    } else {
      longestStreak = Math.max(longestStreak, currentCount);
      currentCount = 1;
    }
  }

  // Update longest streak one final time in case the current streak is the longest
  longestStreak = Math.max(longestStreak, currentCount);
  currentStreak = currentCount;

  return { current: currentStreak, longest: longestStreak };
};

const calculateClassDuration = (startUTC: string, endUTC: string): number => {
  const start = new Date(startUTC);
  const end = new Date(endUTC);
  return (end.getTime() - start.getTime()) / (1000 * 60); // Duration in minutes
};

const calculateTimeDistribution = (checkins: Checkin[]) => {
  const distribution = {
    earlyBird: 0,
    afternoon: 0,
    evening: 0,
    nightOwl: 0,
  };

  checkins.forEach((checkin) => {
    const hour = new Date(checkin.course.startDateTimeUTC).getHours();
    if (hour >= 6 && hour < 12) distribution.earlyBird++;
    else if (hour >= 12 && hour < 17) distribution.afternoon++;
    else if (hour >= 17 && hour < 24) distribution.evening++;
    else distribution.nightOwl++;
  });

  // Convert to percentages
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  return {
    earlyBird: Math.round((distribution.earlyBird / total) * 100),
    afternoon: Math.round((distribution.afternoon / total) * 100),
    evening: Math.round((distribution.evening / total) * 100),
    nightOwl: Math.round((distribution.nightOwl / total) * 100),
  };
};

const calculateHoursInCategory = (checkins: Checkin[], categoryName: string): number => {
  const categoryCheckins = checkins.filter(
    (checkin) => checkin.course.category.name === categoryName
  );

  const totalMinutes = categoryCheckins.reduce((total, checkin) => {
    const start = new Date(checkin.course.startDateTimeUTC);
    const end = new Date(checkin.course.endDateTimeUTC);
    return total + (end.getTime() - start.getTime()) / (1000 * 60);
  }, 0);

  return Math.round(totalMinutes / 60);
};

const generateRecommendations = (checkins: Checkin[]): string[] => {
  const recommendations: string[] = [];

  // Time-based recommendations
  const timeDistribution = calculateTimeDistribution(checkins);
  if (timeDistribution.earlyBird < 20) {
    recommendations.push('Try more morning classes to energize your day');
  }

  // Category diversity recommendations
  const uniqueCategories = new Set(checkins.map((c) => c.course.category.name));
  if (uniqueCategories.size < 5) {
    recommendations.push('Explore more class varieties to diversify your routine');
  }

  // Venue diversity recommendations
  const uniqueVenues = new Set(checkins.map((c) => c.course.venueName));
  if (uniqueVenues.size < 3) {
    recommendations.push('Visit new venues to keep your workout exciting');
  }

  // Online/In-person balance
  const onlinePercentage = checkins.filter((c) => c.course.isOnline === 1).length / checkins.length;
  if (onlinePercentage > 0.8) {
    recommendations.push('Consider trying more in-person classes for a different experience');
  } else if (onlinePercentage < 0.2) {
    recommendations.push('Online classes could add flexibility to your schedule');
  }

  // Ensure we always return at least one recommendation
  if (recommendations.length === 0) {
    recommendations.push('Keep up your amazing workout consistency!');
  }

  return recommendations;
};

export const calculateStats = (checkins: Checkin[]): CheckinStats => {
  const checkedInOnly = checkins.filter((checkin) => checkin.status === 'CHECKEDIN');

  // Calculate base stats (keep existing calculations)
  const venues = countTop(checkedInOnly, (checkin) => checkin.course.venueName);
  const mostVisitedVenue = Object.keys(venues)[0];
  const categories = countTop(checkedInOnly, (checkin) => checkin.course.category.name);
  const favoriteCategory = Object.keys(categories)[0];

  // Get unique sets
  const uniqueClasses = new Set(checkedInOnly.map((c) => c.course.title));
  const uniqueVenues = new Set(checkedInOnly.map((c) => c.course.venueName));
  const uniqueCities = new Set(checkedInOnly.map((c) => c.course.cityName));
  const uniqueDistricts = new Set(checkedInOnly.map((c) => c.course.districtName));

  // Time analysis with local time
  const timeOfDayCounts: { [key: string]: number } = {};
  const daysCounts: { [key: string]: number } = {};
  const monthsCounts: { [key: string]: number } = {};
  const weekdayCounts: { [key: string]: number } = {};
  let totalDuration = 0;

  checkedInOnly.forEach((checkin) => {
    const timeOfDay = getTimeOfDay(checkin.course.startDateTimeUTC);
    const localDate = new Date(checkin.course.startDateTimeUTC);

    const day = localDate.toLocaleDateString('en-US', { day: '2-digit' });
    const month = localDate.toLocaleDateString('en-US', { month: 'long' });
    const weekday = localDate.toLocaleDateString('en-US', { weekday: 'long' });

    timeOfDayCounts[timeOfDay] = (timeOfDayCounts[timeOfDay] || 0) + 1;
    daysCounts[day] = (daysCounts[day] || 0) + 1;
    monthsCounts[month] = (monthsCounts[month] || 0) + 1;
    weekdayCounts[weekday] = (weekdayCounts[weekday] || 0) + 1;

    totalDuration += calculateClassDuration(
      checkin.course.startDateTimeUTC,
      checkin.course.endDateTimeUTC
    );
  });

  // Attendance analysis
  const totalLate = checkins.filter((c) => c.status === 'LATE').length;
  const totalNoShow = checkins.filter((c) => c.status === 'NOSHOW').length;
  const percentOnTime = (checkedInOnly.length / checkins.length) * 100;

  // Online vs In-person analysis
  const onlineClasses = checkedInOnly.filter((c) => c.course.isOnline === 1);
  const inPersonClasses = checkedInOnly.filter((c) => c.course.isOnline === 0);
  const plusCheckins = checkedInOnly.filter((c) => c.course.isPlusCheckin === 1);

  // Location analysis
  const cityCounts = countTop(checkedInOnly, (c) => c.course.cityName);
  const districtCounts = countTop(checkedInOnly, (c) => c.course.districtName);

  // More stats
  const timeDistribution = calculateTimeDistribution(checkedInOnly);
  const hoursInFavorite = calculateHoursInCategory(checkedInOnly, favoriteCategory);
  const recommendations = generateRecommendations(checkedInOnly);

  return {
    categories,
    venues,
    topVenueClasses: getClassesForVenue(checkedInOnly, mostVisitedVenue),
    insights: {
      totalCheckins: checkedInOnly.length,
      uniqueClasses: uniqueClasses.size,
      uniqueVenues: uniqueVenues.size,
      attendance: {
        checkedIn: checkedInOnly.length,
        late: totalLate,
        noShow: totalNoShow,
        percentOnTime: Math.round(percentOnTime),
      },
      locations: {
        topCity: Object.keys(cityCounts)[0],
        topDistrict: Object.keys(districtCounts)[0],
        citiesVisited: uniqueCities.size,
        districtsVisited: uniqueDistricts.size,
      },
      timing: {
        favoriteTimeOfDay: getTimeOfDay(checkedInOnly[0].course.startDateTimeUTC),
        averageClassDuration: Math.round(totalDuration / checkedInOnly.length),
        totalHoursSpent: Math.round(totalDuration / 60),
        busiest: {
          day: Object.entries(daysCounts).sort(([, a], [, b]) => b - a)[0][0],
          month: Object.entries(monthsCounts).sort(([, a], [, b]) => b - a)[0][0],
          weekday: Object.entries(weekdayCounts).sort(([, a], [, b]) => b - a)[0][0],
        },
        distribution: timeDistribution,
      },
      streaks: calculateStreaks(checkedInOnly),
      categories: {
        total: uniqueClasses.size,
        favorite: favoriteCategory,
        percentageInFavorite: Math.round(
          (categories[favoriteCategory] / checkedInOnly.length) * 100
        ),
        favoriteIcon:
          checkedInOnly.find((c) => c.course.category.name === favoriteCategory)?.course.category
            .icon || '',
        hoursInFavorite,
      },
      online: {
        totalOnline: onlineClasses.length,
        totalInPerson: inPersonClasses.length,
        percentageOnline: Math.round((onlineClasses.length / checkedInOnly.length) * 100),
        percentageInPerson: Math.round((inPersonClasses.length / checkedInOnly.length) * 100),
      },
      plus: {
        totalPlusCheckins: plusCheckins.length,
        percentagePlusCheckins: Math.round((plusCheckins.length / checkedInOnly.length) * 100),
      },
      recommendations,
    },
  };
};
