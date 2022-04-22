import SideNav from "components/Nav/SideNav";
import React from "react";
import { useLocation } from "react-router-dom";
import Head from "./Head";
import {HelmetProvider} from "react-helmet-async"

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const route = useLocation();

  return (
    <HelmetProvider>
      <Head />
      <div
        className={
          "max-w-screen-2xl min-h-screen mx-auto relative overflow-x-hidden " +
          (route.pathname === "/peta" ? "" : "flex")
        }
      >
        <SideNav />
        {children}
      </div>
    </HelmetProvider>
  );
}
