import Button from "components/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MapGL from "react-map-gl";
import gsap, { SteppedEase } from "gsap";

import "mapbox-gl/dist/mapbox-gl.css";

function Landing() {
  // const refTyping = useRef<HTMLSpanElement>(null);
  // const [wordIndex, setwordIndex] = useState<number>(0);
  // const [wordList, setwordList] = useState(["Tempat", "Lokasi", "Wisata"]);

  // useEffect(() => {
  //   let index = 0;
  //   let typeTl = gsap.timeline({
  //     repeat: -1,
  //     onRepeat: () => {
  //       if (index === wordList.length - 1) {
  //         index = 0;
  //       } else {
  //         index++;
  //       }
  //       setwordIndex(index);
  //     },
  //   });

  //   typeTl.fromTo(
  //     refTyping.current,
  //     2,
  //     {
  //       width: "0",
  //     },
  //     {
  //       width: "4em",
  //       ease: SteppedEase.config(37),
  //     }
  //   );

  //   typeTl.to(refTyping.current, 2, {
  //     width: "0",
  //     ease: SteppedEase.config(37),
  //     delay: 10,
  //   });
  // }, []);

  return (
    <>
      <section
        className="grid grid-cols-12 md:mt-14 py-8 mx-7 md:mx-32"
        id="header"
      >
        <div className="col-span-12 md:col-span-6">
          <h1 className="font-extrabold text-3xl font-nunito md:leading-snug md:text-6xl">
            Ceritain <br /> tiap{" "}
            <span className="text-green-primary">Tempat</span> <br /> yang kamu{" "}
            <span className="text-green-primary">kunjungin</span>
          </h1>
          <Link to={"/peta"}>
            <Button className="mt-7 shadow-btn-landing" size="lg">
              Tulis Cerita
            </Button>
          </Link>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9">
          {/* <div className="block w-[400px] h-[600px] rounded-[50px] "></div> */}
          <div className="w-full h-[300px] mt-10 md:mt-0  md:h-[600px] relative rounded-[50px] overflow-hidden   shadow-map-card ">
            <MapGL
              reuseMaps={true}
              optimizeForTerrain={true}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              initialViewState={{
                longitude: 106.816666,
                latitude: -6.2,
                zoom: 15,
              }}
              attributionControl={false}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              style={{
                width: "100%",
                height: "100%",
              }}
            ></MapGL>
          </div>
        </div>
      </section>
      <section className="bg-green-primary md:py-36" id="info">
        <div className="grid grid-cols-12 mt-5 md:mt-14 py-8 mx-7 md:mx-32">
          <div className="col-span-12 md:order-1 order-2 md:col-span-3 grid grid-cols-3 md:grid-cols-2 gap-5 mt-11 md:mt-0">
            <div className="col-span-1 flex justify-center md:order-2">
              <img className="flex w-[70px] h-[70px] md:w-[100px] md:h-[100px]" src="/icon/filled/location-logo-filled.svg" alt="pick location"  />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center ">
              <img className="flex w-[70px] h-[70px] md:w-[100px] md:h-[100px]" src="/icon/filled/write-logo-filled.svg"  alt="write" />
            </div>
            
            <div className="flex justify-center md:order-3">
              <img className="flex w-[70px] h-[70px] md:w-[100px] md:h-[100px]" src="/icon/filled/upload-logo-filled.svg" alt="upload" />
            </div>
          </div>
          <div className="col-span-12 order-1  md:col-start-5 md:col-span-7 md:order-3">
            <h2 className="font-nunito text-2xl md:text-6xl md:leading-snug text-white font-light">
              <span className="font-extrabold">Pilih</span>  Lokasi <br /> <span className="font-extrabold">Tulis</span>  dan <span className="font-extrabold">Bagikan</span>  <br /> Cerita yang kamu
              miliki
            </h2>
          </div>
        </div>
      </section>
      <section id="quotes" className="mt-5 md:mt-14 py-32 mx-7 md:mx-32">
              <h1 className="font-extrabold text-2xl md:text-6xl text-center font-nunito">“Tempat juga punya Cerita”</h1>
              <h2 className="text-center md:mt-5 text-lg md:text-4xl font-nunito">yuk ceritain di <span className="font-extrabold text-green-primary">Cempat.in</span></h2>
      </section>
    </>
  );
}

export default Landing;
