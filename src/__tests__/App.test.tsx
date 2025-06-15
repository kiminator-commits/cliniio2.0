import React from 'react';
import { render, screen } from '@testing-library/react';
import { UIProvider } from '@/contexts/UIContext';
import App from '../App';

jest.mock('@/components/TasksList', () => ({
  __esModule: true,
  default: () => <div data-testid="tasks-list">MockTasksList</div>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <UIProvider>
        <App />
      </UIProvider>
    );
    expect(screen.getByTestId('app-container')).toBeTruthy();
  });
});
