import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaEnvelopeOpen, FaMapMarked } from "react-icons/fa";
import { sideNavStore } from "store/navStore";
import { CgClose } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import LinkSideNav from "./Link/LinkSideNav";
import useLogout from "hooks/auth/useLogout";
import { authStore } from "store/authStore";

export default function SideNav() {
  
  
  const username=authStore(state=>state.authData?.username)
  const { sideNav, showSideNav } = sideNavStore((state) => state);

  const route = useLocation();
  const firstPathname=route.pathname.split("/")[1]

  const [logout] = useLogout();
  const _handleLogout=()=>{
    logout()
    showSideNav(false)
  }

  useEffect(() => {
    showSideNav(false)
  }, [route.pathname])
  
  
  return (
    <div
      id="side-nav"
      className={
        "transition-all duration-500  min-h-screen   z-50 bg-green-primary py-5 px-6 flex flex-col " +
        (firstPathname === "peta" ? " w-full md:w-80 absolute " : "") +
        (firstPathname === "peta"
          ? sideNav
            ? " translate-x-0 visible "
            : " -translate-x-full invisible"
          : sideNav
          ? " w-full md:w-80 absolute md:relative visible opacity-100 "
          : " opacity-0 w-0 invisible absolute ")
      }
    >
      <button onClick={() => showSideNav(false)}>
        <CgClose className="w-6 h-6 text-white" />
      </button>
      <div className="mt-16">
        <MdAccountCircle className="w-16 h-16 text-white mx-auto" />
        <p className="font-semibold text-2xl text-center text-white mt-2">
          {username}
        </p>
      </div>
      <div className="mt-7 flex flex-col gap-2">
        <LinkSideNav Icon={FaMapMarked} link="/peta" children={"Peta"} active={firstPathname==="peta"}/>
        <LinkSideNav Icon={FaEnvelopeOpen} link="/cerita" children={"Cerita"} active={firstPathname==="cerita"}/>
        {/* <LinkSideNav Icon={ImLocation2} link="/kunjungan" children={"Kunjungan"} active={firstPathname==="kunjungan"}/> */}
      </div>

      <button onClick={_handleLogout} className="mt-auto text-white text-left">Keluar</button>
    </div>
  );
}
