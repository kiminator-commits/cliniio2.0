import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('displays fallback UI when error occurs', async () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    await act(async () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
