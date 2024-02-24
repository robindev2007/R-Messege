"use client";
import { cn } from "@/lib/utlis";
import { ClassValue } from "clsx";
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  HtmlHTMLAttributes,
  useState,
} from "react";

type InputProps = {
  label?: string | undefined;
  type?: HTMLInputTypeAttribute;
  placeHolder?: string;
  className?: string;
  inputClassName?: ClassValue[] | ClassValue;
  name?: string;
  error?: string;
  id?: string;
  value?: string | undefined;
  autoComplete?: string;
  onValueChange?: (value: string) => void;
} & HtmlHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  label,
  type,
  placeHolder,
  className,
  autoComplete,
  inputClassName,
  name,
  id,
  error,
  value,
  onValueChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    onValueChange && onValueChange(value);
  };
  return (
    <div className="h-fit w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div
        className={cn(
          "rounded-md border-2 border-border bg-black transition-all duration-100 ease-in-out focus-within:border-primary",
          className,
        )}
      >
        <input
          value={value}
          id={id}
          name={name ? name : ""}
          type={type ? type : "text"}
          placeholder={placeHolder ? placeHolder : ""}
          autoComplete={autoComplete }
          className={cn(
            "px-3 py-2 placeholder:text-text-secondary placeholder:opacity-80",
            inputClassName,
          )}
          onChange={handleInputChange}
          {...props}
        />
      </div>
      {error && (
        <span className="max-w-min text-sm text-red-500 opacity-80">
          Error: {error}
        </span>
      )}
    </div>
  );
};

export default Input;
