import React from 'react';
import { render, screen } from '@testing-library/react';
import { UIProvider } from '@/contexts/UIContext';
import App from '../App';

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
