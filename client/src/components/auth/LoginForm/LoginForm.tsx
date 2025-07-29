import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import Button from "../../common/Button";
import type { LoginFormData } from "../../../types/auth";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "asad_khasanov",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const isFormValid = formData.username.trim() && formData.password.trim();

  return (
    <div className="w-full max-w-sm mx-auto bg-white">
      {/* Back Arrow */}
      <div className="flex items-center mb-12">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Instagram Logo */}
      <div className="text-center mb-12">
        <h1
          className="text-5xl text-gray-900"
          style={{
            fontFamily: "Billabong, Dancing Script, cursive",
            fontWeight: "normal",
          }}
        >
          Instagram
        </h1>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          variant="auth"
          value={formData.username}
          onChange={handleChange("username")}
          placeholder="asad_khasanov"
          className="text-gray-900"
          required
        />

        <Input
          variant="auth"
          type="password"
          value={formData.password}
          onChange={handleChange("password")}
          placeholder="Password"
          className="text-gray-400"
          required
        />

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Forgot Password */}
        <div className="text-right pt-2 pb-4">
          <Link to="/forgot-password" className="text-blue-500 text-sm">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          loading={loading}
          disabled={!isFormValid}
          className="py-3 text-white font-medium"
        >
          Log in
        </Button>
      </form>

      {/* Facebook Login */}
      <div className="mt-6">
        <Button
          variant="facebook"
          fullWidth
          size="lg"
          className="py-3 bg-transparent border-0 text-blue-500 font-medium"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
        >
          Log in with Facebook
        </Button>
      </div>

      {/* OR Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center mb-16">
        <span className="text-gray-600 text-sm">Don't have an account? </span>
        <Link to="/signup" className="text-blue-500 text-sm font-medium">
          Sign up.
        </Link>
      </div>

      {/* Bottom text */}
      <div className="text-center text-gray-500 text-sm">
        Instagram or Facebook
      </div>
    </div>
  );
};

export default LoginForm;
