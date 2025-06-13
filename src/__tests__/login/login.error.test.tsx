import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../components/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('displays fallback UI when error occurs', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
