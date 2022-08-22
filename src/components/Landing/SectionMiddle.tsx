import React from "react";
import { motion } from "framer-motion";
import {
  fontWeightTransition,
  opacityTransition,
  parentTransition,
  scaleTransition,
} from "lib/Transition";
import { useInView } from "react-intersection-observer";

export default function SectionMiddle() {
  const { ref: sectionTwo, inView: sectionTwoView } = useInView();
  return (
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
  );
}
