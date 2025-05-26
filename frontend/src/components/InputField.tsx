type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  type: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ id, label, name, type, required, value, onChange }: InputFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-brand-text-primary block text-sm/6 font-medium"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="bg-brand-accent outline-brand-text-primary focus:outline-brand-bg-secondary block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default InputField;
