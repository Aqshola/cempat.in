import React, { useEffect, useRef} from "react";
import { BiCurrentLocation } from "react-icons/bi";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

type Props = {
  handleSearch:(...args:any)=>void
};


export default function Search({handleSearch}: Props) {
  const searchBox = useRef(null);
  const geocoder = new MapboxGeocoder({
    accessToken:
      "pk.eyJ1IjoiYXFzaG9sIiwiYSI6ImNsMDFxeXB3cDAxY24za29jbzB3dGZmMXAifQ.kBd0VXt-SYDBq6K3f7Nd9w",
    types: "country,region,place,postcode,locality,neighborhood,district,address,poi",
  });

  useEffect(() => {
    if (searchBox) {
      geocoder.addTo("#search");
    }

    geocoder.on('result', (e) => {
      const lat=e.result.center[0]
      const long=e.result.center[1]
      const type=e.result.id.split(".")[0]

      const bbox=e.result.bbox

      handleSearch(lat,long,bbox,type)
    });
  }, []);

  return (
    <div className="absolute z-10 right-10 top-10">
      <div className="hidden p-2  h-12 md:flex bg-white shadow rounded relative items-center">
        <div id="search" className="shadow-none" ref={searchBox}></div>

        <span className="w-[2px] bg-[#03C88E] opacity-30 h-full  block"></span>
        <button className="mx-2">
          <BiCurrentLocation className="text-[#03C88E] w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
