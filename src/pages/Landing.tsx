import Button from "components/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MapGL from "react-map-gl";
import gsap, { SteppedEase } from "gsap";
import Navbar from "components/Nav/Navbar";

function Landing() {
  const refTyping = useRef<HTMLSpanElement>(null);
  const [wordIndex, setwordIndex] = useState<number>(0);
  const [wordList, setwordList] = useState(["Tempat", "Lokasi", "Wisata",]);

  useEffect(() => {
    let index = 0;
    let typeTl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        if (index === wordList.length - 1) {
          index = 0;
        } else {
          index++;
        }
        setwordIndex(index);
      },
    });

    typeTl.fromTo(
      refTyping.current,
      2,
      {
        width: "0",
      },
      {
        width: "4em",
        ease: SteppedEase.config(37),
      }
    );

    typeTl.to(refTyping.current, 2, {
      width: "0",
      ease: SteppedEase.config(37),
      delay: 10,
    });
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Navbar/>
      <div className="grid grid-cols-12 w-full h-screen relative">
        <div className="col-span-4 absolute h-96 md:h-auto md:relative w-fit mx-5 md:mx-0 z-30 bg-white mt-28 py-10 md:py-28 px-10">
          <h1 className="bg-green-primary text-4xl w-fit p-4 text-white ">
            Cempat.in
          </h1>
          <p className="mt-5 md:text-base text-sm">
            <span className="inline-block overflow-hidden">
              Ceritain
            </span>{" "}
            <span
              id="type-animate"
              className="inline-block border-r-2 text-green-primary overflow-hidden"
              ref={refTyping}
            >
              {wordList[wordIndex]}
            </span>{" "}
            <span className="inline-block overflow-hidden">
              yang kamu kunjungin
            </span>
          </p>
          <div className="flex gap-2 md:gap-5 flex-col md:flex-row md:items-center h-fit mt-10 md:mt-5">
            <Link
              to={"/peta"}
              className="text-center bg-transparent border rounded border-green-primary text-green-primary px-2 py-1"
            >
              Tulis cerita
            </Link>
            {/* <a href="#how" className="text-xs md:text-sm font-light hover:underline transition">Cara tulisnya?</a> */}
          </div>
        </div>
        <div className="md:col-span-8 col-span-12 relative rounded h-full flex overflow-hidden">
          <MapGL
            reuseMaps={true}
            optimizeForTerrain={true}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            initialViewState={{
              longitude: 106.816666,
              latitude: -6.2,
              zoom: 10,
            }}
            minZoom={10}
            attributionControl={false}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
