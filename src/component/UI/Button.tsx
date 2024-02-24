"use client";
import { cn } from "@/lib/utlis";
import Image from "next/image";
import { ButtonHTMLAttributes, FC, ReactNode, useRef } from "react";

type ButtonTyps = "Rounded" | "Ghost" | "Outline" | undefined;

type ButtonProps = {
  children?: ReactNode | ReactNode[];
  className?: string;
  variant?: ButtonTyps;
  animateOnce?: boolean;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,
  animateOnce,
  loading,
  ...props
}) => {
  const getVariant = (variant: ButtonTyps) => {
    switch (variant) {
      case "Rounded":
        return "hover:bg-secondary rounded-md h-9 w-9 rounded-full";
      case "Outline":
        return "";
      default:
        return "bg-primary rounded-md h-8";
    }
  };

  const customClass = cn(
    "active:scale-95 transition-all shrink-0 duration-150 ease-out flex items-center justify-center gap-1 font-semibold",
    getVariant(variant),
    className,
    loading && "bg-primary-off text-opacity-10",
  );

  const ref = useRef(null);

  return (
    <button className={customClass} {...props}>
      {children}
      {loading && (
        <div className="h-full p-1">
          <Image
            src={"/images/bars-rotate-fade.svg"}
            height={200}
            width={200}
            alt="tube-spinner.svg"
            className="h-full w-fit opacity-90"
          />
        </div>
      )}
    </button>
  );
};

export default Button;
