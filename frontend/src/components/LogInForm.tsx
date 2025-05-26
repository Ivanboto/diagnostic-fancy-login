import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import AuthLink from "./AuthLink";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      })
  };

  return (
    <form className="space-y-6" onSubmit={handleLogIn}>
      <InputField
        id="email"
        label="Email address"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        label="Password"
        name="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <SubmitButton>Log in</SubmitButton>
        <AuthLink href="/forgot-password">Forgot password?</AuthLink>
      </div>
    </form>
  );
};

export default LogInForm;
