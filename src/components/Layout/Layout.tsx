import React from "react";
import { useLocation } from "react-router-dom";
import Head from "./Head";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "components/Nav/Navbar";
import Footer from "components/Footer/Footer";
import SideNav from "components/Nav/SideNav";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const route = useLocation();
  const isNotMainRoute =
  route.pathname === "/" ||
  route.pathname === "/login" ||
  route.pathname === "/register" ||
  route.pathname === "/register/username" ||
  route.pathname === "/404" ||
  route.pathname === "/lupa-sandi";

  return (
    <HelmetProvider>
      <Head />
      <div className="max-w-screen-2xl  mx-auto min-h-screen relative">
        <Navbar />
        <div
          className={clsx(
            "relative overflow-hidden",
            route.pathname !== "/peta" && !isNotMainRoute && ["flex"]
          )}
        >
          <SideNav key={route.pathname} />

          {children}
        </div>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
