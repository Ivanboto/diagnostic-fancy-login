import LogInForm from "../components/LogInForm";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";

const LogInPage = () => {
  return (
    <AuthLayout>
      <AuthCard title="Log in to your account">
        <LogInForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default LogInPage;
