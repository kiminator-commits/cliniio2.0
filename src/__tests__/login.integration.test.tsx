import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "@/pages/Login/LoginForm";

describe("LoginForm Integration", () => {
  it("allows user to type into fields", () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
}); 