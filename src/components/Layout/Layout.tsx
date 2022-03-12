import SideNav from "components/Nav/SideNav";
import React from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const route = useLocation();

  return (
    <div
      className={
        "max-w-screen-2xl min-h-screen mx-auto relative overflow-x-hidden " +
        (route.pathname === "/main" ? "" : "flex")
      }
    >
      <SideNav />
      {children}
    </div>
  );
}
