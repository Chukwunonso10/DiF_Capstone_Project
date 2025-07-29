import React, { useState } from "react";
import Input from "../../common/Input";
import Button from "../../common/Button";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    userName: "",
    fullName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Phone number, username, or email"
      />
      <Input
        name="userName"
        value={formData.userName}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <Input
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        placeholder="Full name"
      />
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>
    </div>
  );
};

export default SignupForm;
