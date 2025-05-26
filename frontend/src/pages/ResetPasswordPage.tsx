import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "../components/ResetPasswordForm";
import AuthCard from "../components/AuthCard";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <AuthCard title="Reset your password">
        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
