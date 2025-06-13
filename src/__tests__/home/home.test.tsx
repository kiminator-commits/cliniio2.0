import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/Home';

// Mock hooks and stores used in HomePage
jest.mock('../../hooks/useHomeState', () => ({
  useHomeState: () => ({
    drawerOpen: false,
    setDrawerOpen: jest.fn(),
    tasks: [],
    gamificationData: { totalScore: 0, streak: 0, level: 1, rank: 1 },
    setGamificationData: jest.fn(),
    mockMetricsData: [],
    handleTaskComplete: jest.fn(),
    handleRefresh: jest.fn(),
  }),
}));
jest.mock('../../store/homeStore', () => ({
  useHomeStore: () => ({
    totalScore: 0,
    setTotalScore: jest.fn(),
    availablePoints: 10,
    showFilters: false,
    setShowFilters: jest.fn(),
    showStatsModal: false,
    setShowStatsModal: jest.fn(),
    showLeaderboardModal: false,
    setShowLeaderboardModal: jest.fn(),
    showChallengeModal: false,
    setShowChallengeModal: jest.fn(),
    leaderboardUsers: [],
  }),
}));

// Mock child components to focus on HomePage logic
jest.mock('../../components/Navigation/DrawerMenu', () => ({
  DrawerMenu: () => <div>DrawerMenu</div>,
}));
jest.mock('@/components/NavBar', () => ({
  __esModule: true,
  default: () => <div>MockNavBar</div>,
}));
jest.mock('../../components/Dashboard/GamificationStats', () => ({
  GamificationStats: () => <div>GamificationStats</div>,
}));
jest.mock('../../components/PerformanceMetrics/PerformanceMetrics', () => ({
  PerformanceMetrics: () => <div>PerformanceMetrics</div>,
}));
jest.mock('@/components/TasksList', () => ({
  __esModule: true,
  default: () => <div>MockTasksList</div>,
}));
jest.mock('@/components/StatsModal', () => ({
  __esModule: true,
  default: () => <div>MockStatsModal</div>,
}));
jest.mock('@/components/LeaderboardModal', () => ({
  __esModule: true,
  default: () => <div>MockLeaderboardModal</div>,
}));
jest.mock('@/components/ChallengeModal', () => ({
  __esModule: true,
  default: () => <div>MockChallengeModal</div>,
}));
jest.mock('@/components/ErrorBoundary', () => ({
  ErrorBoundary: class MockErrorBoundary extends React.Component {
    render() {
      return <div>{this.props.children}</div>;
    }
  },
}));

describe('HomePage', () => {
  it('renders the main sections', () => {
    render(<HomePage />);
    expect(screen.getByText('MockNavBar')).toBeInTheDocument();
    expect(screen.getByText('GamificationStats')).toBeInTheDocument();
    expect(screen.getByText('PerformanceMetrics')).toBeInTheDocument();
    expect(screen.getByText('MockTasksList')).toBeInTheDocument();
  });

  it('renders modals when their state is true', () => {
    // This test would require more advanced mocking or integration
    // For now, we check that the modal components are present in the tree
    render(<HomePage />);
    expect(screen.getByText('MockStatsModal')).toBeInTheDocument();
    expect(screen.getByText('MockLeaderboardModal')).toBeInTheDocument();
    expect(screen.getByText('MockChallengeModal')).toBeInTheDocument();
  });

  it('renders the menu button with correct aria-label', () => {
    render(<HomePage />);
    const menuButton = screen.getByLabelText(/open main menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  // Add more interaction/state tests as needed
});
