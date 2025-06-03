import React, { useState, useEffect } from 'react';
import { DrawerMenu } from '../../components/Navigation/DrawerMenu';
import NavBar from '../../components/NavBar';
import { FaBars } from 'react-icons/fa';
import { mdiClipboardText, mdiFilter } from '@mdi/js';
import Icon from '@mdi/react';
import StatsModal from '../../components/StatsModal';
import LeaderboardModal from '../../components/LeaderboardModal';
import ChallengeModal from '../../components/ChallengeModal';
import { GamificationStats } from '../../components/Dashboard/GamificationStats';
import { PerformanceMetrics } from '../../components/PerformanceMetrics/PerformanceMetrics';
import TasksList from '../../components/TasksList';
import { sampleTasks } from '../../data/sampleTasks';
import { calculateLevel } from '../../utils/gamification';
import { HOME_UI_CONSTANTS } from '../../constants/homeUiConstants';
import type { GamificationStats as GamificationStatsType, LeaderboardData, MetricsData } from '../../types/homeTypes';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tasks, setTasks] = useState(sampleTasks);
  const [availablePoints, setAvailablePoints] = useState(250);
  const [lastResetDate, setLastResetDate] = useState<string | null>(null);

  // Menu icon width + desired gap (12px + 60px)
  const navBarMarginLeft = drawerOpen ? HOME_UI_CONSTANTS.NAV_BAR_MARGIN_LEFT_DRAWER_OPEN : HOME_UI_CONSTANTS.NAV_BAR_MARGIN_LEFT_DRAWER_CLOSED;
  // Top margin to align with Cliniio logo
  const navBarMarginTop = HOME_UI_CONSTANTS.NAV_BAR_MARGIN_TOP;

  // Mock data - replace with real data from your backend
  const mockGamificationData: GamificationStatsType = {
    streak: 7,
    level: 5,
    rank: 5,
    totalScore: 1625,
    stats: {
      toolsSterilized: 150,
      inventoryChecks: 45,
      perfectDays: 12,
      totalTasks: 200,
      completedTasks: 180,
      currentStreak: 5,
      bestStreak: 8,
    },
  };

  const [gamificationData, setGamificationData] = useState(mockGamificationData);

  const mockLeaderboardData: LeaderboardData = {
    rank: 1,
    topUsers: [
      { name: 'You', score: 1779, avatar: 'YO' },
      { name: 'Sarah Johnson', score: 1250, avatar: 'SJ' },
      { name: 'Mike Chen', score: 1180, avatar: 'MC' },
      { name: 'Emma Davis', score: 1150, avatar: 'ED' },
      { name: 'Alex Wong', score: 1120, avatar: 'AW' },
    ],
  };

  const mockMetricsData: MetricsData = {
    timeSaved: {
      daily: 2.5,
      monthly: 45.8,
    },
    costSavings: {
      monthly: 1250,
      annual: 15000,
    },
    aiEfficiency: {
      timeSavings: 15.5,
      proactiveMgmt: 22.3,
    },
    teamPerformance: {
      skills: 85,
      inventory: 92,
      sterilization: 88,
    },
  };

  const calculateAvailablePoints = () => 250;

  // Check for annual reset
  useEffect(() => {
    const checkForReset = () => {
      const now = new Date();
      const lastReset = lastResetDate ? new Date(lastResetDate) : null;

      if (!lastReset || lastReset.getFullYear() < now.getFullYear()) {
        setGamificationData((prevData) => ({
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
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed', completed: true } : task
      )
    );
    // Subtract points from available points
    setAvailablePoints((prevPoints) => Math.max(0, prevPoints - points));
    // Add points to total score and update level
    setGamificationData((prevData) => {
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

  return (
    <div className={`flex min-h-screen bg-gradient-to-br from-${HOME_UI_CONSTANTS.COLORS.BG_GRADIENT.FROM} to-${HOME_UI_CONSTANTS.COLORS.BG_GRADIENT.TO}`}>
      {drawerOpen && <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />}
      <div className={`flex-1 border-l-${HOME_UI_CONSTANTS.BORDER.LEFT_WIDTH} border-${HOME_UI_CONSTANTS.COLORS.BORDER}`}>
        {!drawerOpen && (
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              position: 'fixed',
              top: HOME_UI_CONSTANTS.MENU_BUTTON.TOP,
              left: HOME_UI_CONSTANTS.MENU_BUTTON.LEFT,
              zIndex: HOME_UI_CONSTANTS.MENU_BUTTON.Z_INDEX,
              background: HOME_UI_CONSTANTS.MENU_BUTTON.BACKGROUND,
              color: HOME_UI_CONSTANTS.MENU_BUTTON.COLOR,
              borderRadius: HOME_UI_CONSTANTS.MENU_BUTTON.BORDER_RADIUS,
              padding: HOME_UI_CONSTANTS.MENU_BUTTON.PADDING,
              boxShadow: HOME_UI_CONSTANTS.MENU_BUTTON.BOX_SHADOW,
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Open main menu"
          >
            <FaBars size={HOME_UI_CONSTANTS.MENU_BUTTON.ICON_SIZE} />
          </button>
        )}
        <div style={{ marginLeft: navBarMarginLeft, marginTop: navBarMarginTop }}>
          <NavBar
            onStatsClick={() => setIsStatsModalOpen(true)}
            onLeaderboardClick={() => setIsLeaderboardModalOpen(true)}
            onChallengeClick={() => setIsChallengeModalOpen(true)}
          />
          <div className={`p-${HOME_UI_CONSTANTS.SPACING.PADDING}`}>
            <GamificationStats gamificationData={gamificationData} />
            <div className={`flex gap-${HOME_UI_CONSTANTS.SPACING.GAP} mt-${HOME_UI_CONSTANTS.SPACING.MARGIN_TOP}`}>
              <div className={`bg-white rounded-${HOME_UI_CONSTANTS.BORDER.RADIUS} shadow-${HOME_UI_CONSTANTS.SHADOW} p-${HOME_UI_CONSTANTS.SPACING.PADDING} border-l-${HOME_UI_CONSTANTS.BORDER.LEFT_WIDTH} border-[${HOME_UI_CONSTANTS.COLORS.PRIMARY}] border-opacity-${HOME_UI_CONSTANTS.COLORS.BORDER_OPACITY} flex-1`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`bg-${HOME_UI_CONSTANTS.COLORS.PRIMARY_BG} rounded-md p-1`}>
                      <Icon path={mdiClipboardText} size={1} color={HOME_UI_CONSTANTS.COLORS.PRIMARY} />
                    </span>
                    <h2 className={`text-lg font-semibold text-[${HOME_UI_CONSTANTS.COLORS.TEXT_PRIMARY}]`}>Daily Operations Tasks</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-sm ${HOME_UI_CONSTANTS.COLORS.TEXT_SECONDARY} border border-gray-300 rounded-${HOME_UI_CONSTANTS.BORDER.RADIUS} hidden sm:inline-block`}>
                      Available: {availablePoints} Points
                    </span>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 flex items-center"
                    >
                      <Icon path={mdiFilter} size={0.8} />
                      <span className="ml-1 text-sm hidden sm:inline-block">Filter</span>
                    </button>
                  </div>
                </div>
                <TasksList
                  tasks={tasks}
                  onTaskComplete={handleTaskComplete}
                  onRefresh={handleRefresh}
                  showFilters={showFilters}
                />
              </div>
              <div className={`bg-white rounded-${HOME_UI_CONSTANTS.BORDER.RADIUS} shadow-${HOME_UI_CONSTANTS.SHADOW} p-${HOME_UI_CONSTANTS.SPACING.PADDING} border-l-${HOME_UI_CONSTANTS.BORDER.LEFT_WIDTH} border-[${HOME_UI_CONSTANTS.COLORS.PRIMARY}] border-opacity-${HOME_UI_CONSTANTS.COLORS.BORDER_OPACITY} flex-1`}>
                <PerformanceMetrics
                  metrics={mockMetricsData}
                  calculateAvailablePoints={calculateAvailablePoints}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        gamificationData={gamificationData}
      />

      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        gamificationData={mockLeaderboardData}
      />

      <ChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        onChallengeComplete={(points) => {
          setGamificationData((prevData) => ({
            ...prevData,
            totalScore: prevData.totalScore + points,
          }));
        }}
      />
    </div>
  );
}
