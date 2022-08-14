import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline-primary"
    | "outline-secondary"
    | "outline-gray";
  size?: "sm" | "md" | "lg" | "xs" | "xl";
  shape?: "normal" | "round";
  loading?: boolean;
};
const ButtonType: {
  [key: string]: string;
} = {
  primary: "bg-green-primary font-semibold text-white btn-primary",
  secondary: "bg-blue-primary text-white font-semibold btn-secondary",
  danger: "bg-red-primary text-white font-semibold btn-danger",
  "outline-primary":
    "bg-transparent text-green-primary font-semibold btn-primary",
  "outline-secondary":
    "bg-transparent text-blue-primary font-semibold btn-secondary",
  "outline-gray":
    "border bg-transparent border-gray-300 font-semibold btn-gray",
};

const ButtonSize: {
  [key: string]: string;
} = {
  xl: "p-6 text-base",
  lg: "p-4 text-base",
  md: "p-3 text-sm",
  sm: "p-2 text-sm",
  xs: "p-1 text-xs",
};

export default function CircleAction({
  size = "md",
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx("transition-all rounded-full btn", ButtonSize[size], ButtonType[variant])}
      {...props}
    >
      {children}
    </button>
  );
}
