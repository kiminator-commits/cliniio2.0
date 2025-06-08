import React, { useState } from "react";
import EnvironmentalCleaningHeader from "../../components/EnvironmentalCleaning/EnvironmentalCleaningHeader";
import { HOME_UI_CONSTANTS } from "../../constants/homeUiConstants";
import CleaningMetricsCard from "../../components/EnvironmentalCleaning/CleaningMetricsCard";
import ScheduleSummaryCard from "../../components/EnvironmentalCleaning/ScheduleSummaryCard";
import TaskSummaryCard from "../../components/EnvironmentalCleaning/TaskSummaryCard";
import {
  CleaningMetrics,
  ScheduleSummary,
  TaskSummary
} from "../../types/EnvironmentalCleaningTypes";

const EnvironmentalCleaningPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const marginLeft = isDrawerOpen
    ? HOME_UI_CONSTANTS.NAV_BAR_MARGIN_LEFT_DRAWER_OPEN
    : HOME_UI_CONSTANTS.NAV_BAR_MARGIN_LEFT_DRAWER_CLOSED;

  const dummyMetrics: CleaningMetrics = {
    totalRooms: 20,
    roomsCleaned: 12,
    roomsPending: 8,
  };

  const dummySchedule: ScheduleSummary = {
    totalScheduled: 15,
    completed: 9,
    remaining: 6,
  };

  const dummyTasks: TaskSummary = {
    totalTasks: 40,
    completedTasks: 25,
    pendingTasks: 15,
  };

  return (
    <div style={{ marginLeft }} className="transition-all duration-300 min-h-screen bg-gray-50">
      <EnvironmentalCleaningHeader isDrawerOpen={isDrawerOpen} />
      <div className="mt-24 p-6">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="mb-6 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
        >
          Toggle Drawer (Temp)
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CleaningMetricsCard metrics={dummyMetrics} />
          <ScheduleSummaryCard schedule={dummySchedule} />
          <TaskSummaryCard tasks={dummyTasks} />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalCleaningPage; 