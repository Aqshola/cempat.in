import React, { useLayoutEffect, useRef } from "react";
import clsx from "clsx";



type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" |"outline-primary" | "outline-secondary" | "outline-gray";
  size?: "sm" | "md" | "lg" |"xs" |"xl";
  shape?: "normal" | "round";
  loading?: boolean;
};


const ButtonType:{
  [key: string]: string;
}={
  primary:"bg-green-primary font-semibold text-white rounded-lg btn-primary",
  secondary:"bg-blue-primary text-white font-semibold rounded-lg btn-secondary",
  danger:"bg-red-primary text-white font-semibold rounded-lg btn-danger",
  "outline-primary":"bg-transparent text-green-primary font-semibold rounded-lg btn-primary",
  "outline-secondary":"bg-transparent text-blue-primary font-semibold rounded-lg btn-secondary",
  "outline-gray":"border bg-transparent border-gray-300 font-semibold rounded-lg btn-gray"
}

const ButtonSize:{
  [key: string]: string;
}={
  xl:"py-3 px-6 text-base",
  lg:"px-4 py-2 text-base",
  md:"px-4 py-2 text-sm",
  sm:"py-2 px-3 text-sm",
  xs:"py-2 px-3 text-xs"
}

function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "normal",
  loading,
  ...props
}: ButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  
    
  return (
    <button {...props} className={clsx("transition-all btn",ButtonType[variant],ButtonSize[size], props.className)}>
        {children}
    </button>
    
  );
}

export default Button;
