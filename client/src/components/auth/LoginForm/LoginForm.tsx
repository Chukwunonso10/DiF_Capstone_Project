import React, { useState } from "react";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        name="email"
        type="text"
        value={formData.email}
        onChange={handleChange}
        placeholder="Phone number, username, or email"
        required
      />
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <div className="text-right text-sm">
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </div>
  );
};

export default LoginForm;
