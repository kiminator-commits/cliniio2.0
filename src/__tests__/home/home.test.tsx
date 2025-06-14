import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/Home';

// Mock hooks and stores used in HomePage
jest.mock('../../hooks/useHomeState', () => ({
  useHomeState: () => ({
    storeAvailablePoints: 20,
    storeShowFilters: true,
    storeTasks: [{ id: 1, name: 'Sample Task', completed: false }],
    storeMetrics: [{ metric: 'SampleMetric', value: 85 }],
  }),
}));

// Mock child components to focus on HomePage logic
jest.mock('../../pages/Home/components/DashboardHeader', () => ({
  DashboardHeader: () => <div data-testid="dashboard-header">MockDashboardHeader</div>,
}));

jest.mock('../../pages/Home/components/TasksPanel', () => ({
  TasksPanel: () => <div data-testid="tasks-panel">MockTasksPanel</div>,
}));

jest.mock('../../pages/Home/components/MetricsPanel', () => ({
  MetricsPanel: () => <div data-testid="metrics-panel">MockMetricsPanel</div>,
}));

describe('HomePage', () => {
  it('renders the main sections', async () => {
    await act(async () => {
      render(<HomePage />);
    });

    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    expect(screen.getByTestId('tasks-panel')).toBeInTheDocument();
    expect(screen.getByTestId('metrics-panel')).toBeInTheDocument();
  });
});
