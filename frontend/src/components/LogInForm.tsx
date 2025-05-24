import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import AuthLink from "./AuthLink";

const LogInForm = () => {
  return (
    <form className="space-y-6">
      <InputField
        id="email"
        label="Email address"
        name="email"
        type="email"
        required
      />
      <InputField
        id="password"
        label="Password"
        name="password"
        type="password"
        required
      />
      <div className="flex items-center justify-between">
        <SubmitButton>Log in</SubmitButton>
        <AuthLink href="/forgot-password">Forgot password?</AuthLink>
      </div>
    </form>
  );
};

export default LogInForm;
