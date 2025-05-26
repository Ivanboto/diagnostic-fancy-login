import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import AuthLink from "./AuthLink";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      setError("Invalid email address");
      return;
    }

    setMessage("Password reset email sent successfully.");
  };

  return (
    <form className="space-y-6" onSubmit={handleForgotPassword}>
      {error && <p className="text-sm font-bold text-red-500">{error}</p>}
      {message && (
        <p className="text-brand-text-primary text-sm font-bold">{message}</p>
      )}
      <InputField
        id="email"
        label="Email address"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <SubmitButton>Send reset link</SubmitButton>
        <AuthLink href="/">Back to Log In</AuthLink>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
