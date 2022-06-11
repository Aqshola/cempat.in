import React, { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { time } from "console";


type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" |"outline-primary" | "outline-secondary" | "outline-gray";
  size?: "sm" | "md" | "lg" |"xs";
  shape?: "normal" | "round";
  loading?: boolean;
};


const ButtonType:{
  [key: string]: string;
}={
  primary:"bg-green-primary font-semibold text-white rounded-lg ",
  secondary:"bg-blue-primary text-white font-semibold rounded-lg",
  danger:"bg-red-primary text-white font-semibold rounded-lg",
  "outline-primary":"bg-transparent text-green-primary font-semibold rounded-lg",
  "outline-secondary":"bg-transparent text-blue-primary font-semibold rounded-lg",
  "outline-gray":"border bg-transparent border-gray-300 font-semibold rounded-lg"
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
    <button className={clsx(ButtonType[variant],ButtonSize[size], props.className)}>
        {children}
    </button>
    
  );
}

export default Button;
