import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UIProvider } from '../../contexts/UIContext';
import { axe, toHaveNoViolations } from 'jest-axe';
import LoginForm from '../../pages/Login/LoginForm';

expect.extend(toHaveNoViolations);

describe('LoginForm Accessibility', () => {
  it('has no accessibility violations', async () => {
    let container;
    await act(async () => {
      const result = render(
        <MemoryRouter>
          <UIProvider>
            <LoginForm />
          </UIProvider>
        </MemoryRouter>
      );
      container = result.container;
    });

    // Wait for lazy-loaded components to finish loading
    await waitFor(() => {
      expect(screen.queryByText('Loading Social Logins...')).not.toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
