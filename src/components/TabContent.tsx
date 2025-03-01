import Checkin from "@/types/Checkin";
import React from "react";
import { YearSummary } from "@/components/summary/YearSummary";
import { TabButton } from "@/components/TabButton";
import { CheckinsList } from "@/components/CheckinsList";

interface TabContentProps {
  activeTab: "summary" | "checkins";
  onTabChange: (tab: "summary" | "checkins") => void;
  checkins: Checkin[];
  onJsonView: (checkin: Checkin) => void;
}

export const TabContent = ({ activeTab, onTabChange, checkins, onJsonView }: TabContentProps) => (
  <div className="mb-6">
    <div className="mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-700">
      <TabButton active={activeTab === "summary"} onClick={() => onTabChange("summary")}>
        Summary
      </TabButton>
      <TabButton active={activeTab === "checkins"} onClick={() => onTabChange("checkins")}>
        Check-ins
      </TabButton>
    </div>

    {/* Summary tab content */}
    <div className={activeTab === "summary" ? "block" : "hidden"}>
      <YearSummary checkins={checkins} />
    </div>

    {/* Checkins tab content */}
    <div className={activeTab === "checkins" ? "block" : "hidden"}>
      <CheckinsList checkins={checkins} onJsonView={onJsonView} />
    </div>
  </div>
);
