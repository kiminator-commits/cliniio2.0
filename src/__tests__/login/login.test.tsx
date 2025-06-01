import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UIProvider } from '../../contexts/UIContext';
import LoginForm from '../../pages/Login/LoginForm';
import { LOGIN_LABELS } from '../../constants/loginConstants';

describe('LoginForm', () => {
  it('renders login form fields', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UIProvider>
            <LoginForm />
          </UIProvider>
        </MemoryRouter>
      );
    });

    expect(screen.getByLabelText(LOGIN_LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_LABELS.password)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_LABELS.rememberMe)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_LABELS.rememberDevice)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: LOGIN_LABELS.submit })).toBeInTheDocument();
  });
});
