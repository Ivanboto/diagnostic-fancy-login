type SubmitButtonProps = {
  children: React.ReactNode;
};

const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-brand-text-secondary text-brand-bg-primary hover:bg-brand-accent flex justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs"
    >
      {children}
    </button>
  );
};

export default SubmitButton;