import React, { Suspense, lazy } from "react";

const LoginForm = lazy(() => import("./LoginForm"));

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading Login...</div>}>
      <LoginForm />
    </Suspense>
  );
} 