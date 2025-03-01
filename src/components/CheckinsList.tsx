import React from "react";
import Checkin from "@/types/Checkin";
import { CheckinCard } from "@/components/CheckinCard";

interface CheckinsListProps {
  checkins: Checkin[];
  onJsonView: (checkin: Checkin) => void;
}

export const CheckinsList = ({ checkins, onJsonView }: CheckinsListProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {checkins.map((checkin, index) => (
      <div key={index} className="group relative">
        <CheckinCard checkin={checkin} />
        <button
          onClick={() => onJsonView(checkin)}
          className="absolute top-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          View JSON
        </button>
      </div>
    ))}
  </div>
);
