import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UIProvider } from "../contexts/UIContext";
import LoginForm from "../pages/Login/LoginForm";

describe("LoginForm", () => {
  it("renders login form fields", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UIProvider>
            <LoginForm />
          </UIProvider>
        </MemoryRouter>
      );
    });

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember device/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });
}); 