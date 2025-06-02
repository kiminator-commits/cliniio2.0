import React from 'react';
import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UIProvider } from '../../contexts/UIContext';
import LoginForm from '../../pages/Login/LoginForm';

describe('LoginForm Performance', () => {
  it('renders within acceptable time', async () => {
    const start = performance.now();
    await act(async () => {
      render(
        <MemoryRouter>
          <UIProvider>
            <LoginForm />
          </UIProvider>
        </MemoryRouter>
      );
    });
    const end = performance.now();
    const renderTime = end - start;
    expect(renderTime).toBeLessThan(150); // 150ms threshold
  });
});
