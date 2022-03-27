import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  showError: boolean;
  message: string;
};
function ErrorBox({ showError, message }: Props) {
  const [show, setshow] = useState<boolean>(showError);

  useEffect(() => {
    if(showError){
      setshow(true)
    }
  }, [showError])
  

  return (
    <div
      className={
        "w-full p-2 bg-red-500 rounded text-sm mb-2 text-white font-medium transition-all flex justify-between items-center" +
        (show ? "visible opacity-100" : "invisible opacity-0")
      }
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={() => {
          setshow(false);
        }}
      >
        <IoMdClose className=" text-gray-100" />
      </button>
    </div>
  );
}

export default ErrorBox;
