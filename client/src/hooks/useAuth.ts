import { useState } from "react";
import { authService } from "../services/api/authService";
import { useAuthContext } from "../context/AuthContext";
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
  const { isAuthenticated, setUser, setIsAuthenticated } = useAuthContext();

  const login = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(
        formData.usernameOrEmail,
        formData.password
      );

      if (response.success && response.data) {
        localStorage.setItem("authToken", response.data.token);
        const userD = response.data.user;
        if (!userD.profilePicture) {
          userD.profilePicture =
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
        }
        setUser({
          ...response.data.user,
          username: response.data.user.userName,
        });

        localStorage.setItem("user", JSON.stringify(userD));

        setIsAuthenticated(true);

        return { success: true, user: response.data.user };
      } else {
        setError(response.message || "Login failed");
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const backendData = {
        fullName: formData.fullName,
        userName: formData.username,
        password: formData.password,
        ...(formData.email.includes("@")
          ? { email: formData.email }
          : { phoneNumber: formData.email }),
      };

      const response = await authService.register(backendData);

      if (response.success && response.data) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setUser({
          ...response.data.user,
          username: response.data.user.userName,
        });

        setIsAuthenticated(true);

        return { success: true, user: response.data.user };
      } else {
        setError(response.message || "Registration failed");
        return { success: false, error: response.message };
      }
    } catch {
      setError("Network error. Please try again.");
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  };

  const checkIsAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const clearError = () => setError(null);

  return {
    login,
    register,
    logout,
    getCurrentUser,
    checkIsAuthenticated,
    isLoading,
    error,
    clearError,
    isAuthenticated,
  };
};
