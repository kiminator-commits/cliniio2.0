import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UIProvider } from "../contexts/UIContext";
import LoginForm from "../pages/Login/LoginForm";

describe("LoginForm Integration", () => {
  it("allows user to type into fields", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UIProvider>
            <LoginForm />
          </UIProvider>
        </MemoryRouter>
      );
    });

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
    });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
}); 