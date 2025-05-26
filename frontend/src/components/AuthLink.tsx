import { Link } from "react-router-dom";

type AuthLinkProps = {
  href: string;
  children: React.ReactNode;
};

const AuthLink = ({ href, children }: AuthLinkProps) => {
  return (
    <Link
      to={href}
      className="text-brand-text-primary hover:text-brand-accent text-sm font-semibold"
    >
      {children}
    </Link>
  );
};

export default AuthLink;
