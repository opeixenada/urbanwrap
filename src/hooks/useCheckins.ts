import { useState } from "react";
import Checkin from "@/types/Checkin";

export const useCheckins = () => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCheckins = async (token: string, year: number) => {
    setLoading(true);
    setError("");

    try {
      let allRecords: Checkin[] = [];
      let page = 1;
      const pageSize = 100;
      const cutoffDate = new Date(year - 1, 12, 1); // December 1st of previous year

      while (true) {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            page,
            pageSize,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(`HTTP error! Status: ${response.status}`);
          return;
        }

        if (!data.success || !data.data) {
          break;
        }

        const processedRecords = data.data
          .filter((item: Checkin) => item.course)
          .filter((item: Checkin) => new Date(item.course.date).getFullYear() === year);

        // Check if the last record is too old
        const lastRecord = data.data[data.data.length - 1];
        if (lastRecord && new Date(lastRecord.created) < cutoffDate) {
          allRecords = [...allRecords, ...processedRecords];
          break;
        }

        allRecords = [...allRecords, ...processedRecords];

        if (data.data.length < pageSize) {
          break;
        }

        page++;
      }

      // Sort by date descending
      allRecords.sort(
        (a, b) => new Date(b.course.date).getTime() - new Date(a.course.date).getTime(),
      );
      setCheckins(allRecords);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { checkins, isLoading: loading, error, fetchCheckins };
};
