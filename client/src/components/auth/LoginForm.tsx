import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth, useFormValidation } from "../../hooks/useAuth";
import type { LoginFormData, FormErrors } from "../../types/authTypes";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const { validateField } = useFormValidation();

  const [formData, setFormData] = useState<LoginFormData>({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData]);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputBlur = (field: keyof LoginFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const error = validateField("email", formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ usernameOrEmail: true, password: true });

    const newErrors: FormErrors = {};
    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const result = await login(formData);
    if (result.success) {
      navigate("/");
    }
  };

  const isFormValid =
    formData.usernameOrEmail.trim() && formData.password.trim();

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Phone number, username, or email"
          value={formData.usernameOrEmail}
          onChange={(value) => handleInputChange("usernameOrEmail", value)}
          onBlur={() => handleInputBlur("usernameOrEmail")}
          error={touched.usernameOrEmail ? errors.usernameOrEmail : ""}
          disabled={isLoading}
        />

        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          onBlur={() => handleInputBlur("password")}
          error={touched.password ? errors.password : ""}
          disabled={isLoading}
          showPasswordToggle
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!isFormValid}
          loading={isLoading}
          className="py-2 text-sm font-semibold"
        >
          Log in
        </Button>

        {error && (
          <div className="text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </form>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-sm font-semibold text-gray-500 uppercase">
            OR
          </span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <Button
          variant="facebook"
          fullWidth
          className="mb-6 py-2"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Log in with Facebook
        </Button>

        <a
          href="#"
          className="text-sm text-blue-600 hover:underline"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
