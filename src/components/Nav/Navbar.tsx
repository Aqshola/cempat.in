import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "components/Button/Button";
import clsx from "clsx";

export default function Navbar() {
  const route = useLocation();

  const isNavActive =
    route.pathname === "/" ||
    route.pathname === "/login" ||
    route.pathname === "/register" ||
    route.pathname === "/register/username" ||
    route.pathname === "/404" ||
    route.pathname === "/lupa-sandi";
  let isAuthPage =
    route.pathname === "/login" || route.pathname === "/register";
  return isNavActive ? (
    <nav
      className={clsx(
        "transition-all duration-1000  sticky top-0 z-50",
        isAuthPage && ["bg-green-primary"],
        !isAuthPage && ["bg-white"]
      )}
    >
      <div className={"grid grid-cols-12  py-5 mx-7 md:mx-32"}>
        <div className="col-span-2">
          <Link
            to="/"
            className={clsx(
              "md:text-3xl text-2xl font-bold font-nunito",
              isAuthPage && ["text-white"],
              !isAuthPage && ["text-green-primary"]
            )}
          >
            Cempat.in
          </Link>
        </div>
        <div
          className={clsx(
            "col-span-5 flex justify-end col-start-8 md:col-start-11",
            isAuthPage && ["hidden"]
          )}
        >
          <Link to={"/register"} aria-label="register">
            <Button size="xs" variant="outline-secondary" className="mr-1">
              Register
            </Button>
          </Link>
          <Link to={"/login"} aria-label="login">
            <Button size="xs" variant="secondary">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
}
