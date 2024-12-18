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
      averageClassDuration: number;
      totalHoursSpent: number;
      busiest: {
        day: string;
        month: string;
        weekday: string;
      };
    };
    streaks: {
      current: number;
      longest: number;
    };
    categories: {
      total: number;
      favorite: string;
      percentageInFavorite: number;
      favoriteIcon: string;
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
  };
}

export default CheckinStats;
