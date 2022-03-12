import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { sideNavStore } from "store/navStore";

type Props = {};

function Kunjungan({}: Props) {
  const { showSideNav, sideNav } = sideNavStore((state) => state);
  return (
    <div className="px-5 w-full">
      <div
        className={
          "py-10 transition-all " +
          (sideNav ? "opacity-0 invisible" : " opacity-100 visible")
        }
      >
        <button onClick={() => showSideNav(true)} disabled={sideNav}>
          <GiHamburgerMenu className="w-7 h-7 " />
        </button>
      </div>
      <h1 className="text-2xl font-semibold">Tempat yang di kunjungi</h1>
      <ul id="list-kunjungan" className="mt-16">
        <li className="p-2 w-full border border-[#03C88E] font-medium">Hutan Kota</li>
      </ul>
    </div>
  );
}

export default Kunjungan;
