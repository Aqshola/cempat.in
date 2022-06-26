import React from "react";
import { useLocation } from "react-router-dom";
import Head from "./Head";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "components/Nav/Navbar";
import Footer from "components/Footer/Footer";
import SideNav from "components/Nav/SideNav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const route = useLocation();

  return (
    <HelmetProvider>
      <Head />
      <div className="max-w-screen-2xl  mx-auto min-h-screen relative">
        <Navbar />
        <div className="relative overflow-hidden">
          
            <SideNav />
          
          
            {children}
          
        </div>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
