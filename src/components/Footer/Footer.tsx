import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const route = useLocation();
  const isNavActive =
    route.pathname === "/" ||
    route.pathname === "/login" ||
    route.pathname === "/register" ||
    route.pathname === "/register/username" ||
    route.pathname === "/404" ||
    route.pathname === "/lupa-sandi";
  return isNavActive ? (
    <footer className="bg-black py-10 flex justify-between items-center px-10 md:px-36">
      <h1 className="text-white font-nunito text-sm">© 2022 Cempat.in</h1>
      <div className="flex space-x-5 items-center">
        <a
          href="https://github.com/Aqshola/cempat.in"
          target={"_blank"}
          rel="noreferrer"
          aria-label="repo cempatin"
        >
          <img src="/icon/filled/gh-logo-filled.svg" alt="github" />
        </a>
        <a
          href="https://twitter.com/Anyauwuu"
          target={"_blank"}
          rel="noreferrer"
          aria-label="repo cempatin"
        >
          <img src="/icon/filled/tw-logo-filled.svg" alt="twitter" />
        </a>
      </div>
    </footer>
  ) : (
    <></>
  );
}
