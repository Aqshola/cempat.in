import React, { useLayoutEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  message: string;
};
function ErrorBox({ message }: Props) {
  const [show, setshow] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
     
    }
  }, []);

  const handleClose = () => {
  
  };

  if (show) {
    return (
      <div
        ref={ref}
        className={
          "w-full p-2 bg-red-500 rounded text-sm mb-2 text-white font-medium flex justify-between items-center "
        }
      >
        <p className="block h-fit">{message}</p>
        <button type="button" onClick={handleClose}>
          <IoMdClose className=" text-gray-100" />
        </button>
      </div>
    );
  }
  return <></>;
}

export default ErrorBox;
