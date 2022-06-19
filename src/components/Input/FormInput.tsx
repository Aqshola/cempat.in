import Button from "components/Button/Button";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  logo?: React.ReactNode;
  label: string;
  leftButton?: React.ReactNode;
  hideLabel?:boolean
};

export default function FormInput({
  logo,
  label,
  className,
  hideLabel=false,
  ...props
}: Props &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) {
  const [passwordVisible, setpasswordVisible] = useState<boolean>(false);
  const [typeInput, settypeInput] = useState(props.type);

  const [inputInvalid, setinputInvalid] = useState<boolean>(false);

  const validate_email = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const isValid = e.target.value.match(emailPattern);
    setinputInvalid(isValid ? false : true);
    e.target.setCustomValidity(
      inputInvalid ? "" : "Masukin email yang valid ya"
    );
  };

  return (
    <span className="flex flex-col space-y-2">
      {!hideLabel && <label htmlFor={props.id}>{label}</label>}
      <div
        className={
          "px-3 py-4 border border-gray-300 rounded-lg flex items-center " +
          (inputInvalid
            ? " focus-within:border-red-primary "
            : " focus-within:border-green-primary") +" "+className
        }
      >
        <input
          {...props}
          type={typeInput}
          onChange={(e) => {
            if (props.type === "email") {
              validate_email(e);
            }

            if (props.onChange) {
              props.onChange(e);
            }
          }}
          className="form-input md:placeholder:text-base placeholder:text-sm border-none outline-none focus:border-none focus:outline-none w-full"
        />
        {props.leftButton && (
          props.leftButton
        )}
        {typeInput === "email" && !props.leftButton && (
          <label htmlFor={props.id}>
            <img src="/icon/filled/mail-logo-filled.svg" alt="email" />
          </label>
        )}
        {typeInput === "password" && !passwordVisible && !props.leftButton && (
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

        {typeInput === "text" && passwordVisible && !props.leftButton && (
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
      </div>
    </span>
  );
}
