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

export const calculateStats = (checkins: Checkin[]): CheckinStats => {
  const checkedInOnly = checkins.filter((checkin) => checkin.status === 'CHECKEDIN');

  return {
    classes: countTop(checkedInOnly, (checkin) => checkin.course.title),
    venues: countTop(checkedInOnly, (checkin) => checkin.course.venueName),
    categories: countTop(checkedInOnly, (checkin) => checkin.course.category.name),
    statuses: countTop(checkins, (checkin) => checkin.status),
  };
};
