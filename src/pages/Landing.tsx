import Landmark from "components/Icon/Landmark";
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="w-full grid grid-cols-2 md:h-screen overflow-hidden h-fit">
      <div className="order-2 md:order-1 col-span-2 md:col-span-1 px-10 md:px-16 flex flex-col py-16 md:py-36">
        <h1 className="font-bold text-green-primary text-4xl md:text-5xl flex items-center">
          <span className="mr-5">
            <Landmark className="fill-green-primary" />
          </span>
          Cempat.in
        </h1>
        <p className="mt-5 font-light">Ceritain tempat yang kamu kunjungin</p>

        <Link to={"/main"}>
          <button className="mt-10 md:mt-16 w-fit py-2 px-5 text-sm text-white bg-green-primary font-semibold rounded">
            Tulis Cerita
          </button>
        </Link>
      </div>
      <div className="order-1 md:order-2 col-span-2 md:col-span-1 flex h-64 md:h-full">
        <img
          src="/images/landing-map.png"
          alt="maps"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Landing;
