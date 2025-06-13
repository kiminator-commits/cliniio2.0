import { useState, useEffect } from 'react';
import { calculateLevel } from '../utils/gamification';
import {
  mockGamificationData,
  mockLeaderboardData,
  mockMetricsData,
  mockTasks,
} from '../services/mockDataService';

export const useHomeState = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);
  const [availablePoints, setAvailablePoints] = useState(250);
  const [lastResetDate, setLastResetDate] = useState<string | null>(null);
  const [gamificationData, setGamificationData] = useState(mockGamificationData);

  const calculateAvailablePoints = () => 250;

  // Check for annual reset
  useEffect(() => {
    const checkForReset = () => {
      const now = new Date();
      const lastReset = lastResetDate ? new Date(lastResetDate) : null;

      if (!lastReset || lastReset.getFullYear() < now.getFullYear()) {
        setGamificationData(prevData => ({
          ...prevData,
          totalScore: 0,
          level: 1,
        }));
        setLastResetDate(now.toISOString());
      }
    };

    checkForReset();
  }, [lastResetDate]);

  const handleTaskComplete = (taskId: string, points: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'completed', completed: true } : task
      )
    );
    // Subtract points from available points
    setAvailablePoints(prevPoints => Math.max(0, prevPoints - points));
    // Add points to total score and update level
    setGamificationData(prevData => {
      const newTotalScore = prevData.totalScore + points;
      return {
        ...prevData,
        totalScore: newTotalScore,
        level: calculateLevel(newTotalScore),
      };
    });
  };

  const handleRefresh = () => {
    // Refresh tasks logic here
  };

  return {
    drawerOpen,
    setDrawerOpen,
    isStatsModalOpen,
    setIsStatsModalOpen,
    isLeaderboardModalOpen,
    setIsLeaderboardModalOpen,
    isChallengeModalOpen,
    setIsChallengeModalOpen,
    showFilters,
    setShowFilters,
    tasks,
    availablePoints,
    gamificationData,
    setGamificationData,
    mockLeaderboardData,
    mockMetricsData,
    calculateAvailablePoints,
    handleTaskComplete,
    handleRefresh,
  };
};
