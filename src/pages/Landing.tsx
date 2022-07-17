import Button from "components/Button/Button";
import { Link } from "react-router-dom";
import MapGL from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import {
  childTitleLandingTransition,
  childTransition,
  fontWeightTransition,
  opacityTransition,
  parentTransition,
  scaleTransition,
  titleLandingTransition,
} from "lib/Transition";
import { useInView } from "react-intersection-observer";

function Landing() {
  const { ref: sectionTwo, inView: sectionTwoView } = useInView();
  const { ref: sectionThree, inView: sectionThreeView } = useInView();
  return (
    <motion.div>
      <motion.section
        variants={parentTransition}
        initial="hidden"
        animate="show"
        className="grid grid-cols-12 md:mt-14 py-8 mx-7 md:mx-32"
        id="header"
      >
        <motion.div
          variants={childTransition}
          className="col-span-12 md:col-span-6"
        >
          <motion.h1
            initial="hidden"
            animate="show"
            variants={titleLandingTransition}
            className="font-extrabold text-3xl font-nunito md:leading-snug md:text-6xl"
          >
            Ceritain <br /> tiap{" "}
            <motion.span variants={childTitleLandingTransition}>
              Tempat
            </motion.span>{" "}
            <br /> yang kamu{" "}
            <motion.span variants={childTitleLandingTransition}>
              kunjungin
            </motion.span>
          </motion.h1>
          <Link to={"/peta"}>
            <Button
              className="mt-7 transition-all shadow-btn-landing"
              size="lg"
            >
              Tulis Cerita
            </Button>
          </Link>
        </motion.div>
        <motion.div
          variants={childTransition}
          className="col-span-12 md:col-span-4 md:col-start-9"
        >
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
        </motion.div>
      </motion.section>

      <motion.section className="bg-green-primary md:py-36" id="info">
        <motion.div
          ref={sectionTwo}
          variants={parentTransition}
          initial="hidden"
          animate={sectionTwoView ? "show" : "hidden"}
          className="grid grid-cols-12 mt-5 md:mt-14 py-8 mx-7 md:mx-32"
        >
          <motion.div
            variants={parentTransition}
            initial="hidden"
            animate={sectionTwoView ? "show" : "hidden"}
            className="col-span-12 md:order-1 order-2 md:col-span-3 grid grid-cols-3 md:grid-cols-2 gap-5 mt-11 md:mt-0"
          >
            <motion.div
              variants={scaleTransition}
              className="col-span-1 flex justify-center md:order-2"
            >
              <img
                className="flex w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
                src="/icon/filled/location-logo-filled.svg"
                alt="pick location"
              />
            </motion.div>
            <motion.div
              variants={scaleTransition}
              className="col-span-1 md:col-span-2 flex justify-center "
            >
              <img
                className="flex w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
                src="/icon/filled/write-logo-filled.svg"
                alt="write"
              />
            </motion.div>

            <motion.div
              variants={scaleTransition}
              className="flex justify-center md:order-3"
            >
              <img
                className="flex w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
                src="/icon/filled/upload-logo-filled.svg"
                alt="upload"
              />
            </motion.div>
          </motion.div>
          <motion.div className="col-span-12 order-1  md:col-start-5 md:col-span-7 md:order-3">
            <motion.h2
              variants={opacityTransition}
              className="font-nunito text-2xl md:text-6xl md:leading-snug text-white font-light"
            >
              <motion.span variants={fontWeightTransition}>Pilih</motion.span>{" "}
              Lokasi <br />{" "}
              <motion.span
                variants={fontWeightTransition}
                className="font-extrabold"
              >
                Tulis
              </motion.span>{" "}
              dan{" "}
              <motion.span variants={fontWeightTransition}>Bagikan</motion.span>{" "}
              <br /> Cerita yang kamu miliki
            </motion.h2>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={sectionThree}
        id="quotes"
        className="mt-5 md:mt-14 py-32 mx-7 md:mx-32"
        variants={parentTransition}
        initial="hidden"
        animate={sectionThreeView ? "show" : "hidden"}
      >
        <motion.h1
          variants={opacityTransition}
          className="font-extrabold text-2xl md:text-6xl text-center font-nunito"
        >
          “Tempat juga punya Cerita”
        </motion.h1>
        <motion.h2 className="text-center md:mt-5 text-lg md:text-4xl font-nunito">
          yuk ceritain di{" "}
          <motion.span
            variants={childTitleLandingTransition}
            className="font-extrabold text-green-primary"
          >
            Cempat.in
          </motion.span>
        </motion.h2>
      </motion.section>
    </motion.div>
  );
}

export default Landing;
