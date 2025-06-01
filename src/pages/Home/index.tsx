import React, { useState } from 'react';
import { DrawerMenu } from '../../components/Navigation/DrawerMenu';
import NavBar from '../../components/NavBar';
import { FaBars } from 'react-icons/fa';
import StatsModal from '../../components/StatsModal';
import LeaderboardModal from '../../components/LeaderboardModal';
import ChallengeModal from '../../components/ChallengeModal';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  // Menu icon width + desired gap (12px + 60px)
  const navBarMarginLeft = drawerOpen ? 24 : 72;
  // Top margin to align with Cliniio logo (e.g., 24px)
  const navBarMarginTop = 24;

  // Mock data - replace with real data from your backend
  const mockGamificationData = {
    stats: {
      toolsSterilized: 150,
      inventoryChecks: 45,
      perfectDays: 12,
      totalTasks: 200,
      completedTasks: 180,
      currentStreak: 5,
      bestStreak: 8
    }
  };

  const mockLeaderboardData = {
    rank: 3,
    topUsers: [
      { name: "Sarah Johnson", score: 1250, avatar: "SJ" },
      { name: "Mike Chen", score: 1180, avatar: "MC" },
      { name: "Emma Davis", score: 1150, avatar: "ED" },
      { name: "Alex Wong", score: 1120, avatar: "AW" },
      { name: "Lisa Brown", score: 1100, avatar: "LB" }
    ]
  };

  const mockChallengeData = {
    title: 'Daily Challenge',
    description: 'Complete all assigned tasks with 100% accuracy',
    reward: '50 points',
    difficulty: 'Medium'
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {drawerOpen && (
        <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      )}
      <div className="flex-1">
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
        </div>
      </div>

      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        gamificationData={mockGamificationData}
      />

      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        gamificationData={mockLeaderboardData}
      />

      <ChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        dailyChallenge={mockChallengeData}
      />
    </div>
  );
}
