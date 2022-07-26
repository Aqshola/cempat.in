import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  IoMdAlert,
  IoMdClose,
  IoMdInformationCircle,
  IoMdCheckmarkCircle,
} from "react-icons/io";

type Props = {
  show: boolean;
  children: React.ReactNode;
  variant?: "success" | "danger" | "info";
};

const ALERT_STYLE = {
  success: "bg-green-primary",
  danger: "bg-red-primary",
  info: "bg-blue-primary",
};
export default function Alert({ show, children, variant = "info" }: Props) {
  const [showAlert, setshowAlert] = useState(show);
  useEffect(() => {
    if (show) {
      setshowAlert(true);
    }
  }, [show]);

  return (
    <>
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{
              y: -2,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -2,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={clsx(
              "w-full px-2 py-4 rounded-md  text-white font-medium flex items-center",
              ALERT_STYLE[variant]
            )}
          >
            {variant === "danger" && (
              <IoMdAlert className="text-white w-5 h-5" />
            )}
            {variant === "info" && (
              <IoMdInformationCircle className="text-white w-5 h-5" />
            )}
            {variant === "success" && (
              <IoMdCheckmarkCircle className="text-white w-5 h-5" />
            )}
            <span className="ml-2">{children}</span>
            <button onClick={() => setshowAlert(false)} className=" ml-auto">
              <IoMdClose className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
