import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "@/pages/Login/LoginForm";

describe("LoginForm Performance", () => {
  it("renders within acceptable time", () => {
    const start = performance.now();
    render(<LoginForm />);
    const end = performance.now();
    const renderTime = end - start;

    // Basic render threshold (adjust as needed)
    expect(renderTime).toBeLessThan(50);
  });
}); 