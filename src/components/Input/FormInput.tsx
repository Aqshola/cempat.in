import Button from "components/Button/Button";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  logo?: React.ReactNode;
  label: string;
};

export default function FormInput({
  logo,
  label,
  className,
  ...props
}: Props &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) {
  const [passwordVisible, setpasswordVisible] = useState<boolean>(false);
  const [typeInput, settypeInput] = useState(props.type);
  return (
    <span className="relative flex items-center">
      <input
        {...props}
        type={typeInput}
        className={`
                peer
                py-2
                text-sm
                w-full
                border-b-2 
                border-gray-300
                outline-none
                focus:outline-none
                placeholder-transparent
                focus:border-green-primary
                font-medium 
                transition-all
                autofill:!bg-white
                form-input
                focus:invalid:border-red-600
                
               ${className}`}
      />
      <label
        htmlFor={props.id}
        className="transition-all text-sm absolute left-0 peer-placeholder-shown:top-2 -top-4  peer-placeholder-shown:text-gray-400 text-black"
      >
        {label}
      </label>

      {typeInput === "password" && !logo && (
        <button
          type="button"
          onClick={() => {
            settypeInput("text");
            setpasswordVisible(true);
          }}
        >
          <FiEye className="w-5 h-5 text-gray-500" />
        </button>
      )}

      {passwordVisible && !logo && (
        <button
          type="button"
          onClick={() => {
            settypeInput("password");
            setpasswordVisible(false);
          }}
        >
          <FiEyeOff className="w-5 h-5 text-gray-500" />
        </button>
      )}

      {logo}
    </span>
  );
}
