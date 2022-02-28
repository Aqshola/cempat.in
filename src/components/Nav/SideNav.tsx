import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaEnvelopeOpen, FaMapMarked } from "react-icons/fa";
import { sideNavStore } from "store/navStore";
import { CgClose } from "react-icons/cg";



export default function SideNav() {
  const { sideNav, showSideNav } = sideNavStore((state) => state);
  return (
    <div
      id="side-nav"
      className={
        "transition-all duration-500  min-h-screen absolute w-full md:w-1/4  z-50 bg-[#03C88E] py-5 px-6 flex flex-col " +
        (sideNav ? "translate-x-0 visible" : "-translate-x-full invisible")
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
        <a
          href="/"
          className="flex  bg-white rounded-md text-lg px-3 py-3 font-semibold  text-[#03C88E]"
        >
          <FaEnvelopeOpen className="w-6 h-6 mr-5" />
          <span>Tulisan Cerita</span>
        </a>
        <a href="/" className="px-3 py-3 text-lg flex text-white">
          <FaMapMarked className="w-7 h-7 mr-5 text-white" />
          <span>Tempat yang dikunjungi</span>
        </a>
      </div>

      <button className="mt-auto text-white text-left">Keluar</button>
    </div>
  );
}
