import React, { useState } from 'react';
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

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tasks, setTasks] = useState(sampleTasks);
  const [availablePoints, setAvailablePoints] = useState(250); // Initial available points

  // Menu icon width + desired gap (12px + 60px)
  const navBarMarginLeft = drawerOpen ? 24 : 72;
  // Top margin to align with Cliniio logo (e.g., 24px)
  const navBarMarginTop = 24;

  // Mock data - replace with real data from your backend
  const mockGamificationData = {
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

  const mockLeaderboardData = {
    rank: 1,
    topUsers: [
      { name: 'You', score: 1779, avatar: 'YO' },
      { name: 'Sarah Johnson', score: 1250, avatar: 'SJ' },
      { name: 'Mike Chen', score: 1180, avatar: 'MC' },
      { name: 'Emma Davis', score: 1150, avatar: 'ED' },
      { name: 'Alex Wong', score: 1120, avatar: 'AW' },
    ],
  };

  const mockMetricsData = {
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

  const handleTaskComplete = (taskId: string, points: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed', completed: true } : task
      )
    );
    // Subtract points from available points
    setAvailablePoints((prevPoints) => Math.max(0, prevPoints - points));
    // Add points to total score
    setGamificationData((prevData) => ({
      ...prevData,
      totalScore: prevData.totalScore + points,
    }));
  };

  const handleRefresh = () => {
    // Refresh tasks logic here
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {drawerOpen && <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />}
      <div className="flex-1 border-l-4 border-teal-400">
        {!drawerOpen && (
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              position: 'fixed',
              top: 24,
              left: 12, // about 0.5 inch from the left edge
              zIndex: 50,
              background: '#4ECDC4',
              color: 'white',
              borderRadius: '0 8px 8px 0',
              padding: '12px 8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Open main menu"
          >
            <FaBars size={20} />
          </button>
        )}
        <div style={{ marginLeft: navBarMarginLeft, marginTop: navBarMarginTop }}>
          <NavBar
            onStatsClick={() => setIsStatsModalOpen(true)}
            onLeaderboardClick={() => setIsLeaderboardModalOpen(true)}
            onChallengeClick={() => setIsChallengeModalOpen(true)}
          />
          <div className="p-6">
            <GamificationStats gamificationData={gamificationData} />
            <div className="flex gap-6 mt-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#4ECDC4] border-opacity-50 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-100 rounded-md p-1">
                      <Icon path={mdiClipboardText} size={1} color="#4ECDC4" />
                    </span>
                    <h2 className="text-lg font-semibold text-[#38b2ac]">Daily Operations Tasks</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hidden sm:inline-block">
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
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#4ECDC4] border-opacity-50 flex-1">
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
