import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type Props = {
  Icon: IconType;
  link: string;
  children: React.ReactNode;
  active?: boolean;
};

function LinkSideNav({ Icon, link, children, active = false }: Props) {
  return (
    <Link
      to={link}
      className={
        " transition-all px-3 py-3 text-lg flex  " +
        (active ? " rounded-md bg-white text-[#03C88E]" : " text-white")
      }
    >
      <Icon className={"transition-colors w-7 h-7 mr-5 "+(active?" text-[#03C88E]":"text-white")} />
      <span>{children}</span>
    </Link>
  );
}

export default LinkSideNav;
