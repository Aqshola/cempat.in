import Button from "components/Button/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  childTitleLandingTransition,
  childTransition,
  parentTransition,
  titleLandingTransition,
} from "lib/Transition";
import DummyMap from "./DummyMap";


export default function SectionHeading() {
  return (
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
          <Button className="mt-7 transition-all shadow-btn-landing" size="lg">
            Tulis Cerita
          </Button>
        </Link>
      </motion.div>
      <motion.div
        variants={childTransition}
        className="col-span-12 md:col-span-4 md:col-start-9"
      >
        <DummyMap/>
      </motion.div>
    </motion.section>
  );
}
