import React, { useMemo } from 'react';
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
import { HOME_UI_CONSTANTS } from '../../constants/homeUiConstants';
import { useHomeState } from '../../hooks/useHomeState';
import { calculateNavBarMargins } from '../../utils/homeUtils';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function HomePage() {
  const {
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
  } = useHomeState();

  const { navBarMarginLeft, navBarMarginTop } = useMemo(
    () => calculateNavBarMargins(drawerOpen),
    [drawerOpen]
  );

  return (
    <ErrorBoundary>
      <div
        className={`flex min-h-screen bg-gradient-to-br from-${HOME_UI_CONSTANTS.COLORS.BG_GRADIENT.FROM} to-${HOME_UI_CONSTANTS.COLORS.BG_GRADIENT.TO} hide-scrollbar`}
      >
        {drawerOpen && <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />}
        <div
          className={`flex-1 border-l-${HOME_UI_CONSTANTS.BORDER.LEFT_WIDTH} border-${HOME_UI_CONSTANTS.COLORS.BORDER}`}
        >
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
              <div
                className={`flex gap-${HOME_UI_CONSTANTS.SPACING.GAP} mt-${HOME_UI_CONSTANTS.SPACING.MARGIN_TOP}`}
              >
                <div
                  className={`bg-white rounded-${HOME_UI_CONSTANTS.BORDER.RADIUS} shadow-${HOME_UI_CONSTANTS.SHADOW} p-${HOME_UI_CONSTANTS.SPACING.PADDING} border-l-${HOME_UI_CONSTANTS.BORDER.LEFT_WIDTH} border-[${HOME_UI_CONSTANTS.COLORS.PRIMARY}] border-opacity-${HOME_UI_CONSTANTS.COLORS.BORDER_OPACITY} flex-1`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className={`bg-${HOME_UI_CONSTANTS.COLORS.PRIMARY_BG} rounded-md p-1`}>
                        <Icon
                          path={mdiClipboardText}
                          size={1}
                          color={HOME_UI_CONSTANTS.COLORS.PRIMARY}
                        />
                      </span>
                      <h2
                        className={`text-lg font-semibold text-[${HOME_UI_CONSTANTS.COLORS.TEXT_PRIMARY}]`}
                      >
                        Daily Operations Tasks
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-sm ${HOME_UI_CONSTANTS.COLORS.TEXT_SECONDARY} border border-gray-300 rounded-${HOME_UI_CONSTANTS.BORDER.RADIUS} hidden sm:inline-block`}
                      >
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
                <div
                  className={`bg-white rounded-${HOME_UI_CONSTANTS.BORDER.RADIUS} shadow-${HOME_UI_CONSTANTS.SHADOW} p-${HOME_UI_CONSTANTS.SPACING.PADDING} border-l-${HOME_UI_CONSTANTS.BORDER.LEFT_WIDTH} border-[${HOME_UI_CONSTANTS.COLORS.PRIMARY}] border-opacity-${HOME_UI_CONSTANTS.COLORS.BORDER_OPACITY} flex-1`}
                >
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
    </ErrorBoundary>
  );
}
