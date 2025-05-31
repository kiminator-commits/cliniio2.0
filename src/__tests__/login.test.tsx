import React from "react";
import { render, screen } from "@testing-library/react";
import LoginForm from "@/pages/Login/LoginForm";

describe("LoginForm", () => {
  it("renders login form fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember device/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
}); 