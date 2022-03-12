import ListCerita from "components/Cerita/ListCerita";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { sideNavStore } from "store/navStore";

type Props = {};

function Cerita({}: Props) {
  const { showSideNav, sideNav } = sideNavStore((state) => state);
  return (
    <div className="px-5 w-full">
      <div
        className={
          "py-10 transition-all " + (sideNav ? "opacity-0 invisible" : " opacity-100 visible")
        }
      >
        <button onClick={() => showSideNav(true)} disabled={sideNav}>
          <GiHamburgerMenu className="w-7 h-7 " />
        </button>
      </div>
      <h1 className="text-2xl font-semibold">Cerita yang ditulis</h1>
      <div id="list-cerita" className="mt-16">
        <Link to={"/cerita/tes"}>
          <ListCerita/>
        </Link>
      </div>
    </div>
  );
}

export default Cerita;
