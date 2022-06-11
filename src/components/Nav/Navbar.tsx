import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "components/Button/Button";

export default function Navbar() {
  const route = useLocation();

  let isAuthPage =
    route.pathname === "/login" || route.pathname === "/register";
  return (
    <nav className={(isAuthPage ? " bg-green-primary" : " bg-white" )+ " sticky top-0 z-50"}> 
      <div className={"grid grid-cols-12  py-5 mx-7 md:mx-32"}>
        <div className="col-span-2">
          <Link
            to="/"
            className={
              "md:text-3xl text-2xl font-bold font-nunito " +
              (isAuthPage ? "text-white" : "text-green-primary")
            }
          >
            Cempat.in
          </Link>
        </div>
        <div className={"col-span-5 flex justify-end col-start-8 md:col-start-11 "+(isAuthPage && "hidden")}>
          <Link to={"/gabung"} aria-label="gabung">
            <Button size="xs" variant="outline-secondary">
              Gabung
            </Button>
          </Link>
          <Link to={"/login"} aria-label="login">
            <Button size="xs" variant="secondary">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
