'use client';

interface CheckinStats {
  classes: { [key: string]: number };
  venues: { [key: string]: number };
  categories: { [key: string]: number };
  statuses: { [key: string]: number };
}

export default CheckinStats;
