'use client';

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface Cover {
  thumbnail: string;
  original: string;
}

interface Course {
  id: number;
  date: string;
  title: string;
  isOnline: number;
  startDateTimeUTC: string;
  endDateTimeUTC: string;
  venueName: string;
  venueFullAddress: string;
  isPlusCheckin: number;
  cityName: string;
  districtName: string;
  category: Category;
  covers?: Cover[];
}

interface Checkin {
  id: number;
  created: string;
  updated: string;
  status: 'CHECKEDIN' | 'LATE' | 'NOSHOW' | string;
  course: Course;
}

export default Checkin;
