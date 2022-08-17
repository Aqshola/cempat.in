import clsx from "clsx";
import Button from "components/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  logo?: React.ReactNode;
  label: string;
  leftButton?: React.ReactNode;
  hideLabel?: boolean;
  invalidmsg?: string;
  loading?: boolean;
  error?: boolean;
  debounce?: boolean;
  debounceCallback?: () => void;
};

export default function FormInput({
  logo,
  loading,
  label,
  className,
  hideLabel = false,
  error,
  debounce,
  debounceCallback,
  leftButton,
  ...props
}: Props &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) {
  const [passwordVisible, setpasswordVisible] = useState<boolean>(false);
  const [typeInput, settypeInput] = useState(props.type);

  const [inputInvalid, setinputInvalid] = useState<boolean>(false);


  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (debounceCallback && inputRef.current?.value.trim() !== "") {
        debounceCallback();
      }
    }, 1000);
    return () => clearTimeout(debounceFn);
  }, [inputRef.current?.value]);

  return (
    <span className="flex flex-col space-y-2">
      {!hideLabel && <label htmlFor={props.id}>{label}</label>}
      <div
        className={clsx(
          "transition-all px-3 py-4 border border-gray-300 rounded-lg flex items-center",
          !inputInvalid && ["focus-within:border-red-primary"],
          inputInvalid && ["focus-within:border-green-primary"],
          error && ["border-red-primary"],
          className
        )}
      >
        <input
          ref={inputRef}
          autoComplete={typeInput === "password" ? "current-password" : ""}
          {...props}
          type={typeInput}
          onChange={(e) => {
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          className="form-input md:placeholder:text-base placeholder:text-sm border-none outline-none focus:border-none focus:outline-none w-full"
        />

        {!loading && leftButton && leftButton}
        {!loading && typeInput === "email" && !leftButton && (
          <label htmlFor={props.id}>
            <img src="/icon/filled/mail-logo-filled.svg" alt="email" />
          </label>
        )}
        {!loading &&
          typeInput === "password" &&
          !passwordVisible &&
          !leftButton && (
            <button
              onClick={() => {
                settypeInput("text");
                setpasswordVisible(true);
              }}
              aria-label="password visible"
            >
              <img
                src="/icon/filled/eye-logo-filled.svg"
                alt="password visible"
              />
            </button>
          )}
        {!loading &&
          typeInput === "text" &&
          passwordVisible &&
          !leftButton && (
            <button
              onClick={() => {
                settypeInput("password");
                setpasswordVisible(false);
              }}
              aria-label="password invisible"
            >
              <img
                src="/icon/filled/eye-closed-logo-filled.svg"
                alt="password invisible"
              />
            </button>
          )}

        {loading && (
          <span className=" border-t-2 border-t-green-primary animate-spin rounded-full w-6 h-6  border-2"></span>
        )}
      </div>
    </span>
  );
}
