type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="bg-brand-bg-primary w-full max-w-md rounded-2xl p-6 shadow-2xl">
      <h2 className="text-brand-text-primary mt-5 mb-5 text-center text-2xl/9 font-bold tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default AuthCard;
