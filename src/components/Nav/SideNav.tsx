import React, { useEffect, useState } from "react";
import { sideNavStore } from "store/navStore";
import { useLocation } from "react-router-dom";
import LinkSideNav from "./Link/LinkSideNav";
import useLogout from "hooks/auth/useLogout";
import { authStore } from "store/authStore";
import splitbee from "@splitbee/web";
import clsx from "clsx";

const LINK_LIST = [
  {
    link: "/peta",
    icon: "story-map-logo",
    label: "Peta",
  },
  {
    link: "/timeline",
    icon: "timeline-logo",
    label: "Timeline",
  },
  {
    link: "/cerita",
    icon: "story-list",
    label: "Cerita",
  },
];

export default function SideNav() {
  const username = authStore((state) => state.authData?.username);
  const { sideNav, showSideNav } = sideNavStore((state) => state);
  const [spanSideNav, setspanSideNav] = useState<boolean>(false);

  const route = useLocation();

  const isNotMainRoute =
    route.pathname === "/" ||
    route.pathname === "/login" ||
    route.pathname === "/register" ||
    route.pathname === "/register/username" ||
    route.pathname === "/404" ||
    route.pathname === "/lupa-sandi";

  const [logout] = useLogout();

  function _handleLogout() {
    logout();
    showSideNav(false);
    splitbee.reset();
  }

  function _handleSpan() {
    setspanSideNav(!spanSideNav);
  }

  return isNotMainRoute ? (
    <></>
  ) : (
    <>
      <div className="absolute top-10 left-0 right-0 w-full grid md:hidden px-3 items-center grid-cols-9 z-10">
        <div className="col-span-1">
          <button
            aria-label="side nav"
            className={clsx(
              "h-fit w-fit transition-transform bg-white p-3 rounded-xl  md:hidden",
              spanSideNav ? ["rotate90"] : [""],
              route.pathname !== "/peta" && ["border-2 border-green-primary"]
            )}
            onClick={_handleSpan}
          >
            <img
              src="/icon/outline/navbar-logo-outline.svg"
              alt="side nav logo"
            />
          </button>
        </div>
        <div className="col-span-7">
          <h1 className="top-12 text-xl font-semibold font-nunito  capitalize text-black w-full text-center">
            {route.pathname.slice(1, route.pathname.length)}
          </h1>
        </div>
      </div>
      <aside
        className={clsx(
          "h-full transition-all   px-2 min-h-screen rounded-tb-3xl rounded-tr-3xl bg-white z-50 pt-12 flex flex-col ",
          spanSideNav
            ? ["md:w-64 w-full absolute"]
            : ["md:w-20 w-0 overflow-hidden px-0 md:px-2 absolute"],
          route.pathname === "/peta" && ["absolute"],
          route.pathname !== "/peta" && ["absolute md:relative"]
        )}
      >
        <button
          aria-label="side nav"
          className={clsx(
            "h-fit w-fit transition-transform",
            spanSideNav ? ["rotate-90"] : [""]
          )}
          onClick={_handleSpan}
        >
          <img
            src="/icon/outline/navbar-logo-outline.svg"
            alt="side nav logo"
          />
        </button>
        <div className="grid grid-cols-4 items-center gap-5 w-full  mt-16">
          <div className="col-span-1">
            <div
              id="profile"
              className=" rounded-full bg-blue-primary text-white font-extrabold w-10 h-10 flex items-center justify-center font-nunito"
            >
              A
            </div>
          </div>

          <div
            className={clsx(
              "col-span-3 text-left",
              !spanSideNav && ["md:hidden"]
            )}
          >
            <span className="font-bold text-blue-primary text-lg">Aqshola</span>
          </div>
        </div>

        <div id="link-sidenav" className="mt-24">
          {LINK_LIST.map((link, index) => {
            let active = route.pathname === link.link;
            return (
              <LinkSideNav
                key={link.link}
                link={link.link}
                active={active}
                className="flex items-center justify-center gap-5"
              >
                <img
                  className="w-7"
                  src={`/icon/${active ? "filled" : "outline"}/${link.icon}-${
                    active ? "filled" : "outline"
                  }.svg`}
                  alt={link.icon}
                />

                <span
                  className={clsx(
                    "font-semibold w-full text-left",
                    active ? ["text-white"] : ["text-black"],
                    !spanSideNav && ["md:hidden"]
                  )}
                >
                  {link.label}
                </span>
              </LinkSideNav>
            );
          })}
        </div>

        <div id="additional" className="mt-auto pb-5">
          <LinkSideNav
            link="/pengaturan"
            className="flex items-center justify-center gap-5"
          >
            <img
              src={`/icon/${
                route.pathname === "/pengaturan" ? "filled" : "outline"
              }/setting-logo-${
                route.pathname === "/pengaturan" ? "filled" : "outline"
              }.svg`}
              alt="setting-logo"
            />

            <span
              className={clsx(
                "font-semibold w-full text-left ",
                route.pathname === "/pengaturan"
                  ? ["text-white"]
                  : ["text-black"],
                !spanSideNav && ["md:hidden"]
              )}
            >
              Pengaturan
            </span>
          </LinkSideNav>

          <button
            className="px-4 flex items-center justify-center gap-5  w-fit h-fit"
            onClick={_handleLogout}
          >
            <img src={`/icon/outline/exit-logo-outline.svg`} alt="exit-logo" />
            <span
              className={clsx(
                "font-semibold w-full text-left text-black",
                !spanSideNav && ["md:hidden"]
              )}
            >
              Keluar
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
