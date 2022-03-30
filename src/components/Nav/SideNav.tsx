import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaEnvelopeOpen, FaMapMarked } from "react-icons/fa";
import { sideNavStore } from "store/navStore";
import { CgClose } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import LinkSideNav from "./Link/LinkSideNav";
import {ImLocation2} from "react-icons/im"
import useLogout from "hooks/auth/useLogout";

export default function SideNav() {
  const { sideNav, showSideNav } = sideNavStore((state) => state);
  const route = useLocation();
  const firstPathname=route.pathname.split("/")[1]

  const [logout, data, loading] = useLogout();
  const _handleLogout=()=>{
    logout()
  }
  
  return (
    <div
      id="side-nav"
      className={
        "transition-all duration-500  min-h-screen   z-50 bg-green-primary py-5 px-6 flex flex-col " +
        (firstPathname === "main" ? " w-full md:w-1/4 absolute " : "") +
        (firstPathname === "main"
          ? sideNav
            ? " translate-x-0 visible "
            : " -translate-x-full invisible"
          : sideNav
          ? " w-full md:w-1/4 absolute md:relative visible opacity-100 "
          : " opacity-0 w-0 invisible absolute ")
      }
    >
      <button onClick={() => showSideNav(false)}>
        <CgClose className="w-6 h-6 text-white" />
      </button>
      <div className="mt-16">
        <MdAccountCircle className="w-16 h-16 text-white mx-auto" />
        <p className="font-semibold text-2xl text-center text-white mt-2">
          John doe
        </p>
      </div>
      <div className="mt-7 flex flex-col gap-2">
        <LinkSideNav Icon={FaMapMarked} link="/main" children={"Peta"} active={firstPathname==="main"}/>
        <LinkSideNav Icon={FaEnvelopeOpen} link="/cerita" children={"Cerita"} active={firstPathname==="cerita"}/>
        <LinkSideNav Icon={ImLocation2} link="/kunjungan" children={"Kunjungan"} active={firstPathname==="kunjungan"}/>
      </div>

      <button onClick={_handleLogout} className="mt-auto text-white text-left">Keluar</button>
    </div>
  );
}
