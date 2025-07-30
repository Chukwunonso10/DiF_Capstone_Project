import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { useAuth, useFormValidation } from "../../../hooks/useAuth";
import type { SignupFormData, FormErrors } from "../../../types/authTypes";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  const { validateField, validateForm } = useFormValidation();

  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const newErrors = validateForm(
      formData as unknown as { [key: string]: string }
    );
    setErrors(newErrors);
  }, [formData]);

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData]);

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputBlur = (field: keyof SignupFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      email: true,
      fullName: true,
      username: true,
      password: true,
    });

    const newErrors = validateForm(
      formData as unknown as { [key: string]: string }
    );

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const result = await register(formData);
    if (result.success) {
      navigate("/");
    }
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim()) &&
    Object.values(errors).every((error) => !error);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-500 mb-2">
          Sign up to see photos and videos from your friends.
        </h2>
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

      <div className="flex items-center justify-center mb-6">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-4 text-sm font-semibold text-gray-500 uppercase">
          OR
        </span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Mobile Number or Email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          onBlur={() => handleInputBlur("email")}
          error={touched.email ? errors.email : ""}
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

        <Input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(value) => handleInputChange("fullName", value)}
          onBlur={() => handleInputBlur("fullName")}
          error={touched.fullName ? errors.fullName : ""}
          disabled={isLoading}
        />

        <Input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(value) => handleInputChange("username", value)}
          onBlur={() => handleInputBlur("username")}
          error={touched.username ? errors.username : ""}
          disabled={isLoading}
        />

        <div className="text-xs text-gray-500 text-center py-3">
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Learn More
          </a>
          <br />
          <br />
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>
          ,{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Cookies Policy
          </a>
          .
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!isFormValid}
          loading={isLoading}
          className="py-2 text-sm font-semibold"
        >
          Sign up
        </Button>

        {error && (
          <div className="text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
