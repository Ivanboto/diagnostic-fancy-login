type AuthLinkProps = {
  href: string;
  children: React.ReactNode;
};

const AuthLink = ({ href, children }: AuthLinkProps) => {
  return (
    <a
      href={href}
      className="text-brand-text-primary hover:text-brand-accent text-sm font-semibold"
    >
      {children}
    </a>
  );
};

export default AuthLink;
