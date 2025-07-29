import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import type { LoginFormData } from "../../types/auth";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual login API call
      console.log("Login attempt:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Handle successful login
      // - Store auth token
      // - Update auth context/store
      // - Redirect to home page

      navigate("/");
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error ?? undefined}
      />
    </AuthLayout>
  );
};

export default Login;
