import clsx from "clsx";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect } from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

type Props = {
  link: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

function LinkSideNav({
  link,
  children,
  active = false,
  className,
  onClick,
}: Props) {
  return (
    <AnimatePresence>
      <Link
        to={link}
        className="relative w-fit h-fit"
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        {active && (
          <motion.div
            layoutId="box-active"
            className="block w-full h-full z-10 absolute bg-green-primary rounded-xl"
          ></motion.div>
        )}
        <div className={clsx("p-4 relative z-40 text-white", className)}>
          {children}
        </div>
      </Link>
    </AnimatePresence>
  );
}

export default LinkSideNav;
