import { motion } from "framer-motion";
import {
  opacityTransition,
  parentTransition,
  textGreenTransition,
} from "lib/Transition";
import { useInView } from "react-intersection-observer";

export default function SectionEnd() {
  const { ref: sectionThree, inView: sectionThreeView } = useInView();
  return (
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
          variants={textGreenTransition}
          className="font-extrabold text-green-primary"
        >
          Cempat.in
        </motion.span>
      </motion.h2>
    </motion.section>
  );
}
