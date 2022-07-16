import React, { useEffect, useRef, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { toast } from "react-toastify";
import geocoder from "lib/MapboxGeocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

type Props = {
  handleSearch: (...args: any) => void;
};

export default function Search({ handleSearch }: Props) {
  const [renderGeocoder, setrenderGeocoder] = useState<boolean>(false);
  const searchBox = useRef(null);

  useEffect(() => {
    if (searchBox) {
      if (!renderGeocoder) {
        geocoder.addTo("#search");
        setrenderGeocoder(true);
      }
    }

    geocoder.on("result", (e) => {
      const lat = e.result.center[0];
      const long = e.result.center[1];
      const type = e.result.id.split(".")[0];

      const bbox = e.result.bbox;

      handleSearch(lat, long, bbox, type);
    });
  }, []);

  const _getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        handleSearch(e.coords.longitude, e.coords.latitude, [], "poi");
      },()=>{
        toast("Yah, kamu gak ngijinin akses lokasi", {
          position: "bottom-center",
          hideProgressBar: true,
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });  
      });
    } else {
      
      toast("Yah, browser kamu belum support fitur lokasi", {
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="absolute  right-10 top-10 w-64 md:w-auto z-10">
      <div className="py-3 px-2 h-10 md:h-12 flex bg-white shadow-mapbox-ctrl rounded-xl relative items-center">
        <div id="search" className="shadow-none font-nunito" ref={searchBox}></div>
        <span className="w-[2px] bg-green-primary opacity-30 h-full  block"></span>
        <button className="mx-2" onClick={_getCurrentPosition}>
          <BiCurrentLocation className="text-black w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
