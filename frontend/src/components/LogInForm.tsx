import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import AuthLink from "./AuthLink";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("Invalid email or password");
      return;
    }

    const data = await response.json();
    console.log("Login successful:", data);
    navigate("/home");
  };

  return (
    <form className="space-y-6" onSubmit={handleLogIn}>
      {error && <p className="text-sm font-bold text-red-500">{error}</p>}
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
