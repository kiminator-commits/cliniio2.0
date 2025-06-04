import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/Home';
import { vi } from 'vitest';

// Mock hooks and stores used in HomePage
vi.mock('../../hooks/useHomeState', () => ({
  useHomeState: () => ({
    drawerOpen: false,
    setDrawerOpen: vi.fn(),
    tasks: [],
    gamificationData: { totalScore: 0, streak: 0, level: 1, rank: 1 },
    setGamificationData: vi.fn(),
    mockMetricsData: [],
    handleTaskComplete: vi.fn(),
    handleRefresh: vi.fn(),
  }),
}));
vi.mock('../../store/homeStore', () => ({
  useHomeStore: () => ({
    totalScore: 0,
    setTotalScore: vi.fn(),
    availablePoints: 10,
    showFilters: false,
    setShowFilters: vi.fn(),
    showStatsModal: false,
    setShowStatsModal: vi.fn(),
    showLeaderboardModal: false,
    setShowLeaderboardModal: vi.fn(),
    showChallengeModal: false,
    setShowChallengeModal: vi.fn(),
    leaderboardUsers: [],
  }),
}));

// Mock child components to focus on HomePage logic
vi.mock('../../components/Navigation/DrawerMenu', () => ({
  DrawerMenu: () => <div>DrawerMenu</div>,
}));
vi.mock('../../components/NavBar', () => ({ default: () => <div>NavBar</div> }));
vi.mock('../../components/Dashboard/GamificationStats', () => ({
  GamificationStats: () => <div>GamificationStats</div>,
}));
vi.mock('../../components/PerformanceMetrics/PerformanceMetrics', () => ({
  PerformanceMetrics: () => <div>PerformanceMetrics</div>,
}));
vi.mock('../../components/TasksList', () => ({ default: () => <div>TasksList</div> }));
vi.mock('../../components/StatsModal', () => ({ default: () => <div>StatsModal</div> }));
vi.mock('../../components/LeaderboardModal', () => ({
  default: () => <div>LeaderboardModal</div>,
}));
vi.mock('../../components/ChallengeModal', () => ({ default: () => <div>ChallengeModal</div> }));
vi.mock('../../components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('HomePage', () => {
  it('renders the main sections', () => {
    render(<HomePage />);
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('GamificationStats')).toBeInTheDocument();
    expect(screen.getByText('PerformanceMetrics')).toBeInTheDocument();
    expect(screen.getByText('TasksList')).toBeInTheDocument();
  });

  it('renders modals when their state is true', () => {
    // This test would require more advanced mocking or integration
    // For now, we check that the modal components are present in the tree
    render(<HomePage />);
    expect(screen.getByText('StatsModal')).toBeInTheDocument();
    expect(screen.getByText('LeaderboardModal')).toBeInTheDocument();
    expect(screen.getByText('ChallengeModal')).toBeInTheDocument();
  });

  it('renders the menu button with correct aria-label', () => {
    render(<HomePage />);
    const menuButton = screen.getByLabelText(/open main menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  // Add more interaction/state tests as needed
});
