'use client';
import { InputHTMLAttributes, ElementType } from 'react';

interface InputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  type?: string;
  rightIcon?: ElementType;
  onRightIconClick?: () => void;
}

export function Input({
  inputProps,
  label,
  name,
  placeholder,
  error,
  type = 'text',
  rightIcon: RightIcon = undefined,
  onRightIconClick,
}: InputProps) {
  return (
    <div className="h-20 w-full">
      <label htmlFor={name} className="my-1 text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          className="block h-10 w-full rounded-md border-2 border-primary-button bg-secondary px-2 py-1"
          id={name}
          placeholder={placeholder}
          spellCheck={false}
          type={type}
          {...inputProps}
        />
        {RightIcon && onRightIconClick && (
          <RightIcon
            onClick={() => onRightIconClick()}
            className="text-primary-button absolute right-2.5 bottom-2 font-medium rounded-lg text-sm cursor-pointer"
          />
        )}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
