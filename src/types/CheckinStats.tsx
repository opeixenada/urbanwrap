'use client';

interface CheckinStats {
  categories: { [key: string]: number };
  venues: { [key: string]: number };
  topVenueClasses: { [key: string]: number };
  insights: {
    totalCheckins: number;
    uniqueClasses: number;
    uniqueVenues: number;
    attendance: {
      checkedIn: number;
      late: number;
      noShow: number;
      percentOnTime: number;
    };
    locations: {
      topCity: string;
      topDistrict: string;
      citiesVisited: number;
      districtsVisited: number;
    };
    timing: {
      favoriteTimeOfDay: string;
      totalHoursSpent: number;
      busiest: {
        day: string;
        month: string;
        weekday: string;
      };
      distribution: {
        earlyBird: number;
        afternoon: number;
        evening: number;
        nightOwl: number;
      };
    };
    streaks: {
      longest: number;
    };
    categories: {
      total: number;
      favorite: string;
      percentageInFavorite: number;
      favoriteIcon: string;
      hoursInFavorite: number;
      topClasses: { [key: string]: number };
    };
    online: {
      totalOnline: number;
      totalInPerson: number;
      percentageOnline: number;
      percentageInPerson: number;
    };
    plus: {
      totalPlusCheckins: number;
      percentagePlusCheckins: number;
    };
    recommendations: string[];
  };
}

export default CheckinStats;
