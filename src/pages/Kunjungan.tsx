import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { sideNavStore } from "store/navStore";

type Props = {};

function Kunjungan({}: Props) {
  const { showSideNav, sideNav } = sideNavStore((state) => state);
  return (
    <div className="relative md:px-10 px-5 pb-5 w-full">
      <div className={"py-5 transition-all flex items-center"}>
        <button
          className={sideNav ? "opacity-0 invisible" : " opacity-100 visible"}
          onClick={() => showSideNav(true)}
          disabled={sideNav}
        >
          <GiHamburgerMenu className="w-7 h-7 " />
        </button>
        <span className="text-center w-full">
          <h1 className="text-xl font-semibold">Tempat yang dikunjungi</h1>
        </span>
      </div>
      <div
        id="list-kunjungan"
        className="transition-all mt-10 grid grid-cols-12 gap-5 "
      ></div>
    </div>
  );
}

export default Kunjungan;
