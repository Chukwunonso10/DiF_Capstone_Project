import { useState } from "react";
import { authService } from "../services/api/authService";
import {
  type LoginFormData,
  type SignupFormData,
  type FormErrors,
  VALIDATION_RULES,
} from "../types/authTypes";

export const useFormValidation = () => {
  const validateField = (name: string, value: string): string => {
    const rules = VALIDATION_RULES[name as keyof typeof VALIDATION_RULES];
    if (!rules) return "";

    if (rules.required && !value.trim()) {
      return rules.required;
    }

    if ("minLength" in rules && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    if ("pattern" in rules && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }

    return "";
  };

  const validateForm = (formData: { [key: string]: string }): FormErrors => {
    const errors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        errors[key] = error;
      }
    });

    return errors;
  };

  return { validateField, validateForm };
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Debug logging
      console.log("Login form data:", formData);

      const loginData = {
        emailOrPhone: formData.usernameOrEmail, // Transform to match backend
        password: formData.password,
      };

      console.log("Login request data:", loginData);

      const response = await authService.login(loginData);

      if (response.success && response.data) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return { success: true, user: response.data.user };
      } else {
        setError(response.message || "Login failed");
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Transform frontend data to match backend expectations
      const backendData = {
        fullName: formData.fullName,
        userName: formData.username, // Transform username -> userName
        password: formData.password,
        // Determine if it's email or phone number
        ...(formData.email.includes("@")
          ? { email: formData.email }
          : { phoneNumber: formData.email }),
      };

      // Debug logging
      console.log("Frontend form data:", formData);
      console.log("Transformed backend data:", backendData);

      const response = await authService.register(backendData);

      if (response.success && response.data) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return { success: true, user: response.data.user };
      } else {
        setError(response.message || "Registration failed");
        return { success: false, error: response.message };
      }
    } catch {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const clearError = () => setError(null);

  return {
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated,
    isLoading,
    error,
    clearError,
  };
};
