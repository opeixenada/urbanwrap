"use client";

import React from "react";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import Checkin from "@/types/Checkin";
import NextImage from "next/image";

interface CheckinCardProps {
  checkin: Checkin;
}

export const CheckinCard: React.FC<CheckinCardProps> = ({ checkin }) => {
  const startTime = new Date(checkin.course.startDateTimeUTC).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(checkin.course.endDateTimeUTC).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const checkinTime = new Date(checkin.created).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "CHECKEDIN":
        return { text: "Attended", bgColor: "bg-green-500" };
      case "LATE":
        return { text: "Late Cancel", bgColor: "bg-yellow-500" };
      case "NOSHOW":
        return { text: "No Show", bgColor: "bg-red-500" };
      default:
        return { text: status, bgColor: "bg-gray-500" };
    }
  };

  const getServiceTypeDisplay = (serviceType: string) => {
    switch (serviceType) {
      case "free_training":
        return { text: "Free Training", bgColor: "bg-yellow-500" };
      case "hidden_free_training":
        return { text: "Free Training", bgColor: "bg-yellow-500" };
      case "event":
        return { text: "Event", bgColor: "bg-yellow-500" };
      default:
        return { text: serviceType, bgColor: "bg-gray-500" };
    }
  };

  const statusInfo = getStatusDisplay(checkin.status);
  const serviceTypeInfo = getServiceTypeDisplay(checkin.course.serviceType);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
      <div className="relative h-48">
        {checkin.course.covers?.[0]?.original ? (
          <NextImage
            src={checkin.course.covers[0].original}
            alt={checkin.course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
            No image available
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          {checkin.course.isOnline ? (
            <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">Online</span>
          ) : (
            <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
              In Person
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${serviceTypeInfo.bgColor}`}
          >
            {serviceTypeInfo.text}
          </span>
          {checkin.course.isPlusCheckin ? (
            <span className="rounded-full bg-purple-500 px-2 py-1 text-xs text-white">Plus</span>
          ) : null}
        </div>
        <div className="absolute bottom-2 left-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${statusInfo.bgColor}`}
          >
            {statusInfo.text}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold">{checkin.course.title}</h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(checkin.course.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {checkin.course.serviceType === "event" ? (
              <span>
                {startTime} - {endTime}
              </span>
            ) : (
              <span>{checkinTime}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>
              {checkin.course.venueName}
              <br />
              <span className="text-xs">
                {checkin.course.cityName}, {checkin.course.districtName}
                <br />
                {checkin.course.venueFullAddress}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>{checkin.course.category.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
