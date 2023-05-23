import { InputHTMLAttributes } from 'react';

interface InputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  type?: string;
}

export function Input({
  inputProps,
  label,
  name,
  placeholder,
  error,
  type = "text",
}: InputProps) {
  return (
    <div className="h-20 w-full">
      <label htmlFor={name} className="my-1 text-sm">
        {label}
      </label>
      <input
        className="relative h-10 w-full rounded-md border-2 border-primary-button bg-secondary px-2 py-1"
        id={name}
        placeholder={placeholder}
        spellCheck={false}
        type={type}
        {...inputProps}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
