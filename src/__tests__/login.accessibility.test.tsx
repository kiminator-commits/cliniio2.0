import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import LoginForm from "@/pages/Login/LoginForm";

expect.extend(toHaveNoViolations);

describe("LoginForm Accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 