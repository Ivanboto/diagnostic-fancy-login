type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-brand-bg-secondary flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      {children}
    </div>
  );
};

export default AuthLayout;
