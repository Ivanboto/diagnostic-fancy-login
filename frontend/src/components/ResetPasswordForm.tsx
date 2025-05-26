import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (!token) {
      setError("Missing reset token.");
      return;
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-sm font-bold text-red-500">{error}</p>}
      <InputField
        id="password"
        name="password"
        type="password"
        label="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputField
        id="repeat-password"
        name="repeat-password"
        type="password"
        label="Repeat New Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />
      <SubmitButton>Reset Password</SubmitButton>
    </form>
  );
};

export default ResetPasswordForm;
