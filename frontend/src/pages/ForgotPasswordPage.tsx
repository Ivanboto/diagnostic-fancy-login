import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import AuthCard from "../components/AuthCard";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <AuthCard title="Forgot your password?">
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
