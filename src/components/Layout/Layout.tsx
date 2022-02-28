import SideNav from "components/Nav/SideNav";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto relative overflow-x-hidden">
      <SideNav/>
      {children}
    </div>
  );
}
